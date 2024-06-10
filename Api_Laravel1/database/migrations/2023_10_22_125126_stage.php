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
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string('nomEntrSta');
            $table->string('dateDebSta');
            $table->string('dateFinSta');
            $table->string('projetSta');
            $table->string('statutProjSta');
            $table->string('rapSta');
            $table->integer('noteSta');
            $table->string('supprimer');
            $table->string('archiver');


            $table->unsignedBigInteger('etudiant_id');
            $table->foreign('etudiant_id')
                ->references('id')->on('inscription_etudiants')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('formation_id');
            $table->foreign('formation_id')
                ->references('id')->on('formations')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};
