FROM php:8.2-cli

WORKDIR /var/www

RUN apt-get update && apt-get install -y unzip git
RUN docker-php-ext-install pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-scripts

COPY . .

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
