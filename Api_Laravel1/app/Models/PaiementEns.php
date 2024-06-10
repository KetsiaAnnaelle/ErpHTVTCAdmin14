<?php

namespace App\Models;

use Database\Factories\PaiementEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaiementEns extends Model
{
    use HasFactory;

    protected static function newFactory()
        {
            return PaiementEnsFactory::new();
        }

        protected $fillable = [
            'RefPaiementEns',
            'MontantPaiementEns',
            'MoyenPaiementEns',
            'MotifPaiementEns',
            'ProchainPaiementEns',
            'supprimer',
            'archiver',
            'enseignant_id'
        ];

          public function enseignant()
            {
                return $this->belongsTo(Eneignant::class);
            }
}
