<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Channel;

class ChannelsController extends Controller {
    public function index() {
        $channels = Channel::all();
        return response()->json($channels);
    }
}