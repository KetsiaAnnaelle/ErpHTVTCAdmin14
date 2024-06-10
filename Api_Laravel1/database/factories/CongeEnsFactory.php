<?php

namespace Database\Factories;

use App\Models\CongeEns;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CongeEns>
 */
class CongeEnsFactory extends Factory
{

    protected $model = CongeEns::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'typeConge' => fake()->word(),
            'dateDeb' => fake()->date(),
            'dateFin' => fake()->date(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'enseignant_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
