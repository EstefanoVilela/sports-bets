<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder {
    public function run() {
        User::create([
            'name' => 'Alex',
            'email' => 'ahinostroza@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => 1
        ]);
    }
}