<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Para criar este arquivo:
// php artisan make:model Recado -m
// O arquivo aparece em: database/migrations/xxxx_xx_xx_create_recados_table.php

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recados', function (Blueprint $table) {
            $table->id();

            // Chave estrangeira: cada recado pertence a um usuário
            $table->foreignId('user_id')
                  ->constrained()       // referencia a tabela 'users'
                  ->onDelete('cascade'); // se o user for deletado, apaga os recados

            $table->string('titulo');
            $table->text('texto');

            $table->timestamps(); // cria: created_at e updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recados');
    }
};
