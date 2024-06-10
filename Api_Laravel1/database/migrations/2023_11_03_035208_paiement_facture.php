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
        Schema::create('paiement_factures', function (Blueprint $table) {
            $table->id();
            $table->integer('MontantPaiement');

            $table->unsignedBigInteger('facture_id');
            $table->foreign('facture_id')
                ->references('id')->on('factures')
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
        Schema::dropIfExists('paiement_factures');
    }
};
