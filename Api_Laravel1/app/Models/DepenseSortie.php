<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepenseSortie extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomBudget',
        'montant',
        'devise',
        'categorie_id',
        'dateDepart'
    ];

    public function categories()
    {
        return $this->belongsToMany(CategorieDepense::class,'categorie_id');
    }
}
