<?php

namespace App\Models;

use Database\Factories\CategorieDepenseFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategorieDepense extends Model
{
    use HasFactory;
    // use SoftDeletes;

    // protected static function newFactory()
    // {
    //     return CategorieDepenseFactory::new();
    // }

    protected $fillable = [
        // 'icone',
        'nomCat',
        'typeCat',
        // 'archived_at'
    ];
}
