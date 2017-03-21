FROM alpine:3.5

WORKDIR /app
ADD . .

RUN apk add --no-cache --update --upgrade alpine-sdk make bash maven openjdk8 diffutils jq nodejs python py-pip ruby wget
RUN npm install --global yarn
RUN gem install io-console
RUN curl -L http://xrl.us/cpanm > /bin/cpanm && chmod +x /bin/cpanm
