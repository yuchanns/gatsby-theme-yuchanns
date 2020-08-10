FROM node:14.7.0-alpine3.12

WORKDIR /app

ENV TZ=Asia/Shanghai

RUN sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories \
             & apk update && apk add --no-cache yarn vips vips-dev g++ make python2 pngquant \
             & npm install -g yrm --registry https://registry.npm.taobao.org/ && yrm use taobao && yarn global add gatsby-cli
