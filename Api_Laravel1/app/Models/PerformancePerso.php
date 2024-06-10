<?php

namespace App\Models;

use Database\Factories\PerfomancePersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformancePerso extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return PerfomancePersoFactory::new();
    }

    protected $fillable = [
        'assuidPerso',
        'respDelaiPerso',
        'travailPerso',
        'savoirVivrPerso',
        'note',
        'supprimer',
        'archiver',
        'personnel_id'
    ];

     public function personnel()
    {
        return $this->belongsTo(Personnel::class);
    }
}
