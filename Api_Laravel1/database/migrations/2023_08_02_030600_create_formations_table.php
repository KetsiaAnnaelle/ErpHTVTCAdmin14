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
            Schema::create('formations', function (Blueprint $table) {
                $table->id();
                $table->string('nomForm');
                // $table->integer('nbrePlace');
                $table->double('scolariteForm');
                $table->integer('supprimer');
                $table->integer('archiver');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('formations');
        }
};
