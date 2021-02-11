# gatsby-theme-yuchanns
a blog theme for gatsby that combine github and reddit style.

## ATTENTION PLEASE
**THIS REPO HAS BEEN ARCHIVED !!!**

> Feeling devastated for some reason and becoming depressed about this repo.

## Status
![workflow Blog](https://github.com/yuchanns/gatsby-theme-yuchanns/workflows/Blog/badge.svg)

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

## LICENSE
[@yuchanns](yuchanns/LICENSE)
