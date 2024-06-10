<?php

namespace Database\Factories;

use App\Models\PerformanceEns;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PerformanceEnsFactory extends Factory
{

    protected $model = PerformanceEns::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assuidEns' => fake()->numberBetween(1,5),
            'respDelaiEns' => fake()->numberBetween(1,5),
            'travailEns' => fake()->numberBetween(1,5),
            'savoirVivrEns' => fake()->numberBetween(1,5),
            'note' => fake()->numberBetween(0,20),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'enseignant_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
