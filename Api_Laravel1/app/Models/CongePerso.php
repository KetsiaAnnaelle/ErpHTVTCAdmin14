<?php

namespace App\Models;

use Database\Factories\CongePersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CongePerso extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return CongePersoFactory::new();
    }

    protected $fillable = [
        'typeConge',
        'dateDeb',
        'dateFin',
        'supprimer',
        'archiver',
        'personnel_id'
    ];

      public function personnel()
        {
            return $this->belongsTo(Personnel::class);
        }
}
