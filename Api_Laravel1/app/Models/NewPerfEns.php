<?php

namespace App\Models;

use Database\Factories\NewPerfEnsFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewPerfEns extends Model
{
    use HasFactory;

    protected $fillable = [
        'notePerfEns',
        'avisPerfEns',
        'performance_ens_id',
    ];

    protected static function newFactory()
    {
        return NewPerfEnsFactory::new();
    }

    public function performance()
    {
        return $this->belongsTo(PerformanceEns::class,'performance_ens_id');
    }
}
