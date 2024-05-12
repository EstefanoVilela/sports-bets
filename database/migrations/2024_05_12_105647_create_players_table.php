<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration {
    public function up() {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('player_id', 10)->unique();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->decimal('wallet_balance', 10, 2);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('players');
    }
}