#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_676ca1e73c16_key -iv $encrypted_676ca1e73c16_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
