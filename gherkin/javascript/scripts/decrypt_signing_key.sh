#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_1b0a9d0f3b18_key -iv $encrypted_1b0a9d0f3b18_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
