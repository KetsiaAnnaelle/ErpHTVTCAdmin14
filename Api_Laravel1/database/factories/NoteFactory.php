<?php

namespace Database\Factories;

use App\Models\Note;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Note>
 */
class NoteFactory extends Factory

{

    protected $model = Note::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'valeur'=> fake()->numberBetween(0,20),
            'Etudiant_id'=> fake()->numberBetween(1,10),
            'formation_id'=> fake()->numberBetween(1,10),
            'cour_id'=> fake()->numberBetween(1,10),
        ];
    }
}
