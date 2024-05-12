<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\ChannelsController;
use App\Http\Controllers\BanksController;
use App\Http\Controllers\WalletHistoriesController;
use App\Http\Controllers\SessionsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/players/{id}', [PlayersController::class, 'show']);
Route::get('/channels', [ChannelsController::class, 'index']);
Route::get('/banks', [BanksController::class, 'index']);
Route::get('/wallet_histories/top_ups/{player_id}', [WalletHistoriesController::class,'top_ups']);

Route::post('/sessions/store', [SessionsController::class, 'store']);