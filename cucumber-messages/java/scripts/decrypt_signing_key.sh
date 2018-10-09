#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_2177b0502a4c_key -iv $encrypted_2177b0502a4c_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
