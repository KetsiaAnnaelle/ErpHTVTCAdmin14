<?php

namespace App\Models;

use Database\Factories\FicheCoursFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheCoursEns extends Model
{
    use HasFactory;

     protected static function newFactory()
    {
        return FicheCoursFactory::new();
    }

    protected $fillable = [
        'description',
        'supprimer',
        'archiver',
        'enseignant_id'
    ];

    /* public function enseignant()
       {
           return $this->belongsTo(Enseignant::class);
       }*/

    public function enseignant(): HasManyThrough
    {
        return $this->hasManyThrough(
            FicheCoursEns::class,
            Cours::class,
            Formation::class,
            'enseignant_id',
            'cour_id',
            'formation_id',
            'id',
            'id'
        );
    }
}
