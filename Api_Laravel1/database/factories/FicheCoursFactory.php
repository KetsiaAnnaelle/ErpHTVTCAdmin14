<?php

namespace Database\Factories;

use App\Models\FicheCoursEns;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FicheCoursFactory extends Factory
{
    protected $model = FicheCoursEns::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(3),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'enseignant_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
