#!/usr/bin/env bash
#
# Script that generates API docs and puts them in the Web Site's source tree.
#
GIT_TAG=$1

# Clone the repo
git clone --depth=1 https://github.com/cucumber/api.cucumber.io.git
mkdir -p api.cucumber.io/cucumber-jvm/${GIT_TAG}

# Create the javadoc
mvn --quiet javadoc:aggregate
cp -R target/site/apidocs/ api.cucumber.io/cucumber-jvm/${GIT_TAG}/javadoc

# Setup up credentials
cd api.cucumber.io
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials

# Commit and push
git add cucumber-jvm/${GIT_TAG}/javadoc
git commit -m "Add javadoc for cucumber-jvm ${GIT_TAG}"
git push

