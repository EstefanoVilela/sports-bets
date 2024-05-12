<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder {
    public function run() {
        Role::create(['name' => 'advisor']);
        Role::create(['name' => 'player']);
    }
}