<?php

namespace Database\Factories;

use App\Models\Enseignant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enseignant>
 */
class EnseignantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Enseignant::class;

    public function definition(): array
    {
        return [
            'nomEns'=> fake()->name(),
            'prenomEns'=> fake()->lastName(),
            'dateNaisEns'=> fake()->date(),
            'emailEns'=> fake()->email(),
            'cniEns'=> fake()->word(),
            'nivEtudeEns'=> fake()->word(),
            'villeEns'=> fake()->city(),
            'paysEns'=> fake()->country(),
            'telEns'=> fake()->phoneNumber(),
            'whatstappEns'=> fake()->phoneNumber(),
            'dernDiplEns'=> fake()->word(),
            'genreEns'=> fake()->word(),
            'typeContratEns'=> fake()->word(),
            'salaireEns'=> fake()->numberBetween(50000,200000),
            'photoProfilEns'=> fake()->word(),
            'formation_id'=> fake()->numberBetween(1,10),
            'cour_id'=> fake()->numberBetween(1,10),
            'archiver'=> fake()->numberBetween(0,0),
            'supprimer'=> fake()->numberBetween(0,0),
        ];
    }
}
