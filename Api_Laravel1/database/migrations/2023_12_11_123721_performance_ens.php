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
        Schema::create('performance_ens', function (Blueprint $table) {
           $table->id();
           $table->integer('assuidEns');
           $table->integer('respDelaiEns');
           $table->integer('travailEns');
           $table->integer('savoirVivrEns');
           $table->integer('note');
           $table->integer('archiver');
           $table->string('supprimer');

           $table->unsignedBigInteger('enseignant_id');
           $table->foreign('enseignant_id')
               ->references('id')->on('enseignants')
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
         Schema::dropIfExists('performance_ens');
    }
};
