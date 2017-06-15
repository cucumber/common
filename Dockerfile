# Builds a docker image used for building all projects in this repo. It's
# used both by contributors and CI.
#
# To rebuild and republish this image, do the following:
#
#   source ./scripts/functions.sh
#   docker_build
#   docker_push
#
# Extend alpine-node, because alpine doesn't have node 8 yet, and we need
# it to build certain packages
FROM mhart/alpine-node:8.1.0

WORKDIR /app

RUN apk add --no-cache --update --upgrade alpine-sdk make bash maven openjdk8 diffutils jq python py-pip ruby ruby-dev perl perl-dev wget rsync
RUN npm install --global yarn
RUN echo "gem: --no-document" > ~/.gemrc
RUN gem install bundler io-console
RUN curl --fail -L http://cpanmin.us/ > /usr/local/bin/cpanm && chmod +x /usr/local/bin/cpanm
