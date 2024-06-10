<?php

namespace Database\Factories;

use App\Models\PaiementEns;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaiementEns>
 */
class PaiementEnsFactory extends Factory
{

    protected $model = PaiementEns::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'RefPaiementEns' => fake()->word(),
            'MontantPaiementEns' => fake()->numberBetween(50000,400000),
            'MoyenPaiementEns' => fake()->word(),
            'MotifPaiementEns' => fake()->word(),
            'ProchainPaiementEns' => fake()->date(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'enseignant_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
