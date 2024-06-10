<?php

namespace Database\Factories;

use App\Models\CarrierePerso;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CarrierePersoFactory extends Factory
{

     protected $model = CarrierePerso::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'AncienPostePerso' => fake()->word(),
            'NouveauPostePerso' => fake()->word(),
            'NouveauSalairePerso' => fake()->numberBetween(50000, 400000),
            'MotifPromotionPerso' => fake()->word(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'personnel_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
