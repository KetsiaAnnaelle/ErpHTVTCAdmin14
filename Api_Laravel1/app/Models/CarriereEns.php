<?php

namespace App\Models;

use Database\Factories\CarriereEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarriereEns extends Model
{
    use HasFactory;

     protected static function newFactory()
    {
        return CarriereEnsFactory::new();
    }

    protected $fillable = [
        'AncienPosteEns',
        'NouveauPosteEns',
        'NouveauSalaireEns',
        'MotifPromotionEns',
        'supprimer',
        'archiver',
        'enseignant_id'
    ];

      public function enseignant()
        {
            return $this->belongsTo(Enseignant::class);
        }
}
