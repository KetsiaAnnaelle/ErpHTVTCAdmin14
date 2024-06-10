<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DepenseSortie>
 */
class DepenseSortieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomBudget'=>fake()->word(),
            'montant'=>fake()->numberBetween(5000, 500000),
            'devise'=>fake()->word(),
            'categorie_id'=>fake()->numberBetween(1,10),
            'dateDepart'=>fake()->date()
        ];
    }
}
