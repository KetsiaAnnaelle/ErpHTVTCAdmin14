<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepenseEntree extends Model
{
    use HasFactory;

    protected $fillable = [
        'categorie_id',
        'date',
        'montant',
        'devise',
    ];

    public function categories()
    {
        return $this->belongsToMany(CategorieDepense::class,'categorie_id');
    }
}
