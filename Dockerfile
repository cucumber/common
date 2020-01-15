# Builds a docker image used for building most projects in this repo. It's
# used both by contributors and CI.
#
FROM mcr.microsoft.com/dotnet/core/sdk:2.2-alpine3.9

WORKDIR /app

RUN apk add --no-cache \
  bash \
  cmake \
  curl \
  diffutils \
  go \
  git \
  gnupg \
  groff \
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
  perl \
  perl-dev \
  protobuf \
  python2 \
  python2-dev \
  py2-pip \
  rsync \
  ruby \
  ruby-bigdecimal \
  ruby-dev \
  sed \
  su-exec \
  tree \
  unzip \
  upx \
  wget \
  xmlstarlet

# Create a cukebot user. Some tools (Bundler, npm publish) don't work properly
# when run as root

ENV USER=cukebot
ENV UID=1000
ENV GID=2000

RUN addgroup --gid "$GID" "$USER" \
    && adduser \
    --disabled-password \
    --gecos "" \
    --ingroup "$USER" \
    --uid "$UID" \
    --shell /bin/bash \
    "$USER"

# Configure Ruby
RUN echo "gem: --no-document" > ~/.gemrc
RUN gem install bundler io-console
RUN chown -R cukebot:cukebot /usr/lib/ruby
RUN chown -R cukebot:cukebot /usr/bin

# Configure Python
RUN pip install pipenv
RUN pip install twine
RUN chown -R cukebot:cukebot /usr/lib/python2.7/site-packages
RUN mkdir -p /usr/man && chown -R cukebot:cukebot /usr/man

# Configure Perl
RUN curl -L https://cpanmin.us/ -o /usr/local/bin/cpanm
RUN chmod +x /usr/local/bin/cpanm

# Upgrade NPM
RUN npm install --global npm

# Install git-crypt
RUN git clone -b 0.6.0 --single-branch --depth 1 https://github.com/AGWA/git-crypt.git && \
    cd git-crypt && \
    make && make install

# Install hub
RUN git clone \
    -b v2.12.2 --single-branch --depth 1 \
    --config transfer.fsckobjects=false \
    --config receive.fsckobjects=false \
    --config fetch.fsckobjects=false \
    https://github.com/github/hub.git && \
  cd hub && \
  make && \
  cp bin/hub /usr/local/bin/hub

# Install splitsh/lite
RUN go get -d github.com/libgit2/git2go && \
  cd $(go env GOPATH)/src/github.com/libgit2/git2go && \
  git checkout next && \
  git submodule update --init && \
  # config_test.go does not compile on the current go version
  rm $(go env GOPATH)/src/github.com/libgit2/git2go/config_test.go && \
  make install && \
  go get github.com/splitsh/lite && \
  go build -o /usr/local/bin/splitsh-lite github.com/splitsh/lite

CMD ["/bin/bash"]
