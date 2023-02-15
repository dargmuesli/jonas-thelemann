#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:alpine`.
FROM node:19.6.0-alpine@sha256:ebd018afea26341e981ce1b01d6859a5d185b2d840f89c075239e3b7e6e92715 AS development

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
FROM node:19.6.0-alpine@sha256:ebd018afea26341e981ce1b01d6859a5d185b2d840f89c075239e3b7e6e92715 AS prepare

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
FROM node:19.6.0-alpine@sha256:ebd018afea26341e981ce1b01d6859a5d185b2d840f89c075239e3b7e6e92715 AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN npm install -g pnpm && \
    pnpm run generate


########################
# Nuxt: lint

# Should be the specific version of `node:alpine`.
FROM node:19.6.0-alpine@sha256:ebd018afea26341e981ce1b01d6859a5d185b2d840f89c075239e3b7e6e92715 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run lint


  ########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:12.5.1@sha256:5cd0a6192ccf93739ce8c1f080ead0d6058eab991bc093a15adcf1c34e443972 AS test-integration_base

ARG UNAME=cypress
ARG UID=1000
ARG GID=1000

WORKDIR /srv/app/

RUN cp /usr/local/bin/cypress /root/.cache/Cypress \
    # pnpm
    && npm install -g pnpm \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME \
    # clean
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && cypress verify

USER $UNAME

VOLUME /srv/app


########################
# Nuxt: test (integration, development)

# Should be the specific version of `cypress/included`.
FROM cypress/included:12.5.1@sha256:5cd0a6192ccf93739ce8c1f080ead0d6058eab991bc093a15adcf1c34e443972 AS test-integration-dev

RUN cp /usr/local/bin/cypress /root/.cache/Cypress \
    # pnpm
    && npm install -g pnpm

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN pnpm test:integration:dev


########################
# Nuxt: test (integration, production)

# Should be the specific version of `cypress/included`.
FROM cypress/included:12.5.1@sha256:5cd0a6192ccf93739ce8c1f080ead0d6058eab991bc093a15adcf1c34e443972 AS test-integration-prod

RUN cp /usr/local/bin/cypress /root/.cache/Cypress \
    # pnpm
    && npm install -g pnpm

WORKDIR /srv/app/

COPY --from=build /srv/app/ /srv/app/
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm test:integration:prod


#######################
# Collect build, lint and test results.

# Should be the specific version of `node:alpine`.
FROM node:19.6.0-alpine@sha256:ebd018afea26341e981ce1b01d6859a5d185b2d840f89c075239e3b7e6e92715 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json
COPY --from=test-integration-prod /srv/app/package.json /tmp/test/package.json


#######################
# Provide a web server.

# Should be the specific version of `nginx:alpine`.
FROM nginx:1.23.3-alpine@sha256:6f94b7f4208b5d5391246c83a96246ca204f15eaf7e636cefda4e6348c8f6101 AS production

WORKDIR /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=collect /srv/app/.output/public/ ./

HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1


# #######################
# # Provide a web server.
# # Requires node (cannot be static) as the server acts as backend too.

# # Should be the specific version of `node:alpine`.
# FROM node:19.3.0-alpine@sha256:d0b02b1ec5534efb43a926069915c982aec745a8eb0611ebcffc4cafaa4e4a74 AS production

# ENV NODE_ENV=production

# # Update and install dependencies.
# # - `wget` is required by the healthcheck
# RUN apk update \
#     && apk add --no-cache \
#         wget

# WORKDIR /srv/app/

# COPY --from=collect /srv/app/ ./

# CMD ["node", ".output/server/index.mjs"]
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
