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
        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->string('RefPaiement');
            $table->integer('MontantPaiement');
            $table->string('MoyenPaiement');
            $table->string('MotifPaiement');
            $table->string('ProchainPaiement');
            $table->unsignedBigInteger('Etudiant_id');
            $table->foreign('Etudiant_id')
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

            $table->string('archived_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
