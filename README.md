# gatsby-theme-yuchanns
a blog theme for gatsby that combine github and reddit style.

## Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/17a3fcac-b5da-4f2c-afac-15c144d28243/deploy-status)](https://app.netlify.com/sites/gatsby-theme-yuchanns/deploys)

## Dev
```sh
# install
yarn
# develop
yarn workspace example dev
# build
yarn workspace example build
```
### Cautions
In case of trouble with installing sharp or gatsby-plugin-sharp on **OSX**, mind that the latest version requires **python2** and **vips** pre-installed. And certainly command-line tools is the major premise.
```sh
# osx
xcode-select --install
brew install python3 vips
```
> In my case I had python2 installed already which caused a gyp error installing sharp. So I removed it first.
>
> Need `csrutil status` to be disabled.

Another better way is deploying with **docker-compose**.

Simply run:
```sh
# you should build it at first
docker-compose build --no-cache
# first time run the container
docker-compose up -d
# stop the container
docker-compose stop
# start again
docker-compose start
# drop container
docker-compose down
```
