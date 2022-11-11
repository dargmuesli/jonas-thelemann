#############
# Serve Nuxt in development mode.

# Should be the specific version of node:alpine.
FROM node:18.3.0-alpine3.14@sha256:a648bbe9a0af3991ef1bf02208b2e9b04b4bad49790efc5740a43d13cd1482b5 AS development

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

COPY ./package.json ./pnpm-lock.yaml ./

RUN npm install -g pnpm && \
  pnpm install

COPY ./ ./

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Build Nuxt.

# Should be the specific version of node:alpine.
FROM node:18.3.0-alpine3.14@sha256:a648bbe9a0af3991ef1bf02208b2e9b04b4bad49790efc5740a43d13cd1482b5 AS build

ARG NUXT_ENV_STACK_DOMAIN=jonas-thelemann.de
ENV NUXT_ENV_STACK_DOMAIN=${NUXT_ENV_STACK_DOMAIN}
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /srv/app/

COPY --from=development /srv/app/ ./

RUN npm install -g pnpm && \
  pnpm nuxi prepare && \
  pnpm run lint && \
  pnpm run build


#######################
# Provide a web server.

FROM nginx:1.23.2-alpine@sha256:7f01646baf70c28a99fc1c78b827d1942ba097daf693f1991daaeecd3c3dcc83 AS production

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /srv/app/.output/public/ ./

HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost/api/healthcheck || exit 1
