# LARAVEL Y REACT

## Implement React in Laravel
composer require laravel/ui
php artisan ui react

npm i && npm run dev

## Implement bank list endpoint
php artisan make:model Bank -m
php artisan migrate

php artisan make:controller BanksController

php artisan make:seeder BanksTableSeeder
php artisan db:seed --class=BanksTableSeeder