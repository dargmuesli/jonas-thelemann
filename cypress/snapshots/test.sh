#!/bin/sh

set -e

THIS=$(dirname "$(readlink -f "$0")")

if [ -d cypress/snapshots/diff ]; then
  rm -rf cypress/snapshots/diff
fi

pnpm cypress run --env type=actual

files=$(find cypress/snapshots/diff -type f || 'true')

# if [ "$CI" != "" ]; then
for file in $files; do
  echo "@$THIS/../../$file"
  curl -i -F file="@$THIS/../../$file" "https://tmpfiles.org/api/v1/upload"
  printf "\n"
  break
done
# fi
