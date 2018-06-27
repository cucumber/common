#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_365192ac843a_key -iv $encrypted_365192ac843a_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
