<?php

namespace App\Http\Controllers;

// Para criar este arquivo:
// php artisan make:controller RecadoController

use App\Models\Recado;
use Illuminate\Http\Request;

class RecadoController extends Controller
{
    /**
     * E5 — GET /api/recados
     * Lista todos os recados do usuário logado.
     */
    public function index()
    {
        $recados = auth()->user()->recados()->latest()->get();  // latest() ordena por created_at DESC

        return response()->json($recados);
    }

    /**
     * E5/E6 — POST /api/recados
     * Cria um novo recado vinculado ao usuário logado.
     */
    public function store(Request $request)
    {
        // Validação básica (E6)
        $request->validate([
            'titulo' => 'required|string|max:100',
            'texto'  => 'required|string',
        ]);

        // Cria o recado já vinculado ao usuário logado
        // O user_id é preenchido automaticamente pelo relacionamento
        $recado = auth()->user()->recados()->create([
            'titulo' => $request->titulo,
            'texto'  => $request->texto,
        ]);

        // 201 Created = padrão para POST bem-sucedido
        return response()->json($recado, 201);
    }

    /**
     * E5 — DELETE /api/recados/{id}
     * Remove um recado pelo ID.
     */
    public function destroy($id)
    {
        // firstOrFail retorna 404 automaticamente se não encontrar
        $recado = Recado::where('id', $id)
            ->where('user_id', auth()->id()) // garante que só o dono pode excluir
            ->firstOrFail();

        $recado->delete();

        // 204 No Content = padrão para DELETE bem-sucedido
        return response()->json(null, 204);
    }

    /**
     * E5 — PUT /api/recados/{id}
     * Atualiza o texto e/ou o título de um recado, buscando pelo ID.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'sometimes|string|max:100',
            'texto'  => 'sometimes|string',
        ]);

        $recado = Recado::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $recado->update($request->only('titulo', 'texto'));

        return response()->json($recado);
    }
}
