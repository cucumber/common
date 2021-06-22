FROM node:16.3.0-alpine3.13 as javascript
RUN apk add make --no-cache
COPY package.json package.json
COPY Makefile Makefile
COPY default.mk default.mk
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY .mocharc.json .mocharc.json
COPY src src
COPY test test

ENTRYPOINT ["/usr/bin/make"]