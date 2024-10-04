<?php

namespace App\Models;

use Database\Factories\NoteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Note extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'valeur',
        'Etudiant_id',
        'formation_id',
        'cour_id',
        'sequence_id',
        'archived_at'
    ];

    public function Formation()
    {
        return $this->belongsTo(Formation::class,'formation_id');
    }

    public function Etudiant()
    {
        return $this->belongsTo(InscriptionEtudiant::class,'Etudiant_id');
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class,'cour_id');
    }

    protected static function newFactory()
    {
        return NoteFactory::new();
    }

}
