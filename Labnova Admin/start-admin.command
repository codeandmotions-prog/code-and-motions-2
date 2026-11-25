#!/bin/sh
cd "$(dirname "$0")" || exit 1
[ -d node_modules ] || npm install || exit 1
npm run dev
