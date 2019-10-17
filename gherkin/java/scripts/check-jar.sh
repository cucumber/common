#!/usr/bin/env bash
#
# Verifies that the jar doesn't have any non-"io.cucumber" classes. This might happen
# if some dependencies are shaded, but some are forgotten.
#
set -uf -o pipefail

check_jar() {
  jar="$1"
  echo "Checking contents of ${jar}"
  unshaded_classes=$(unzip -l ${jar} | grep .class | rev | cut -d' ' -f1 | rev | grep -v "^io\/cucumber\/")
  if [[ "${unshaded_classes}" != "" ]]; then
    echo "Some classes in ${jar} are not in the io.cucumber package. Rename the classes or change the maven-shade-plugin configuration."
    echo
    echo "${unshaded_classes}"
    exit 1
  fi
}

find . -name "*.jar" | while read jar; do 
  check_jar "${jar}"
done
