# Secrets

The `*.key` file(s) in this directory are encrypted with [git-crypt](https://www.agwa.name/projects/git-crypt/).

If you know the encryption key, you can decrypt them with:

    git-crypt unlock /path/to/git-crypt.key

CircleCI knows the key, and will decrypt them after checking out the code.

