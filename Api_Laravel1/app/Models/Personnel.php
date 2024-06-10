<?php

namespace App\Models;

use Database\Factories\PersonnelFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return PersonnelFactory::new();
    }

    protected $fillable = [
        'nomPerso',
        'prenomPerso',
        'dateNaissancePerso',
        'adressePerso',
        'telPerso',
        'emailPerso',
        'diplomePerso',
        'typeContratPerso',
        'imagePerso',
        'sexePerso',
        'salairePerso',
        'debutContratPerso',
        'finContratPerso',
        'supprimer',
        'archiver',
        'postePerso'
    ];

    public function conge()
    {
        return $this->hasMany(CongePerso::class);
    }

    public function carriere()
    {
        return $this->hasMany(CarrierePerso::class);
    }

    public function performance()
    {
        return $this->hasMany(PerfomancePerso::class);
    }

    public function paiement()
    {
        return $this->hasMany(PaiementPerso::class);
    }

    public function ficheTravail()
    {
        return $this->hasMany(FicheTravailPerso::class);
    }
}
