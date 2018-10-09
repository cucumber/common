#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_0f645401adb0_key -iv $encrypted_0f645401adb0_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
