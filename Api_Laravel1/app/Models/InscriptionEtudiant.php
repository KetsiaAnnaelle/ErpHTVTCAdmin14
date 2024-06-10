<?php

namespace App\Models;

use Database\Factories\EtudiantFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class InscriptionEtudiant extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected static function newFactory()
    {
        return EtudiantFactory::new();
    }

    protected $fillable = [
           'typeEtud',
           'nomEtud',
           'prenomEtud',
           'birthday',
           'sexe',
           'cni',
           'niveau',
           'ville',
           'pays',
           'telEtud',
           'whatsappEtud',
           'emailEtud',
           'nomTuteur',
           'telTuteur',
           'formation_id',
           'section',
           'motivation',
           'decouverte',
           'profil',
           'diplome',
           'photocopieCni',
           'archived_at'
    ];

    public function formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }

    public function absence()
    {
        return $this->hasMany(Abscence::class,'etudiant_id');
    }

    public function paiement()
    {
        return $this->hasMany(Paiement::class,'Etudiant_id');
    }

    public function note()
    {
        return $this->hasMany(Note::class,'Etudiant_id');
    }

    public function conduite()
    {
        return $this->hasMany(Conduite::class,'etudiant_id');
    }



    public function stage()
    {
        return $this->hasMany(Stage::class,'etudiant_id');
    }


    public function facture()
    {
        return $this->hasMany(Facture::class);
    }

     public function rembourssement()
    {
        return $this->hasMany(Rembourssement::class);
    }

}
