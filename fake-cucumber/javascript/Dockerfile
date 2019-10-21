# cucumber/fake-cucumber
FROM node:12-alpine

RUN mkdir -p /home/node/app
ADD src /home/node/app/src
ADD test /home/node/app/test
ADD bin /home/node/app/bin
ADD package.json /home/node/app/package.json
ADD tsconfig.json /home/node/app/tsconfig.json
RUN cd /home/node/app && npm install
RUN cd /home/node/app && npm run build

ENTRYPOINT [ "/home/node/app/bin/fake-cucumber" ]
