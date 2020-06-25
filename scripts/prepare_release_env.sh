#!/usr/bin/env bash

if [ "${BASH_SOURCE[0]}" -ef "$0" ]
then
  >&2 echo "Usage: source ./scripts/prepare_release_env.sh"
  exit 1
fi

if [ ! -f "/app/RELEASE_PROCESS.md" ]; then
  >&2 echo -e "\033[0;31mReleases must be done from withing Docker\033[0m"
fi

shopt -s dotglob

chmod 0600 ~/.ssh/id_rsa
chmod 0644 ~/.ssh/id_rsa.pub
chmod 0644 ~/.ssh/known_hosts

source ~/secrets.sh
cukebot_enable_rubygems_release

export GPG_TTY=$(tty)
eval $(gpg-agent --daemon --sh)
gpg --batch -q --fast-import ~/codesigning.key
echo "test" | gpg  --passphrase "${GPG_SIGNING_KEY_PASSPHRASE}" --batch --symmetric > /dev/null
git config user.signingkey E60E1F911B996560FFB135DAF4CABFB5B89B8BE6
git config gpg.program "/app/scripts/gpg-with-passphrase"
