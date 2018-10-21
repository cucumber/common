#!/usr/bin/env bash
set -euf -o pipefail
gpg -q --fast-import scripts/codesigning.asc
mvn deploy -Psign-source-javadoc --settings scripts/ci-settings.xml -DskipTests=true
