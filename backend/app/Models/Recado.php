<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recado extends Model
{
    use HasFactory;

    /**
     * Campos que podem ser preenchidos via create() ou update().
     * Sem isso o Laravel bloqueia a atribuição em massa (segurança).
     */
    protected $fillable = [
        'user_id',
        'titulo',
        'texto',
    ];

    /**
     * Relacionamento: um recado PERTENCE a um usuário.
     * Permite: $recado->user  →  retorna o User dono do recado
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
