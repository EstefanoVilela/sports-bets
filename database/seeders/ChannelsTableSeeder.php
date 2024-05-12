<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Channel;

class ChannelsTableSeeder extends Seeder {
    public function run() {
        Channel::create(['name' => 'WhatsApp']);
        Channel::create(['name' => 'Telegram']);
        Channel::create(['name' => 'FB Messenger']);
    }
}