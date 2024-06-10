<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class NewPaiementEnsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'montantEns'=> fake()->numberBetween(100000,200000),
            'paiement_ens_id'=> fake()->numberBetween(1,10),
        ];
    }
}
