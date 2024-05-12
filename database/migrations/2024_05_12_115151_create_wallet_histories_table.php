<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWalletHistoriesTable extends Migration {
    public function up() {
        Schema::create('wallet_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('voucher_id')->constrained('vouchers', 'id'); # ->onDelete('')
            $table->string('player_id', 10);
            $table->foreignId('transacted_by')->constrained('users', 'id');
            $table->foreignId('channel_id')->constrained('channels', 'id');
            $table->timestamps();

            $table->foreign('player_id')->references('id')->on('players');
        });
    }

    public function down() {
        Schema::dropIfExists('wallet_histories');
    }
}