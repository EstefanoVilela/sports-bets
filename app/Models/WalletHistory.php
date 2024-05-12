<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletHistory extends Model {
    use HasFactory;
    protected $fillable = ['voucher_id', 'player_id', 'transacted_by', 'channel_id'];
}