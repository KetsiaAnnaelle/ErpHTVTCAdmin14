<?php
namespace Database\Factories;

use App\Models\CarriereEns;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CarriereEns>
 */
class CarriereEnsFactory extends Factory
{

    protected $model = CarriereEns::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'AncienPosteEns' => fake()->word(),
            'NouveauPosteEns' => fake()->word(),
            'NouveauSalaireEns' => fake()->numberBetween(50000, 400000),
            'MotifPromotionEns' => fake()->word(),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'enseignant_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
