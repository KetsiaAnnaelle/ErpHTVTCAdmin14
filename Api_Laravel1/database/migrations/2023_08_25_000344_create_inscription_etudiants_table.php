
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
        Schema::create('inscription_etudiants', function (Blueprint $table) {
            $table->id();

            $table->string('typeEtud');
            $table->string('nomEtud');
            $table->string('prenomEtud');
            $table->date('birthday');
            $table->string('sexe');
            $table->string('cni');
            $table->string('niveau');
            $table->string('ville');
            $table->string('pays');
            $table->string('telEtud');
            $table->string('whatsappEtud');
            $table->string('emailEtud');
            $table->string('nomTuteur');
            $table->string('telTuteur');

            $table->unsignedBigInteger('formation_id');
            $table->foreign('formation_id')
                ->references('id')->on('formations')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('section');
            $table->longText('motivation');
            $table->string('decouverte');
            $table->string('profil');
            $table->string('diplome');
            $table->string('photocopieCni');
            $table->string('archived_at')->nullable();
            $table->softDeletes(); //cette ligne va ajouter la colonne deleted_at dans la table inscription_etudiants

            $table->timestamps();


        });


    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

           Schema::dropIfExists('inscription_etudiants');

            // Réactive les contraintes de clé étrangère
            Schema::enableForeignKeyConstraints();

    }
};
