# Extend alpine-node, because alpine:3.5 doesn't have node 7 yet, and we need
# it to build certain packages
# FROM alpine:3.5
FROM mhart/alpine-node:7.7.3

WORKDIR /app

RUN apk add --no-cache --update --upgrade alpine-sdk make bash maven openjdk8 diffutils jq python py-pip ruby ruby-dev perl perl-dev wget
RUN npm install --global yarn
RUN echo "gem: --no-document" > ~/.gemrc
RUN gem install bundler io-console
RUN curl --fail -L http://cpanmin.us/ > /usr/local/bin/cpanm && chmod +x /usr/local/bin/cpanm
