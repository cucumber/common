#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_a86bd3a8f706_key -iv $encrypted_a86bd3a8f706_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
