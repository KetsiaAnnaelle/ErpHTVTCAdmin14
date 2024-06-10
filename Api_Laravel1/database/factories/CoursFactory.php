<?php

namespace Database\Factories;

use App\Models\Cours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cours>
 */
class CoursFactory extends Factory
{
    protected $model = Cours::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomCours' => fake()->name(),
            'heureDeb' => fake()->time(),
            'heureFin' => fake()->time(),
            'description' => fake()->word(),
            'formation_id' => fake()->numberBetween(1,10),
        ];
    }
}
