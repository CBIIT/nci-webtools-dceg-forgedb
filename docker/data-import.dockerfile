FROM public.ecr.aws/amazonlinux/amazonlinux:2023

RUN dnf -y update \
 && dnf -y install \
    gcc-c++ \
    make \
    nodejs24 \
 && dnf clean all

# AL2023 ships versioned Node packages; nodejs24 provides Node 24.x. The unversioned
# 'nodejs' package is Node 18, which is why the version is pinned in the name above.
# The `node -v` assertion guards a real trap: AL2023 registers every nodejs major in
# `alternatives` at the same priority, so if another nodejs package is ever installed
# alongside this one, /usr/bin/node keeps pointing at whichever was installed first.
# Assert before upgrading npm so a wrong Node fails the build loudly instead of
# silently building the app against the wrong major.
RUN node -v | grep -qE '^v24\.' \
 && npm install -g npm@latest \
 && node -v \
 && npm -v

ENV FORGEDB_FOLDER=/opt/forgedb/

RUN mkdir -p ${FORGEDB_FOLDER}

WORKDIR ${FORGEDB_FOLDER}

COPY database/package*.json ${FORGEDB_FOLDER}

RUN npm ci

COPY database ${FORGEDB_FOLDER}

CMD node import.js