<?php

namespace App\Models;

use Database\Factories\FormationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Formation extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return FormationFactory::new();
    }

    protected $fillable = [
        'nomForm',
        // 'nbrePlace',
        'scolariteForm',
        'supprimer',
        'archiver',
    ];

    public function etudiant()
    {
        return $this->hasMany(InscriptionEtudiant::class, 'formation_id');
    }

    public function cours()
    {
        return $this->hasMany(Cours::class,'formation_id');
    }

    // public function note()
    // {
    //     return $this->hasOneThrough(Note::class, Cours::class);
    // }

    public function enseignant()
    {
        return $this->hasMany(Enseignant::class);
    }

    public function stage()
    {
        return $this->hasMany(Stage::class);
    }

    public function conduite()
    {
        return $this->hasMany(Conduite::class);
    }

    public function abscence()
    {
        return $this->hasMany(Abscence::class);
    }

   public function facture()
    {
        return $this->hasMany(Facture::class);
    }

   public function rembourssement()
  {
      return $this->hasMany(Rembourssement::class);
  }

  public function paiement()
  {
    return $this->hasMany(Paiement::class);
  }


}
