<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bank;

class BanksTableSeeder extends Seeder {
    public function run() {
        Bank::create(['name' => 'BCP']);
        Bank::create(['name' => 'BBVA']);
        Bank::create(['name' => 'Interbank']);
    }
}