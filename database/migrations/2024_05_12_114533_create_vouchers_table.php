<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVouchersTable extends Migration {
    public function up() {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2);
            $table->foreignId('bank_id')->constrained('banks', 'id');
            $table->date('deposit_date');
            $table->time('deposit_time');
            $table->string('deposit_image_path');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('vouchers');
    }
}