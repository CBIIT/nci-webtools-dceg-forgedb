import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {/*  Use hardcoded min-height to ensure consistent aspect ratio for cover image */}
            <div className="d-flex h-100 align-items-center" style={{ minHeight: "320px" }}>
              <div>
                <h1 className="fs-1 text-light fw-light mb-3">
                  FORGE<span className="small text-warning fw-normal">db</span>
                </h1>
                <hr className="border-white" />
                <p className="lead text-light">Explore candidate functional variants</p>

                <form action={`${process.env.NEXT_PUBLIC_BASE_PATH}/explore`} className="mb-2">
                  <div className="input-group border-bottom border-white border-2">
                    <input className="form-control  bg-transparent border-0 shadow-0 no-clear-control text-light placeholder-light fw-light ps-0" type="search" placeholder="Enter rsid" aria-label="Enter rsid" name="rsid" pattern="^rs\d+" required autoFocus />
                    <button className="btn btn-outline-secondary bg-transparent border-0 text-light" type="submit">
                      <i className="bi bi-search"></i>
                      <span className="visually-hidden">Search</span>
                    </button>
                  </div>
                </form>

                <Link className="link-warning" href="/explore/?rsid=rs12203592">
                  Example Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light py-5 flex-grow-1">
        <div className="container">
          <div className="row">
            <div className="col">
              <p>FORGEdb is an online tool designed to aid interpretation of genetic variants associated with diseases, for example variants analyzed in genome-wide association studies (GWAS). Its purpose is to annotate individual variants to identify relevant alleles and target genes.</p>
              <p>The platform provides integrated data on individual genetic variants, including associated regulatory elements, transcription factor binding sites, and target genes. This information -derived from a wide range of biological samples- presents a thorough examination of the regulatory context for each variant at the tissue and cell type level. Data sources include Combined Annotation Dependent Depletion (CADD) scores, expression quantitative trait loci (eQTLs), activity-by-contact (ABC) interactions, and transcription factor (TF) motifs.</p>
              <p>Notably, FORGEdb introduces a unique scoring system, the FORGEdb score. This score evaluates the functional importance of genetic variants, helping researchers prioritize variants for functional validation. It uses extensive datasets, including those from ENCODE, Roadmap Epigenomics, and BLUEPRINT consortia. With FORGEdb, researchers can quickly analyze different genomic variants and accelerate their research on disease-associated mechanisms.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
