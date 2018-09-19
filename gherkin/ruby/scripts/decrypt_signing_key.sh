#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_e07e008a1e04_key -iv $encrypted_e07e008a1e04_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
