<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Models\Player;
use App\Models\Voucher;
use App\Models\WalletHistory;
use Exception;

class WalletHistoriesController extends Controller {
    public function make_top_up(Request $request) {
        try {
            if (!$request->hasFile('deposit_image'))
                throw new Exception('No se envió una imagen del voucher');

            $deposit_image = $request->file('deposit_image');
            $image_name = time() . '.' . $deposit_image->getClientOriginalExtension();
            $deposit_image->move(public_path('vouchers'), $image_name);

            $deposit_image_path = "/vouchers/$image_name";

            $voucherData = $request->validate([
                'amount' => 'required',
                'bank_id' => 'required',
                'deposit_date' => 'required',
                'deposit_time' => 'required',
            ]);

            $walletHistoryData = $request->validate([
                'player_id' => 'required',
                'transacted_by' => 'required',
                'channel_id' => 'required',
            ]);
    
            DB::beginTransaction();
            $voucher = new Voucher($voucherData);
            $voucher->deposit_image_path = $deposit_image_path;
            $voucher->save();
    
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
            return response()->json([
                'message' => 'Error de validación.',
                'trace' => $errors
            ], 422);
        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json(['message' => 'Se produjo un error al procesar la recarga.'], 500);
        }
    }

    public function top_ups($user_id) {
        $player = Player::where('user_id', $user_id)->firstOrFail();

        $wallet_histories = WalletHistory::join('vouchers', 'wallet_histories.voucher_id', '=', 'vouchers.id')
                            ->join('banks', 'vouchers.bank_id', '=', 'banks.id')
                            ->join('channels', 'wallet_histories.channel_id', '=', 'channels.id')
                            ->join('users', 'wallet_histories.transacted_by', '=', 'users.id')
                            ->select(
                                'users.name as user_name',
                                'wallet_histories.created_at',
                                'vouchers.amount',
                                'vouchers.deposit_image_path',
                                'banks.name as bank_name',
                                'channels.name as channel_name'
                            )->where('player_id', $player->id)
                            ->get();

        return response()->json($wallet_histories);
    }
}