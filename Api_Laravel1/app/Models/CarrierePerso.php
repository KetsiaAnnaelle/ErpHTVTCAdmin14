<?php

namespace App\Models;

use Database\Factories\CarrierePersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarrierePerso extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return CarrierePersoFactory::new();
    }

    protected $fillable = [
        'AncienPostePerso',
        'NouveauPostePerso',
        'NouveauSalairePerso',
        'MotifPromotionPerso',
        'supprimer',
        'archiver',
        'personnel_id'
    ];

      public function personnel()
        {
            return $this->belongsTo(Personnel::class);
        }
}
