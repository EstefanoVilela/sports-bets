<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration {
    public function up() {
        Schema::create('players', function (Blueprint $table) {
            $table->string('id', 10)->primary();
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->decimal('wallet_balance', 10, 2);
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('players');
    }
}