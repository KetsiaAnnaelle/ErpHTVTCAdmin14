<?php

namespace App\Models;

use Database\Factories\FactureFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return FactureFactory::new();
    }

    protected $fillable = [
            'total',
            'paye',
            'restant',
            'echeance',
            'status' ,
            'archiver',
            'supprimer',
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

        public function facture()
        {
            return $this->hasMany(facture::class);
        }

}
