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
            Schema::create('new_perf_ens', function (Blueprint $table) {
               $table->id();
               $table->integer('notePerfEns');
               $table->string('avisPerfEns');

               $table->unsignedBigInteger('performance_ens_id');
               $table->foreign('performance_ens_id')
                   ->references('id')->on('performance_ens')
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
             Schema::dropIfExists('new_perf_ens');
        }
};
