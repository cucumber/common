#!/usr/bin/env bash

if [ "${BASH_SOURCE[0]}" -ef "$0" ]
then
    echo "Usage: source ./scripts/prepare_release_env.sh"
    exit 1
fi

echo "$GIT_CRYPT_KEY_BASE64" | base64 -d > ~/git-crypt.key
git-crypt unlock ~/git-crypt.key
shopt -s dotglob
cp -R secrets/* ~
chmod 0600 ~/.gem/credentials
source ~/.bash_profile

export GPG_TTY=$(tty)
eval $(gpg-agent --daemon --sh)
gpg --batch -q --fast-import secrets/codesigning.key
echo "test" | gpg  --passphrase "${GPG_SIGNING_KEY_PASSPHRASE}" --batch --symmetric > /dev/null
git config user.signingkey E60E1F911B996560FFB135DAF4CABFB5B89B8BE6
