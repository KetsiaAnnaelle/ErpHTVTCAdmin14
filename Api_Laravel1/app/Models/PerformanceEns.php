<?php

namespace App\Models;

use Database\Factories\PerformanceEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceEns extends Model
{
    use HasFactory;

    use HasFactory;

        protected static function newFactory()
        {
            return PerformanceEnsFactory::new();
        }

        protected $fillable = [
            'assuidEns',
            'respDelaiEns',
            'travailEns',
            'savoirVivrEns',
            'note',
            'supprimer',
            'archiver',
            'enseignant_id'
        ];

         public function enseignant()
        {
            return $this->belongsTo(Enseignant::class);
        }
}
