<?php

namespace App\Http\Controllers;

// Para criar este arquivo:
// php artisan make:controller AuthController

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * E7 — POST /api/register
     * Cria um novo usuário e retorna o token de acesso.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password), // nunca salve senha sem hash!
        ]);

        // Cria um token Sanctum para o novo usuário
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 201);
    }

    /**
     * E7 — POST /api/login
     * Verifica as credenciais e retorna o token de acesso.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Auth::attempt verifica e-mail + senha no banco
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Credenciais inválidas.',
            ], 401); // 401 Unauthorized
        }

        // Se chegou aqui, as credenciais são válidas
        $token = $request->user()->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => $request->user(),
        ]);
    }

    /**
     * E7 — POST /api/logout
     * Revoga o token atual do usuário.
     * Rota protegida: requer auth:sanctum
     */
    public function logout(Request $request)
    {
        // Apaga apenas o token usado nesta requisição
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }
}
