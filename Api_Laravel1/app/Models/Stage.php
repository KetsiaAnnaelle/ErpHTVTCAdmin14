<?php

namespace App\Models;

use Database\Factories\StageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return StageFactory::new();
    }

    protected $fillable = [
        'nomEntrSta',
        'dateDebSta',
        'dateFinSta',
        'projetSta',
        'statutProjSta',
        'noteSta',
        'rapSta',
        'etudiant_id',
        'formation_id',
        'supprimer',
        'archiver',
    ];

    public function etudiant()
    {
        return $this->belongsTo(InscriptionEtudiant::class,'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }
}
