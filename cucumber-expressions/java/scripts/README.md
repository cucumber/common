This directory contains scripts for decrypting a secret GPG signing key.
The build scripts use this key to sign code artifacts before they are published.

The GPG key in use is cukebot@cucumber.io, which has id `E60E1F911B996560FFB135DAF4CABFB5B89B8BE6`.

The secret key is encrypted and added to git (`scripts/codesigning.asc.enc`). 
The secret key is decrypted to `scripts/codesigning.asc` during a CI build.

## Instructions for new subrepos

The secret key must be re-encrypted for each subrepo, as Travis encrypts it
differently for each subrepo. 

    gpg --export-secret-key E60E1F911B996560FFB135DAF4CABFB5B89B8BE6 > scripts/codesigning.asc
    # Replace SLUG with the name of the subrepo, for example cucumber-expressions-java
    travis encrypt-file scripts/codesigning.asc scripts/codesigning.asc.enc --repo cucumber/SLUG

Copy the bold text and create a new file `scripts/decrypt_signing_key.sh` with:

```bash
#!/usr/bin/env bash
set -euf -o pipefail
openssl aes-256-cbc -K $encrypted_1570928b04a6_key -iv $encrypted_1570928b04a6_iv -in scripts/codesigning.asc.enc -out scripts/codesigning.asc -d
```

(The `openssl` line should be copied from `travis encrypt` output).

Make it executable and add to git:

    chmod +x scripts/decrypt_signing_key.sh 
    git add scripts/codesigning.asc.enc scripts/decrypt_signing_key.sh
    git commit -m "Add encrypted signing key"

### Maven-specific

Add the password for Sonatype cukebot (in 1Password) 

    travis encrypt CI_SONATYPE_PASSWORD="secretvalue" --add --repo cucumber/SLUG

Add the passphrase for the GPG signing key (in 1Password) 

    travis encrypt CI_GPG_PASSPHRASE="secretvalue" --add


