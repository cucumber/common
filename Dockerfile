# Builds a docker image used for building most projects in this repo. It's
# used both by contributors and CI.
#
FROM mcr.microsoft.com/dotnet/core/sdk:2.2-alpine3.9

WORKDIR /app

RUN apk add --no-cache \
  bash \
  curl \
  diffutils \
  go \
  git \
  gnupg \
  g++ \
  jq \
  libc-dev \
  make \
  maven \
  nodejs \
  npm \
  openjdk8 \
  openssh \
  openssl-dev \
  protobuf \
  python2 \
  python2-dev \
  py2-pip \
  rsync \
  ruby \
  ruby-dev \
  unzip \
  wget \
  xmlstarlet

# Configure Ruby
RUN echo "gem: --no-document" > ~/.gemrc
RUN gem install bundler io-console

# Configure Python
RUN pip install pipenv==8.3.2

# Fix Protobuf - it doesn't include google/protobuf/timestamp.proto
RUN mkdir -p mkdir -p /usr/local/include/google/protobuf
RUN curl --fail -L https://raw.githubusercontent.com/protocolbuffers/protobuf/v3.6.1/src/google/protobuf/timestamp.proto > /usr/local/include/google/protobuf/timestamp.proto

# Install git-crypt
RUN git clone -b 0.6.0 --single-branch --depth 1 https://github.com/AGWA/git-crypt.git && \
    cd git-crypt && \
    make && make install
