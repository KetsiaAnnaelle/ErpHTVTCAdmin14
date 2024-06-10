<?php

namespace App\Models;

use Database\Factories\NewPaiementEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPaiementEns extends Model
{
    use HasFactory;

    protected $fillable = [
        'montantEns',
        'paiement_ens_id',
    ];

    protected static function newFactory()
    {
        return NewPaiementEnsFactory::new();
    }

    public function paiement()
    {
        return $this->belongsTo(PaiementEns::class,'paiement_ens_id');
    }

}
