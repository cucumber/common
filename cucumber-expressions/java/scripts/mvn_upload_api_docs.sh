#!/usr/bin/env bash

#
# Script that generates API docs and puts them in the Web Site's source tree.
#
if  [ "$TRAVIS_PULL_REQUEST" == 'true' ]; then
  exit 0
fi


# Fetch the current tag
TAG=`git describe --exact-match --abbrev=0`

if  [[ -z ${TAG} ]]; then
  echo "API Docs are only uploaded on a tagged build"
  exit 0
fi

# Clone the repo
git clone --depth=1 https://github.com/cucumber/api.cucumber.io.git
mkdir -p api.cucumber.io/cucumber-jvm/${TAG}

# Create the javadoc
mvn --quiet javadoc:aggregate
cp -R target/site/apidocs/ api.cucumber.io/cucumber-jvm/${TAG}/javadoc

# Setup up credentials
cd api.cucumber.io
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials

# Commit and push
git add cucumber-jvm/${TAG}/javadoc
git commit -m "Add javadoc for cucumber-jvm ${TAG}"
git push

