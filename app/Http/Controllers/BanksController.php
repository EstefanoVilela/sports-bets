<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bank;

class BanksController extends Controller {
    public function index() {
        $banks = Bank::all();
        return response()->json($banks);
    }
}