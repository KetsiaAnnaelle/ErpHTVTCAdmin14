<?php

namespace Database\Factories;

use App\Models\PaiementFacture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaiementFacture>
 */
class PaiementFactureFactory extends Factory
{

    protected $model = PaiementFacture::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'MontantPaiement'=> fake()->numberBetween(50000,250000),
            'facture_id'=> fake()->numberBetween(1,10)
        ];
    }
}
