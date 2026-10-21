<?php

// Arquivo: routes/api.php
// Substitua o conteúdo deste arquivo pelo código abaixo.

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecadoController;
use Illuminate\Support\Facades\Route;

// ─────────────────────────────────────────────────────────────────────────────
// ROTAS PÚBLICAS — acessíveis sem token
// ─────────────────────────────────────────────────────────────────────────────

// Cadastro de novo usuário
Route::post('/register', [AuthController::class, 'register']);

// Login — retorna o token
Route::post('/login', [AuthController::class, 'login']);

// ─────────────────────────────────────────────────────────────────────────────
// ROTAS PROTEGIDAS — exigem token válido no header:
// Authorization: Bearer <token>
// ─────────────────────────────────────────────────────────────────────────────

Route::middleware('auth:sanctum')->group(function () {

    // Retorna os dados do usuário logado
    // GET /api/user (já existe no Laravel por padrão, mas declaramos explicitamente)
    Route::get('/user', fn($r) => $r->user());

    // Logout — revoga o token atual
    Route::post('/logout', [AuthController::class, 'logout']);

    // CRUD de recados
    Route::get('/recados',          [RecadoController::class, 'index']);    // listar
    Route::post('/recados',         [RecadoController::class, 'store']);    // criar
    Route::put('/recados/{id}',     [RecadoController::class, 'update']);   // editar
    Route::delete('/recados/{id}',  [RecadoController::class, 'destroy']);  // excluir
});
