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

## Implement channel list endpoint
php artisan make:model Channel -m
php artisan migrate

php artisan make:controller ChannelsController

php artisan make:seeder ChannelsTableSeeder
php artisan db:seed --class=ChannelsTableSeeder

## Implement player detail endpoint
php artisan make:model Player -m
php artisan migrate

php artisan make:controller PlayersController

php artisan make:seeder PlayersTableSeeder
php artisan db:seed --class=PlayersTableSeeder

## Implement voucher endpoints
php artisan make:model Voucher -m
php artisan migrate

## Implement wallet top_up endpoint
php artisan make:model WalletHistory -m
php artisan migrate

php artisan make:controller WalletHistoriesController

## Implement role model
php artisan make:model Role -m
php artisan migrate

php artisan make:seeder RolesTableSeeder
php artisan db:seed --class=RolesTableSeeder

php artisan make:migration add_role_id_to_users_table --table=users
php artisan migrate

## Login
php artisan make:seeder UsersTableSeeder
php artisan db:seed --class=UsersTableSeeder

php artisan make:controller SessionsController

## GUARDAR RECARGA
```PHP
public function make_top_up(Request $request) {
    # Guardar voucher
    $voucher = $request->validate([
        'amount' => 'required',
        'bank_id' => 'required',
        'deposit_date' => 'required',
        'deposit_time' => 'required',
        'deposit_image_path' => 'required',
    ]);
    $voucher = Voucher::create($voucher);

    # guardar recarga
    $wallet_history = $request->validate([
        // 'voucher_id' => 'required',
        'player_id' => 'required',
        'transacted_by' => 'required',
        'channel_id' => 'required',
    ]);
    $wallet_history = new WalletHistory($wallet_history);
    $wallet_history->voucher_id = $voucher->id;
    $wallet_history->save();

    # actualizar saldo
    $player = Player::findOrFail($request->input('player_id'));
    $current_balance = $player->wallet_balance;
    $player->wallet_balance = $current_balance + $voucher->amount;
    $player->save();

    # response
    return response()->json(['message' => 'La recarga se guardó exitosamente.'], 200);
}
```