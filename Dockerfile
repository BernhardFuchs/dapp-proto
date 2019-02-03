ARG version=1.15.8
FROM nginx:${version}

LABEL Author="Bernhard Fuchs <developer.bernifox@gmail.com>"

#COPY ./dist/dapp-proto/* /www/

#COPY ./nginx.conf /etc/nginx/nginx.conf