#!/usr/bin/env bash
#
# Usage: install_protobuf.sh 3.6.0
#
set -euf -o pipefail

version=$1

wget https://github.com/google/protobuf/releases/download/v${version}/protobuf-all-${version}.tar.gz
tar -xzvf protobuf-all-${version}.tar.gz
cd protobuf-${version} && ./configure && make
