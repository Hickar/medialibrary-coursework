FROM node:lts-alpine as build-stage

WORKDIR /app
COPY . .
RUN yarn install && yarn build



FROM httpd:2.4-alpine as production-stage

COPY --from=build-stage /app/certs /usr/local/apache2/conf/
COPY --from=build-stage /app/.htaccess /usr/local/apache2/htdocs/
COPY --from=build-stage /app/dist  /usr/local/apache2/htdocs/
COPY --from=build-stage /app/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build-stage /app/httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf