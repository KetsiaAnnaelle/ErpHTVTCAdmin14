<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class NewPerfPersoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'notePerfPerso'=> fake()->numberBetween(0,20),
            'avisPerfPerso'=> fake()->word(),
            'performance_perso_id'=> fake()->numberBetween(1,10),
        ];
    }
}
