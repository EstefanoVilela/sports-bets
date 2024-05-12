<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\Player;
use App\Models\Voucher;
use App\Models\WalletHistory;

class WalletHistoriesController extends Controller {
    public function make_top_up(Request $request) {
        try {
            $voucherData = $request->validate([
                'amount' => 'required',
                'bank_id' => 'required',
                'deposit_date' => 'required',
                'deposit_time' => 'required',
                'deposit_image_path' => 'required',
            ]);

            $walletHistoryData = $request->validate([
                'player_id' => 'required',
                'transacted_by' => 'required',
                'channel_id' => 'required',
            ]);
    
            DB::beginTransaction();
            $voucher = Voucher::create($voucherData);
    
            $walletHistory = new WalletHistory($walletHistoryData);
            $walletHistory->voucher_id = $voucher->id;
            $walletHistory->save();

            $player = Player::findOrFail($request->input('player_id'));
            $player->wallet_balance += $voucher->amount;
            $player->save();
            DB::commit();

            return response()->json(['message' => 'La recarga se guardó exitosamente.'], 200);
        } catch (ValidationException $ex) {
            DB::rollBack();
            $errors = $ex->validator->errors()->all();
            return response()->json(['message' => 'Error de validación: ' . implode(', ', $errors)], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Se produjo un error al procesar la recarga.'], 500);
        }
    }

    public function top_ups($player_id) {
        $player = WalletHistory::where('player_id', $player_id);
        return response()->json($player);
    }
}