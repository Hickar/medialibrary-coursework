FROM php:7.4
COPY . /app
WORKDIR /app
RUN apt-get update \
    && apt-get install ffmpeg -y \
    && docker-php-ext-install pdo pdo_mysql mysqli
#    && apt-get install
#CMD [ "php", "./your-script.php" ]