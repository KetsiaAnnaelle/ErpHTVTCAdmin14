<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class NewPaiementPersoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'montantPerso'=> fake()->numberBetween(100000,200000),
            'paiement_perso_id'=> fake()->numberBetween(1,10),
        ];
    }
}
