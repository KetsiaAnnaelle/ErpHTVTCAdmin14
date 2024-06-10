<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class NewPerfEnsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'notePerfEns'=> fake()->numberBetween(0,20),
            'avisPerfEns'=> fake()->word(),
            'performance_ens_id'=> fake()->numberBetween(1,10),
        ];
    }
}
