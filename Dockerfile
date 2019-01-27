ARG version=3.8
FROM alpine:${version}

LABEL Author="Bernhard Fuchs <developer.bernifox@gmail.com>"

RUN apk add --update \
  && apk add curl \
  && curl -sL https://deb.nodesource.com/setup_8.x \
  && apk add nodejs \
  && apk add gcc g++ make

RUN apk add --update nginx \
  && mkdir -p /run/nginx \
  && mkdir /www \
  && rm -rf /var/cache/apk/*

RUN [ "adduser", "-D -g", "'www' www"  ]

RUN [ "chown", "-R", "www:www /var/lib/nginx" ]

RUN [ "chown", "-R", "www:www /www" ]

RUN [ "mv", "/etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig" ]

# COPY ./nginx.conf /etc/nginx/nginx.conf

#COPY ./dist/dapp-proto/* /www/

EXPOSE 80 443
RUN ["nginx", "-g", "daemon off;"]