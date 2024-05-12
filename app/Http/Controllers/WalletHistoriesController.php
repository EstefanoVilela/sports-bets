<?php

namespace App\Http\Controllers;

use App\Models\WalletHistory;
use Illuminate\Http\Request;

class WalletHistoriesController extends Controller {
    public function top_ups($player_id) {
        $player = WalletHistory::where('player_id', $player_id);
        return response()->json($player);
    }
}