#!/usr/bin/env bash
#
# Verifies that the jar doesn't have any non-"io.cucumber" classes. This might happen
# if some dependencies are shaded, but some are forgotten.
#
set -uf -o pipefail

check_jar() {
  jar="$1"
  module_name=$(xmlstarlet sel -N pom="http://maven.apache.org/POM/4.0.0"  -t -m "//pom:project.Automatic-Module-Name" -v . pom.xml)
  module_path=$(echo $module_name | sed "s/\./\\\\\//g")
  echo "Checking contents of ${jar}"
  unshaded_classes=$(unzip -l ${jar} | grep -e "\.class" | rev | cut -d' ' -f1 | rev | grep -v "^$module_path")
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
