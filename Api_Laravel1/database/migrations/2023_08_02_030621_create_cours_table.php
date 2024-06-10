<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->string('nomCours');
            $table->time('heureDeb');
            $table->time('heureFin');

            $table->unsignedBigInteger('formation_id');
            $table->foreign('formation_id')
                ->references('id')->on('formations')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->string('description');
            $table->string('archived_at')->nullable();
            $table->softDeletes(); //cette ligne va ajouter la colonne deleted_at dans la table inscription_etudiants

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
