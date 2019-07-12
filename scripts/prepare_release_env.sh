#!/usr/bin/env bash

echo "$GIT_CRYPT_KEY_BASE64" | base64 -d > ~/git-crypt.key
git-crypt unlock ~/git-crypt.key
shopt -s dotglob
cp -R secrets/* ~
source ~/.bash_profile
