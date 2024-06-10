<?php

namespace App\Models;

use Database\Factories\CongeEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongeEns extends Model
{
    use HasFactory;

    protected static function newFactory()
        {
            return CongeEnsFactory::new();
        }

        protected $fillable = [
            'typeConge',
            'dateDeb',
            'dateFin',
            'supprimer',
            'archiver',
            'enseignant_id'
        ];

          public function enseignant()
            {
                return $this->belongsTo(Enseignant::class);
            }
}
