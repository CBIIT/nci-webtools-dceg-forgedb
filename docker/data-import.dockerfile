FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y update \
   && dnf -y install \
   nodejs24 \
   && dnf clean all

ENV FORGEDB_FOLDER=/opt/forgedb/

RUN mkdir -p ${FORGEDB_FOLDER}

WORKDIR ${FORGEDB_FOLDER}

COPY database/package*.json ${FORGEDB_FOLDER}

RUN npm ci

COPY database ${FORGEDB_FOLDER}

CMD node import.js