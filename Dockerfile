#############
# Serve Nuxt in development mode.

FROM node:20.7.0-alpine@sha256:a348d50e74df20fa8c572c3abf80b89ae4daf9c312523c49a42997284d13ebac AS development

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

RUN corepack enable

WORKDIR /srv/app/

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "--dir", "src", "dev"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.7.0-alpine@sha256:a348d50e74df20fa8c572c3abf80b89ae4daf9c312523c49a42997284d13ebac AS prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm fetch

COPY ./ ./

RUN pnpm install --offline


# ########################
# # Build for Node deployment.

# FROM node:20.6.1-alpine@sha256:d75175d449921d06250afd87d51f39a74fc174789fa3c50eba0d3b18369cc749 AS build-node

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true

# WORKDIR /srv/app/

# COPY --from=prepare /srv/app/ ./

# ENV NODE_ENV=production
# RUN corepack enable && \
#     pnpm --dir src run build:node


########################
# Build for static deployment.

FROM node:20.7.0-alpine@sha256:a348d50e74df20fa8c572c3abf80b89ae4daf9c312523c49a42997284d13ebac AS build-static

ARG SITE_URL=http://localhost:3002
ENV SITE_URL=${SITE_URL}

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm --dir src run build:static


########################
# Nuxt: lint

FROM node:20.7.0-alpine@sha256:a348d50e74df20fa8c572c3abf80b89ae4daf9c312523c49a42997284d13ebac AS lint

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm --dir src run lint


########################
# Nuxt: test (e2e)

FROM mcr.microsoft.com/playwright:v1.38.1@sha256:5b38d216fdde6e234d200292feb1d5c4f9d7259df7fba22a8dd88ee5f60199d2 AS test-e2e_base

ARG UNAME=e2e
ARG UID=1000
ARG GID=1000

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=development
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN corepack enable \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (e2e, preparation)

FROM mcr.microsoft.com/playwright:v1.38.1@sha256:5b38d216fdde6e234d200292feb1d5c4f9d7259df7fba22a8dd88ee5f60199d2 AS test-e2e-prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN corepack enable

COPY --from=prepare /srv/app/ ./

RUN pnpm rebuild -r


# ########################
# # Nuxt: test (e2e, development)

# FROM mcr.microsoft.com/playwright:v1.37.1@sha256:58a3daf48cde7d593e4fbc267a4435deb0016aef4c4179ae7fb8b2a68f968f36 AS test-e2e-dev

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV NODE_ENV=development

# WORKDIR /srv/app/

# RUN corepack enable

# COPY --from=test-e2e-prepare /srv/app/ ./

# RUN pnpm --dir src run test:e2e:server:dev


# ########################
# # Nuxt: test (e2e, node)

# FROM mcr.microsoft.com/playwright:v1.37.1@sha256:58a3daf48cde7d593e4fbc267a4435deb0016aef4c4179ae7fb8b2a68f968f36 AS test-e2e-node

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true

# WORKDIR /srv/app/

# RUN corepack enable

# COPY --from=test-e2e-prepare /srv/app/ ./
# COPY --from=build-node /srv/app/src/.output ./src/.output

# RUN pnpm --dir src run test:e2e:server:node


########################
# Nuxt: test (e2e, static)

FROM mcr.microsoft.com/playwright:v1.38.1@sha256:5b38d216fdde6e234d200292feb1d5c4f9d7259df7fba22a8dd88ee5f60199d2 AS test-e2e-static

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./
COPY --from=build-static /srv/app/src/.output/public ./src/.output/public

RUN pnpm --dir src run test:e2e:server:static


#######################
# Collect build, lint and test results.

FROM node:20.7.0-alpine@sha256:a348d50e74df20fa8c572c3abf80b89ae4daf9c312523c49a42997284d13ebac AS collect

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

# COPY --from=build-node /srv/app/src/.output ./.output
# COPY --from=build-node /srv/app/src/package.json ./package.json
# COPY --from=build-static /srv/app/src/.output/public ./.output/public
COPY --from=build-static /srv/app/package.json /tmp/package.json
COPY --from=lint /srv/app/package.json /tmp/package.json
# COPY --from=test-e2e-dev /srv/app/package.json /tmp/package.json
# COPY --from=test-e2e-node /srv/app/package.json /tmp/package.json
COPY --from=test-e2e-static /srv/app/package.json /tmp/package.json


# #######################
# # Provide a web server.

# FROM nginx:1.25.2-alpine@sha256:cac882be2b7305e0c8d3e3cd0575a2fd58f5fde6dd5d6299605aa0f3e67ca385 AS production

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV NODE_ENV=production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
# EXPOSE 3000


# #######################
# # Provide a web server.
# # Requires node (cannot be static) as the server acts as backend too.

# FROM node:20.6.1-alpine@sha256:d75175d449921d06250afd87d51f39a74fc174789fa3c50eba0d3b18369cc749 AS production

# ENV NODE_ENV=production

# WORKDIR /srv/app/

# # Update and install dependencies.
# # - `wget` is required by the healthcheck
# RUN apk update \
#     && apk add --no-cache \
#         wget

# COPY --from=collect /srv/app/ ./

# CMD ["node", ".output/server/index.mjs"]
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
