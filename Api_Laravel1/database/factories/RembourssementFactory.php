<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Rembourssement;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rembourssement>
 */
class RembourssementFactory extends Factory
{

protected $model = Rembourssement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'total' => fake()->numberBetween(50000,250000),
            'paye' => fake()->numberBetween(50000,250000),
            'restant' => fake()->numberBetween(50000,250000),
            'echeance' => fake()->date(),
            'status' => fake()->word(),
            'archiver' => fake()->numberBetween(0,0),
            'supprimer' => fake()->numberBetween(0,0),
            'etudiant_id' => fake()->numberBetween(1,10),
            'formation_id' => fake()->numberBetween(1,10),
        ];
    }
}
