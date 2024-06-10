<?php

namespace App\Models;

use Database\Factories\ConduiteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conduite extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return ConduiteFactory::new();
    }

    protected $fillable = [
        'dateCond',
        'assuidCond',
        'comprCond',
        'travailPersoCond',
        'savoirVivrCond',
        'avisFormcond',
        'notecond',
        'supprimer',
        'archiver',
        'etudiant_id',
        'formation_id',
    ];

    public function etudiant()
    {
        return $this->belongsTo(InscriptionEtudiant::class,'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }

     public function newconduite()
    {
        return $this->hasMany(NewConduite::class);
    }
}
