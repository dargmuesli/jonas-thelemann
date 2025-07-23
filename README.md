[![CI](https://github.com/dargmuesli/jonas-thelemann/actions/workflows/ci.yml/badge.svg)](https://github.com/dargmuesli/jonas-thelemann/actions/workflows/ci.yml)
[![website uptime monitoring](https://app.statuscake.com/button/index.php?Track=7038276&Days=1&Design=3)](https://www.statuscake.com "website uptime monitoring")

# jonas-thelemann

The source code of [jonas-thelemann.de](https://jonas-thelemann.de/).

![Welcome](https://jonas-thelemann.de/__og-image__/static/og.png "Jonas Thelemann")

## Table of Contents
1. **[Development](#development)**
1. **[Deployment](#deployment)**

## Development
This project builds upon the [Nuxt.js](https://nuxtjs.org/) framework.
Install [Node.js](https://nodejs.org/) and [mkcert](https://github.com/FiloSottile/mkcert).
Then run `bun install` to install the project's dependencies.
After that, use `bun run dev` for development or `bun run build` to generate the [static page](https://nuxtjs.org/blog/going-full-static).

Alternatively, build the provided [Dockerfile](https://www.docker.com/) using `docker build -t dargmuesli/jonas-thelemann .` and run the resulting image using `docker run dargmuesli/jonas-thelemann`.

## Deployment
This project is deployed within the [jonas-thelemann_stack](https://github.com/dargmuesli/jonas-thelemann_stack/) in accordance to the [dargstack template](https://github.com/dargstack/dargstack_template/) to make deployment a breeze.
