FROM microsoft/dotnet:2.0.7-sdk-2.1.105-jessie
WORKDIR /app
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
RUN echo "deb http://download.mono-project.com/repo/debian stable-jessie main" | tee /etc/apt/sources.list.d/mono-official-stable.list

RUN apt-get update
RUN apt-get install build-essential jq -y
RUN apt-get install mono-devel jq -y