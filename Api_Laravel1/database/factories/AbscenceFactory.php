<?php

namespace Database\Factories;

use App\Models\Abscence;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Abscence>
 */
class AbscenceFactory extends Factory
{
    protected $model = Abscence::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateAbs' => fake()->date(),
            'nbreHeureAbs' => fake()->numberBetween(0,20),
            'typeAbs' => fake()->name(),
            'motifAbs' => fake()->word(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'etudiant_id' => fake()->numberBetween(1,15),
            'formation_id' => fake()->numberBetween(1,10),
            'cour_id' => fake()->numberBetween(1,10),
        ];
    }
}
