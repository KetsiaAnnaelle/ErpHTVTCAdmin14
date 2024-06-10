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
      Schema::create('factures', function (Blueprint $table) {
                  $table->id();
                  $table->integer('total');
                  $table->integer('paye');
                  $table->integer('restant');
                  $table->string('echeance');
                  $table->string('status');
                  $table->integer('supprimer');
                  $table->integer('archiver');

                  $table->foreignId('etudiant_id')
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
        Schema::dropIfExists('factures');
    }
};
