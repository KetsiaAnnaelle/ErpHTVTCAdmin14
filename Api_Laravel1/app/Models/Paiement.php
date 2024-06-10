<?php

namespace App\Models;

use Database\Factories\PaiementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paiement extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'RefPaiement',
        'MontantPaiement',
        'MoyenPaiement',
        'MotifPaiement',
        'ProchainPaiement',
        'Etudiant_id',
        'formation_id',
        'archived_at'
    ];

    public function Etudiant()
    {
        return $this->belongsTo(InscriptionEtudiant::class,'Etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }

    protected static function newFactory()
    {
        return PaiementFactory::new();
    }
}
