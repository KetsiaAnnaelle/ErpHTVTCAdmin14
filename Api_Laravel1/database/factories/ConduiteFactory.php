<?php

namespace Database\Factories;

use App\Models\Conduite;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conduite>
 */
class ConduiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model=Conduite::class;

    public function definition(): array
    {
        return [
            'dateCond' => fake()->date(),
            'assuidCond' => fake()->numberBetween(1,5),
            'comprCond' => fake()->numberBetween(1,5),
            'travailPersoCond' => fake()->numberBetween(1,5),
            'savoirVivrCond' => fake()->numberBetween(1,5),
            'avisFormcond' => fake()->word(),
            'notecond' => fake()->numberBetween(1,20),
            'etudiant_id' => fake()->numberBetween(1,10),
            'formation_id' => fake()->numberBetween(1,10),
            'supprimer' => fake()->numberBetween(0,0),
            'archiver' => fake()->numberBetween(0,0),
        ];
    }
}
