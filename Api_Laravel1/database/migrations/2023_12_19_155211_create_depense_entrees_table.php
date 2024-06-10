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
        Schema::create('depense_entrees', function (Blueprint $table) {
            $table->id();
            $table->float('montant');
            $table->string('devise');
            $table->date('date')->default(now());

            $table->unsignedBigInteger('categorie_id');
            $table->foreign('categorie_id')
                ->references('id')->on('categorie_depenses')
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
        Schema::dropIfExists('depense_entrees');
    }
};
