<?php

namespace App\Models;

use Database\Factories\NewPerfPersoFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPerfPerso extends Model
{
    use HasFactory;

    protected $fillable = [
        'notePerfPerso',
        'avisPerfPerso',
        'performance_perso_id',
    ];

    protected static function newFactory()
    {
        return NewPerfPersoFactory::new();
    }

    public function performance()
    {
        return $this->belongsTo(PerformancePerso::class,'performance_perso_id');
    }
}
