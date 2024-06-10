<?php

namespace Database\Factories;

use App\Models\PaiementPerso;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PaiementPersoFactory extends Factory
{

    protected $model = PaiementPerso::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'RefPaiementPerso' => fake()->word(),
            'MontantPaiementPerso' => fake()->numberBetween(50000,400000),
            'MoyenPaiementPerso' => fake()->word(),
            'MotifPaiementPerso' => fake()->word(),
            'ProchainPaiementPerso' => fake()->date(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'personnel_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
