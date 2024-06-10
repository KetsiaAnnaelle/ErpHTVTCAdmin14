<?php

namespace Database\Factories;

use App\Models\Stage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stage>
 */
class StageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Stage::class;

    public function definition(): array
    {
        return [
            'nomEntrSta' => fake()->word(),
            'dateDebSta' => fake()->date(),
            'dateFinSta' => fake()->date(),
            'projetSta' => fake()->imageUrl(400,400),
            'statutProjSta' => fake()->word(),
            'rapSta' => fake()->word(),
            'noteSta' => fake()->numberBetween(0,20),
            'etudiant_id' => fake()->numberBetween(1,10),
            'formation_id' => fake()->numberBetween(1,10),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
        ];
    }
}
