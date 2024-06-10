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
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->string('nomPerso');
            $table->string('prenomPerso');
            $table->date('dateNaissancePerso');
            $table->string('adressePerso');
            $table->string('telPerso');
            $table->string('emailPerso');
            $table->string('diplomePerso');
            $table->string('typeContratPerso');
            $table->string('imagePerso');
            $table->string('sexePerso');
            $table->string('salairePerso');
            $table->string('postePerso');
            $table->date('debutContratPerso');
            $table->date('finContratPerso');
            $table->string('archiver');
            $table->string('supprimer');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
};
