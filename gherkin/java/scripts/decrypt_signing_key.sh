#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_16c1bf8e2cda_key -iv $encrypted_16c1bf8e2cda_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
