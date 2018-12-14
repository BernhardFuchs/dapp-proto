ARG version=3.8
FROM alpine:${version}

MAINTAINER Bernhard Fuchs <develper.bernifox@gmail.com>

RUN apk add --update \
  && apk add curl \
  && curl -sL https://deb.nodesource.com/setup_8.x \
  && apk add nodejs \
  && apk add gcc g++ make

RUN apk add --update nginx \
  && mkdir -p /run/nginx \
  && mkdir /www \
  && rm -rf /var/cache/apk/*

CMD [ "adduser", "-D -g", "'www' www"  ]

CMD [ "chown", "-R", "www:www /var/lib/nginx" ]

CMD [ "chown", "-R", "www:www /www" ]

CMD [ "mv", "/etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig" ]

# COPY ./nginx.conf /etc/nginx/nginx.conf

#COPY ./dist/dapp-proto/* /www/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]