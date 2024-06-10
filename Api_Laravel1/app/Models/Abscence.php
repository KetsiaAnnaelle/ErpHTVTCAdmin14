<?php

namespace App\Models;

use Database\Factories\AbscenceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abscence extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return AbscenceFactory::new();
    }

    protected $fillable = [
        'dateAbs',
        'nbreHeureAbs',
        'typeAbs',
        'motifAbs',
        'supprimer',
        'archiver',
        'etudiant_id',
        'formation_id',
        'cour_id',
    ];

    public function etudiant()
    {
        return $this->belongsTo(InscriptionEtudiant::class,'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }

    public function cour()
    {
        return $this->belongsTo(Cours::class,'cour_id');
    }

}
