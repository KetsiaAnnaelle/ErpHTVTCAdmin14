<?php

namespace Database\Factories;

use App\Models\InscriptionEtudiant;
use Illuminate\Database\Eloquent\Factories\Factory;

class EtudiantFactory extends Factory
{
    protected $model = InscriptionEtudiant::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'typeEtud' => fake()->name(),
            'nomEtud' => fake()->firstName(),
            'prenomEtud' => fake()->lastName(),
            'birthday' => fake()->date(),
            'sexe' => fake()->name(),
            'cni' => fake()->word(),
            'niveau' => fake()->word(),
            'ville' => fake()->city(),
            'pays' => fake()->country(),
            'telEtud' => fake()->phoneNumber(),
            'whatsappEtud' => fake()->phoneNumber(),
            'emailEtud' => fake()->email(),
            'nomTuteur' => fake()->name(),
            'telTuteur' => fake()->phoneNumber(),
            'formation_id' => fake()->numberBetween(1,10),
           'section' => fake()->word(),
            'motivation' => fake()->sentence(),
            'decouverte' => fake()->sentence(),
            'profil' => fake()->imageUrl(400,400),
            'diplome' => fake()->imageUrl(400,400),
            'photocopieCni' => fake()->imageUrl(400,400),
            'archived_at' => null

        ];
    }
}
