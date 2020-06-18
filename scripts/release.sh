#!/usr/bin/env bash

set -e

export PATH=$NODEJS_BIN_LATEST:$PATH

export PATH=$(npm bin):$PATH

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

npm install

npm run build

npm publish
