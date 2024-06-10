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
        Schema::create('performance_persos', function (Blueprint $table) {
           $table->id();
           $table->integer('assuidPerso');
           $table->integer('respDelaiPerso');
           $table->integer('travailPerso');
           $table->integer('savoirVivrPerso');
           $table->integer('note');
           $table->integer('archiver');
           $table->string('supprimer');

           $table->unsignedBigInteger('personnel_id');
           $table->foreign('personnel_id')
               ->references('id')->on('personnels')
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
       Schema::dropIfExists('performance_persos');
    }
};
