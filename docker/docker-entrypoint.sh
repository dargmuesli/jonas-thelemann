#!/bin/sh
set -e

if [ "$NODE_ENV" != "production" ]; then
    pnpm config set store-dir "/srv/.pnpm-store"
    pnpm i
fi

exec "$@"
