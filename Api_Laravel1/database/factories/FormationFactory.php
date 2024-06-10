<?php

namespace Database\Factories;

use App\Models\Formation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formation>
 */
class FormationFactory extends Factory
{
    protected $model = Formation::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomForm' => fake()->name(),
            'NbreEtud' => fake()->numberBetween(1,20),
            'scolariteForm' => fake()->numberBetween(150000,300000),
            'archiver' => fake()->numberBetween(0,0),
            'supprimer' => fake()->numberBetween(0,0),
        ];
    }
}
