<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class SessionsController extends Controller {
    public function store(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->input('email'))->firstOrFail();
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'user' => $user
            ], 200);
        }

        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }
}