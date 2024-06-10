<?php

namespace App\Models;

use Database\Factories\RembourssementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rembourssement extends Model
{
    use HasFactory;

     protected static function newFactory()
        {
            return RembourssementFactory::new();
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
             return $this->belongsTo(InscriptionEtudiant::class);
         }

         public function formation()
         {
             return $this->belongsTo(Formation::class);
         }
}
