<?php

namespace Database\Factories;

use App\Models\Paiement;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Paiement>
 */
class PaiementFactory extends Factory
{
    protected $model = Paiement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'RefPaiement'=> fake()->name(),
            'MontantPaiement'=> fake()->numberBetween(50000,250000),
            'MoyenPaiement'=> fake()->sentence(),
            'MotifPaiement'=> fake()->sentence(),
            'ProchainPaiement'=> fake()->date(),
            'Etudiant_id'=> fake()->numberBetween(1,10),
            'formation_id'=> fake()->numberBetween(1,10),
            'archived_at'=> null
        ];
    }
}