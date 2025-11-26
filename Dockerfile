#############
# Create base image.

FROM node:24.11.1-alpine AS base-image

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN corepack enable \
  && apk add --no-cache mkcert --repository=https://dl-cdn.alpinelinux.org/alpine/edge/testing

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh


#############
# Serve Nuxt in development mode.

FROM base-image AS development

ENV CI=false

RUN mkdir \
        /srv/app/node_modules \
        /srv/.pnpm-store \
    && chown node:node \
        /srv/app/node_modules \
        /srv/.pnpm-store

VOLUME /srv/.pnpm-store
VOLUME /srv/app
VOLUME /srv/app/node_modules

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "--dir", "src", "dev", "--host", "0.0.0.0"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM base-image AS prepare

COPY ./pnpm-lock.yaml package.json ./

RUN pnpm fetch

COPY ./ ./

RUN pnpm install --offline


########################
# Build for Node deployment.

FROM prepare AS build-node

ENV NODE_ENV=production
RUN pnpm --dir src run build:node


# ########################
# # Build for cloudflare pages.

# FROM prepare AS build-cloudflare_pages

# ENV NODE_ENV=production
# RUN pnpm --dir src run build:cloudflare_pages


########################
# Build for static deployment.

FROM prepare AS build-static

ARG SITE_URL=https://localhost:3002
ENV SITE_URL=${SITE_URL}

ENV NODE_ENV=production
RUN pnpm --dir src run build:static


########################
# Build for static deployment.

FROM prepare AS build-static-test

RUN pnpm --dir src run build:static:test


########################
# Nuxt: lint

FROM prepare AS lint

RUN pnpm -r run lint


# ########################
# # Nuxt: test (unit)

# FROM prepare AS test-unit

# RUN pnpm -r run test


########################
# Nuxt: test (e2e, base-image)

FROM mcr.microsoft.com/playwright:v1.57.0 AS test-e2e-base-image

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN corepack enable \
  && apt update && apt install mkcert

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh


########################
# Nuxt: test (e2e)

FROM test-e2e-base-image AS test-e2e_development

ARG USER_NAME=e2e
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN groupadd -g $GROUP_ID -o $USER_NAME \
    && useradd -m -l -u $USER_ID -g $GROUP_ID -o -s /bin/bash $USER_NAME

USER $USER_NAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (e2e, preparation)

FROM test-e2e-base-image AS test-e2e-prepare

COPY --from=prepare /srv/app/ ./

RUN pnpm -r rebuild


# ########################
# # Nuxt: test (e2e, development)

# FROM test-e2e-prepare AS test-e2e-dev

# ENV NODE_ENV=development

# RUN pnpm --dir tests run test:e2e:server:dev


# ########################
# # Nuxt: test (e2e, node)

# FROM test-e2e-prepare AS test-e2e-node

# COPY --from=build-node /srv/app/src/.output ./src/.output

# RUN pnpm --dir tests run test:e2e:server:node


########################
# Nuxt: test (e2e, static)

FROM test-e2e-prepare AS test-e2e-static

COPY --from=build-static-test /srv/app/src/.output/public ./src/.output/public

RUN pnpm --dir tests run test:e2e:server:static


#######################
# Collect build, lint and test results.

FROM base-image AS collect

COPY --from=build-node /srv/app/src/.output ./.output
COPY --from=build-node /srv/app/src/package.json ./package.json
# COPY --from=build-cloudflare_pages /srv/app/package.json /dev/null
# COPY --from=build-static /srv/app/src/.output/public ./.output/public
COPY --from=build-static /srv/app/package.json /dev/null
COPY --from=lint /srv/app/package.json /dev/null
# COPY --from=test-unit /srv/app/package.json /dev/null
# COPY --from=test-e2e-dev /srv/app/package.json /dev/null
# COPY --from=test-e2e-node /srv/app/package.json /dev/null
COPY --from=test-e2e-static /srv/app/package.json /dev/null


# #######################
# # Provide a web server.

# FROM nginx:1.25.2-alpine AS production

# # The `CI` environment variable must be set for pnpm to run in headless mode
# ENV CI=true
# ENV NODE_ENV=production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
# EXPOSE 3000
# LABEL org.opencontainers.image.source="https://github.com/dargmuesli/jonas-thelemann"
# LABEL org.opencontainers.image.description="Jonas Thelemann's website."


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM collect AS production

ENV NODE_ENV=production

# Update dependencies.
RUN apk update \
    && apk upgrade --no-cache

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "start:node"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
EXPOSE 3000
LABEL org.opencontainers.image.source="https://github.com/dargmuesli/jonas-thelemann"
LABEL org.opencontainers.image.description="Jonas Thelemann's website."
