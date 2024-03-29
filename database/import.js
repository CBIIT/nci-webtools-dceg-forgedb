import { createGunzip } from "zlib";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { parse } from "csv-parse";
import dotenv from "dotenv";

dotenv.config();

const bucket = process.env.S3_BUCKET_NAME;
const key = process.env.S3_OBJECT_KEY;

if (!bucket || !key) {
  throw new Error("Missing required environment variables");
}

console.log(`Input object key: s3://${bucket}/${key}`);
const keyParts = key.split("/");
const [datasetName, version] = keyParts.slice(-3, -1);
const outputKeyPrefix = keyParts.slice(0, -1).join("/") + "/";
const logKey = `${outputKeyPrefix}${keyParts.at(-1)}.log`;

if (datasetName === "api" || version === "api") {
  throw new Error("Invalid dataset name or version: ");
}

console.log(`Output object key prefix: s3://${bucket}/${outputKeyPrefix}`);
console.log(`Log key: s3://${bucket}/${logKey}`);

async function main() {
  const logs = [];
  const log = async (message) => {
    const logMessage = `[${new Date().toISOString()}] ${message}`
    console.log(logMessage);
    logs.push(logMessage);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: logKey,
        Body: logs.join("\n"),
      })
    );
  }

  const s3Client = new S3Client({
    maxAttempts: 40,
    retryMode: "adaptive",
  });

  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  );

  const gunzip = createGunzip();
  const parser = parse({
    delimiter: ",",
    columns: true,
    bom: true,
  });

  let i = 0;
  let objectCount = 0;
  let start = Date.now();
  let previousRsid = null;
  let previousItems = [];
  let buffer = [];
  let rsidKey = 'rsid'
  let dropRsid = false;
  const bufferSize = 300;
  const logInterval = 100000;

  const flushBuffer = async () => {
    await Promise.all(buffer.map((args, i) => s3Client.send(new PutObjectCommand(args))));
    objectCount += buffer.length;
    buffer = [];
  };

  for await (const item of response.Body.pipe(gunzip).pipe(parser)) {
    // if the rsid column is _rsid, drop it from the output
    if (item._rsid) {
      rsidKey = '_rsid'
      dropRsid = true;
    }

    // initialize previousRsid if it's null
    if (!previousRsid) {
      previousRsid = item[rsidKey];
    }

    // if the rsid has changed, flush the buffer
    if (item[rsidKey] !== previousRsid) {
      buffer.push({
        Bucket: bucket,
        Key: `${outputKeyPrefix}${previousRsid}.json`,
        Body: JSON.stringify({
          rsid: previousRsid,
          data: previousItems.map(item => {
            let clone = Object.assign({}, item);
            if (dropRsid) {
              delete clone[rsidKey]
            }
            return clone
          }),
        }),
      });
      previousRsid = item[rsidKey];
      previousItems = [item];
    } else {
      previousItems.push(item);
    }

    if (i % bufferSize === 0) {
      await flushBuffer();
    }

    if (i % logInterval === 0) {
      let end = Date.now();
      let elapsed = (end - start) / 1000;
      let rate = i / elapsed;
      let objectRate = objectCount / elapsed;
      await log(`Processed ${i} rows (${objectCount} objects) in ${elapsed.toFixed(2)}s (${rate.toFixed(2)} rows/s) (${objectRate.toFixed(2)} objects/s)`);
    }

    i++;
  }

  if (previousItems.length > 0) {
    const rsid = previousItems[0][rsidKey];
    buffer.push({
      Bucket: bucket,
      Key: `${outputKeyPrefix}${rsid}.json`,
      Body: JSON.stringify({
        rsid,
        data: previousItems.map(item => {
          let clone = Object.assign({}, item);
          if (dropRsid) {
            delete clone[rsidKey]
          }
          return clone
        }),
      }),
    });
  }

  await flushBuffer();

  let end = Date.now();
  let elapsed = (end - start) / 1000;
  let rate = i / elapsed;
  let objectRate = objectCount / elapsed;
  await log(`Processed ${i} rows (${objectCount} objects) in ${elapsed.toFixed(2)}s (${rate.toFixed(2)} rows/s) (${objectRate.toFixed(2)} objects/s)`);
}

// keeps the process alive until all promises are resolved
const id = setInterval(() => {}, 1000);
try {
  await main();
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  clearInterval(id);
}
