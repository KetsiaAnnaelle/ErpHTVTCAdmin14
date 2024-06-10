<?php

namespace App\Models;

use Database\Factories\FicheTravailPersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheTravailPerso extends Model
{
    use HasFactory;

     protected static function newFactory()
    {
        return FicheTravailPersoFactory::new();
    }

    protected $fillable = [
        'description',
        'supprimer',
        'archiver',
        'personnel_id'
    ];

     public function personnel()
       {
           return $this->belongsTo(Personnel::class);
       }
}
