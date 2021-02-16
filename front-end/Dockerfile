FROM node:lts-alpine as build

WORKDIR /app
COPY . .
RUN yarn install && yarn build



FROM httpd:2.4-alpine

COPY --from=build /app/certs /usr/local/apache2/conf/
COPY --from=build /app/.htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /app/dist  /usr/local/apache2/htdocs/
COPY --from=build /app/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build /app/httpd-vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf