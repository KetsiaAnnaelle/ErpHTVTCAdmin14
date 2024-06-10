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
            Schema::create('carriere_ens', function (Blueprint $table) {
                $table->id();
                $table->string('AncienPosteEns');
                $table->string('NouveauPosteEns');
                $table->integer('NouveauSalaireEns');
                $table->string('MotifPromotionEns');
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
            Schema::dropIfExists('carriere_ens');
        }


};
