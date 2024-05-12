<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Player;

class PlayersTableSeeder extends Seeder {
    public function run() {
        Player::create([
            'id' => '77654321',
            'first_name' => 'Estefano',
            'last_name' => 'Vilela',
            'wallet_balance' => 12.60,
        ]);
        Player::create([
            'id' => '77123456',
            'first_name' => 'Panchito',
            'last_name' => 'Vilela',
            'wallet_balance' => 24.90,
        ]);
    }
}