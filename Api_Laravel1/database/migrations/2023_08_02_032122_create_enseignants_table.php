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
        Schema::create('enseignants', function (Blueprint $table) {
            $table->id();
            $table->string('nomEns');
            $table->string('prenomEns');
            $table->string('dateNaisEns');
            $table->string('emailEns');
            $table->string('cniEns');
            $table->string('nivEtudeEns');
            $table->string('villeEns');
            $table->string('paysEns');
            $table->string('telEns');
            $table->string('whatstappEns');
            $table->string('dernDiplEns');
            $table->string('genreEns');
            $table->string('typeContratEns');
            $table->string('salaireEns');
            $table->string('photoProfilEns');
            $table->integer('archiver');
            $table->integer('supprimer');

            $table->unsignedBigInteger('formation_id');
            $table->foreign('formation_id')
                ->references('id')->on('formations')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->unsignedBigInteger('cour_id');
            $table->foreign('cour_id')
                ->references('id')->on('cours')
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
        Schema::dropIfExists('enseignants');
    }
};
