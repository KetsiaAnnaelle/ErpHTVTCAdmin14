<?php

namespace App\Models;

use Database\Factories\CoursFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cours extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected static function newFactory()
    {
        return CoursFactory::new();
    }

    protected $fillable = [
        'nomCours',
        'heureDeb',
        'heureFin',
        'description',
        'formation_id',
        'archived_at'
    ];

    public function abscence()
    {
        return $this->hasMany(Abscence::class);
    }

    public function formation()
    {
        return $this->belongsToMany(Formation::class,'formation_id')
            ->withTimestamps();
    }

    public function note()
    {
        return $this->hasMany(Note::class,'cour_id');
    }

    public function enseigant()
    {
        return $this->hasMany(Note::class);
    }
}
