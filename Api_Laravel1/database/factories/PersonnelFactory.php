<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PersonnelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomPerso'  => fake()->firstName(),
            'prenomPerso'  => fake()->lastName(),
            'dateNaissancePerso'  => fake()->date(),
            'adressePerso'  => fake()->word(),
            'telPerso'  => fake()->phoneNumber(),
            'emailPerso'  => fake()->word(),
            'diplomePerso'  => fake()->word(),
            'postePerso'  => fake()->word(),
            'typeContratPerso'  => fake()->word(),
            'imagePerso'  => fake()->imageUrl(400, 400),
            'sexePerso'  => fake()->word(),
            'salairePerso'  => fake()->numberBetween(50000, 400000),
            'debutContratPerso'  => fake()->date(),
            'finContratPerso'  => fake()->date(),
            'archiver'  => fake()->numberBetween(0, 0),
            'supprimer'  => fake()->numberBetween(0, 0),
        ];
    }
}
