<?php

namespace Database\Factories;

use App\Models\PerformancePerso;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PerfomancePersoFactory extends Factory
{

    protected $model = PerformancePerso::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assuidPerso' => fake()->numberBetween(1,5),
            'respDelaiPerso' => fake()->numberBetween(1,5),
            'travailPerso' => fake()->numberBetween(1,5),
            'savoirVivrPerso' => fake()->numberBetween(1,5),
            'note' => fake()->numberBetween(0,20),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
            'personnel_id'  => fake()->numberBetween(1, 10),
        ];
    }
}
