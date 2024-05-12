<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder {
    public function run() {
        User::create([
            'id' => 1,
            'name' => 'Alex',
            'email' => 'ahinostroza@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => 1
        ]);
        User::create([
            'id' => 2,
            'name' => 'Estefano',
            'email' => 'evilela@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => 2
        ]);
        User::create([
            'id' => 3,
            'name' => 'Panchito',
            'email' => 'pvilela@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => 2
        ]);
    }
}