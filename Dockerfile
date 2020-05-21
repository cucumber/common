# Builds a docker image used for building most projects in this repo. It's
# used both by contributors and CI.
#
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=en_US.UTF-8

WORKDIR /app

# Include universe repositories for EOLed versions
RUN apt-get update \
    && apt-get install --assume-yes  \
        software-properties-common \
    && add-apt-repository universe

RUN apt-get update \
    && apt-get install --assume-yes  \
        bash \
        cmake \
        curl \
        diffutils \
        golang-go \
        git \
        gnupg \
        groff \
        g++ \
        jq \
        libc-dev \
        libxml2-dev \
        libxslt-dev \
        make \
        maven \
        mono-devel \
        openjdk-11-jdk \
        openssl \
        perl \
        protobuf-compiler \
        python2 \
        pipenv \
        rsync \
        ruby \
        ruby-dev \
        ruby-json \
        rubygems \
        sed \
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
RUN echo "gem: --no-document" > ~/.gemrc \
    && gem install bundler io-console \
    && chown -R cukebot:cukebot /usr/lib/ruby  \
    && chown -R cukebot:cukebot /usr/local/bin \
    && chown -R cukebot:cukebot /var/lib \
    && chown -R cukebot:cukebot /usr/bin

# Install and configure pip2, twine and behave
RUN curl https://bootstrap.pypa.io/get-pip.py | python2 \
    && pip install pipenv \
    && pip install twine \
    && pip install behave
#    && chown -R cukebot:cukebot /usr/lib/python2.7/site-packages \
#    && mkdir -p /usr/man && chown -R cukebot:cukebot /usr/man

# Configure Perl
RUN curl -L https://cpanmin.us/ -o /usr/local/bin/cpanm \
    && chmod +x /usr/local/bin/cpanm

# Install git-crypt
RUN apt-get install libssl-dev \
    && git clone -b 0.6.0 --single-branch --depth 1 https://github.com/AGWA/git-crypt.git \
    && cd git-crypt \
    && make && make install

# Install hub
RUN git clone \
        -b v2.12.2 --single-branch --depth 1 \
        --config transfer.fsckobjects=false \
        --config receive.fsckobjects=false \
        --config fetch.fsckobjects=false \
        https://github.com/github/hub.git  \
    && cd hub  \
    && make  \
    && cp bin/hub /usr/local/bin/hub

# Install splitsh/lite
RUN go get -d github.com/libgit2/git2go \
    && cd $(go env GOPATH)/src/github.com/libgit2/git2go \
    && git checkout next \
    && git submodule update --init \
    && make install \
    && go get github.com/splitsh/lite \
    && go build -o /usr/local/bin/splitsh-lite github.com/splitsh/lite

# Install .NET Core
# https://github.com/dotnet/dotnet-docker/blob/5c25dd2ed863dfd73edb1a6381dd9635734d0e5f/2.2/sdk/bionic/amd64/Dockerfile
ENV DOTNET_CLI_TELEMETRY_OPTOUT=true
## Install .NET CLI dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libc6 \
        libgcc1 \
        libgssapi-krb5-2 \
        liblttng-ust0 \
        libstdc++6 \
        zlib1g \
    && rm -rf /var/lib/apt/lists/*

## Install .NET Core SDK
ENV DOTNET_SDK_VERSION 2.2.207
RUN curl -SL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='9d70b4a8a63b66da90544087199a0f681d135bf90d43ca53b12ea97cc600a768b0a3d2f824cfe27bd3228e058b060c63319cd86033be8b8d27925283f99de958' \
    && echo "$dotnet_sha512 dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -zxf dotnet.tar.gz -C /usr/share/dotnet \
    && rm dotnet.tar.gz \
    && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet

## Trigger first run experience by running arbitrary cmd to populate local package cache
RUN dotnet help

# Install Berp
RUN wget https://www.nuget.org/api/v2/package/Berp/1.1.1 \
    && mkdir -p /var/lib/berp \
    && unzip 1.1.1 -d /var/lib/berp/1.1.1 \
    && rm 1.1.1

# Install JS
## Install yarn withouth node
RUN apt-get update \
    && apt-get install --assume-yes --no-install-recommends yarn

USER cukebot

## As a user install node and npm via node version-manager
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm install 12.16.2 \
    && nvm install-latest-npm


CMD ["/bin/bash"]
