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
        Schema::create('new_conduites', function (Blueprint $table) {
                    $table->id();
                    $table->integer('noteCond');
                    $table->string('avisFormCond');

                    $table->unsignedBigInteger('conduite_id');
                    $table->foreign('conduite_id')
                        ->references('id')->on('conduites')
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
        Schema::dropIfExists('new_conduites');
    }
};
