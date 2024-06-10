<?php

namespace App\Models;

use Database\Factories\NewPaiementPersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPaiementPerso extends Model
{
    use HasFactory;

    protected $fillable = [
        'montantPerso',
        'paiement_perso_id',
    ];

    protected static function newFactory()
    {
        return NewPaiementPersoFactory::new();
    }

    public function paiement()
    {
        return $this->belongsTo(PaiementPerso::class,'paiement_perso_id');
    }
}
