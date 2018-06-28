#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_1cfff19a9ef3_key -iv $encrypted_1cfff19a9ef3_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
