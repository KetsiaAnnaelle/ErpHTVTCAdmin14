<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NewConduite>
 */
class NewConduiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'noteCond'=> fake()->numberBetween(0,20),
            'conduite_id'=> fake()->numberBetween(1,10),
            'avisFormCond'=> fake()->word(),
        ];
    }
}
