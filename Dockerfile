#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:alpine`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS development

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN npm install -g pnpm

WORKDIR /srv/app/

ENV CERTIFICATE_PATH=/srv/certificates/jonas-thelemann
ENV NODE_OPTIONS=--openssl-legacy-provider

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]

# Waiting for https://github.com/nuxt/framework/issues/6915
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

# Should be the specific version of `node:slim`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS prepare

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm fetch

COPY ./ ./

# TODO: create ticket about node-jiti folder (https://github.com/dargmuesli/jonas-thelemann/issues/178)
RUN pnpm install --offline \
    && rm -rf ./node-jiti

########################
# Build Nuxt.

# Should be the specific version of `node:alpine`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN npm install -g pnpm && \
    pnpm run build


########################
# Nuxt: lint

# Should be the specific version of `node:alpine`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run lint


  ########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:12.1.0@sha256:bdcc5edecf11dcb8b3acd5e6c6bf6d74d957fa3a4a781770caacdb56a505abce AS test-integration_base

ARG UNAME=cypress
ARG UID=1000
ARG GID=1000

WORKDIR /srv/app/

# Update and install dependencies.
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl ca-certificates libnss3-tools` are required by `mkcert`
        curl ca-certificates libnss3-tools \
    # pnpm
    && npm install -g pnpm \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME \
    # mkcert
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert \
    && mkcert -install \
    # clean
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER $UNAME

VOLUME /srv/app


########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:12.1.0@sha256:bdcc5edecf11dcb8b3acd5e6c6bf6d74d957fa3a4a781770caacdb56a505abce AS test-integration

# Update and install dependencies.
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl ca-certificates libnss3-tools` are required by `mkcert`
        curl ca-certificates libnss3-tools \
    # pnpm
    && npm install -g pnpm \
    # mkcert
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert

COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=build /srv/app/ /srv/app/

WORKDIR /srv/app/

RUN pnpm test:integration:prod \
    && pnpm test:integration:dev


#######################
# Collect build, lint and test results.

# Should be the specific version of `node:alpine`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test-integration /srv/app/package.json /tmp/test/package.json


# #######################
# # Provide a web server.

# # Should be the specific version of `nginx:alpine`.
# FROM nginx:1.23.2-alpine@sha256:455c39afebd4d98ef26dd70284aa86e6810b0485af5f4f222b19b89758cabf1e AS production

# WORKDIR /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/nginx.conf

# COPY --from=build /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of `node:alpine`.
FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `wget` is required by the healthcheck
RUN apk update \
    && apk add --no-cache \
        wget

WORKDIR /srv/app/

COPY --from=collect /srv/app/ ./

CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
