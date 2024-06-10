<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DepenseEntreeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'montant'=>fake()->numberBetween(-5000, 0),
            'devise'=>fake()->word(),
            'categorie_id'=>fake()->numberBetween(1,10),
            'date'=>fake()->date()
        ];
    }
}
