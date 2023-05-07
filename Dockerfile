#############
# Serve Nuxt in development mode.

FROM node:20.1.0-alpine@sha256:71073d3b7ad12dc871ecf42a865699914efd738fe797fa16f67a22179f46d039 AS development

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN corepack enable

WORKDIR /srv/app/

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "--dir", "nuxt", "dev"]

# Waiting for https://github.com/nuxt/framework/issues/6915
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.1.0-alpine@sha256:71073d3b7ad12dc871ecf42a865699914efd738fe797fa16f67a22179f46d039 AS prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm fetch

COPY ./ ./

RUN pnpm install --offline


########################
# Build Nuxt.

FROM node:20.1.0-alpine@sha256:71073d3b7ad12dc871ecf42a865699914efd738fe797fa16f67a22179f46d039 AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm --dir nuxt run generate


########################
# Nuxt: lint

FROM node:20.1.0-alpine@sha256:71073d3b7ad12dc871ecf42a865699914efd738fe797fa16f67a22179f46d039 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm --dir nuxt run lint


########################
# Nuxt: test (integration)

FROM cypress/included:12.11.0@sha256:f9c3930d94b49104949d4ff4ed567d0bc76d76b1567e65938408e9dae26d1603 AS test-integration_base

ARG UNAME=cypress
ARG UID=1000
ARG GID=1000

WORKDIR /srv/app/

COPY ./docker/entrypoint-dev.sh /usr/local/bin/

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare --chown=$UNAME /root/.cache/Cypress /root/.cache/Cypress

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["entrypoint-dev.sh"]


########################
# Nuxt: test (integration, development)

FROM cypress/included:12.11.0@sha256:f9c3930d94b49104949d4ff4ed567d0bc76d76b1567e65938408e9dae26d1603 AS test-integration-dev

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl

WORKDIR /srv/app/

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=prepare /srv/app/ ./

RUN pnpm --dir nuxt test:integration:dev


########################
# Nuxt: test (integration, production)

FROM cypress/included:12.11.0@sha256:f9c3930d94b49104949d4ff4ed567d0bc76d76b1567e65938408e9dae26d1603 AS test-integration-prod

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl

WORKDIR /srv/app/

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=build /srv/app/ /srv/app/
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm --dir nuxt test:integration:prod


#######################
# Collect build, lint and test results.

FROM node:20.1.0-alpine@sha256:71073d3b7ad12dc871ecf42a865699914efd738fe797fa16f67a22179f46d039 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/nuxt/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json
COPY --from=test-integration-prod /srv/app/package.json /tmp/test/package.json


#######################
# Provide a web server.

FROM nginx:1.24.0-alpine@sha256:b7db705c8986070be8aa99ec0886886ddb3c75b1e46301f54865b16db79e9e52 AS production

WORKDIR /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=collect /srv/app/.output/public/ ./

HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1


# #######################
# # Provide a web server.
# # Requires node (cannot be static) as the server acts as backend too.

# FROM node:18.15.0-alpine@sha256:19eaf41f3b8c2ac2f609ac8103f9246a6a6d46716cdbe49103fdb116e55ff0cc AS production

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
