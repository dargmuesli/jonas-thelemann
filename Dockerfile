#############
# Serve Nuxt in development mode.

FROM node:20.3.1-alpine@sha256:7a6e3b7dcc549a2af31be9dab80038e29e46df43c2e36f2a185e5239c45b9da2 AS development

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

RUN corepack enable

WORKDIR /srv/app/

COPY ./docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "--dir", "nuxt", "dev"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.3.1-alpine@sha256:7a6e3b7dcc549a2af31be9dab80038e29e46df43c2e36f2a185e5239c45b9da2 AS prepare

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

FROM node:20.3.1-alpine@sha256:7a6e3b7dcc549a2af31be9dab80038e29e46df43c2e36f2a185e5239c45b9da2 AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm --dir nuxt run generate


########################
# Nuxt: lint

FROM node:20.3.1-alpine@sha256:7a6e3b7dcc549a2af31be9dab80038e29e46df43c2e36f2a185e5239c45b9da2 AS lint

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm --dir nuxt run lint


########################
# Nuxt: test (e2e)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e_base

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

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN corepack enable

COPY --from=prepare /srv/app/ ./

RUN pnpm rebuild


########################
# Nuxt: test (e2e, development)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-dev

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=development

WORKDIR /srv/app/

RUN corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./

RUN pnpm --dir nuxt run test:e2e:dev


########################
# Nuxt: test (e2e, production)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-prod

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./
COPY --from=build /srv/app/nuxt/.output /srv/app/nuxt/.output

# # Do not run in parallel with `test-e2e-dev`
# COPY --from=test-e2e-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm --dir nuxt run test:e2e:prod


#######################
# Collect build, lint and test results.

FROM node:20.3.1-alpine@sha256:7a6e3b7dcc549a2af31be9dab80038e29e46df43c2e36f2a185e5239c45b9da2 AS collect

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=build /srv/app/nuxt/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/package.json
COPY --from=test-e2e-dev /srv/app/package.json /tmp/package.json
COPY --from=test-e2e-prod /srv/app/package.json /tmp/package.json


#######################
# Provide a web server.

FROM nginx:1.25.1-alpine@sha256:2d194184b067db3598771b4cf326cfe6ad5051937ba1132b8b7d4b0184e0d0a6 AS production

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=production

WORKDIR /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=collect /srv/app/.output/public/ ./

HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3001/api/healthcheck || exit 1
EXPOSE 3001


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
