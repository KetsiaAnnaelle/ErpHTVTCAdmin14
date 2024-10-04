<?php

namespace App\Models;

use Database\Factories\EnseignantFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Enseignant extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return EnseignantFactory::new();
    }

    protected $fillable = [
        'nomEns',
        'prenomEns',
        'dateNaisEns',
        'emailEns',
        'cniEns',
        'nivEtudeEns',
        'villeEns',
        'paysEns',
        'telEns',
        'whatstappEns',
        'dernDiplEns',
        'genreEns',
        'typeContratEns',
        'salaireEns',
        'photoProfilEns',
        'cour_id',
        'formation_id',
        'archiver',
        'supprimer'
    ];

    /**
     * Get all of the deployments for the project.
     */
    public function ficheCours(): HasManyThrough
    {
        return $this->hasManyThrough(FicheCoursEns::class, Formation::class, Cours::class);
    }

    public function formation()
   {
       return $this->belongsTo(Formation::class);
   }

   public function cour()
   {
       return $this->belongsTo(Cours::class,'cour_id');
   }

   /*public function ficheCours()
   {
       return $this->hasMany(FicheCoursEns::class);
   }*/

   public function paiementEns()
   {
       return $this->hasMany(PaiementEns::class);
   }

   public function congeEns()
   {
       return $this->hasMany(CongeEns::class);
   }

   public function carriereEns()
   {
       return $this->hasMany(CarriereEns::class);
   }

}


