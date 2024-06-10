<?php

namespace App\Models;

use Database\Factories\PaiementPersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaiementPerso extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return PaiementPersoFactory::new();
    }

    protected $fillable = [
        'RefPaiementPerso',
        'MontantPaiementPerso',
        'MoyenPaiementPerso',
        'MotifPaiementPerso',
        'ProchainPaiementPerso',
        'supprimer',
        'archiver',
        'personnel_id'
    ];

      public function personnel()
        {
            return $this->belongsTo(Personnel::class);
        }
}
