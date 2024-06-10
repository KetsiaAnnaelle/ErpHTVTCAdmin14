<?php

namespace App\Models;

use Database\Factories\NewConduiteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewConduite extends Model
{
    use HasFactory;

     protected $fillable = [
            'noteCond',
            'avisFormCond',
            'conduite_id',
        ];

        protected static function newFactory()
        {
            return NewConduiteFactory::new();
        }

        public function conduite()
        {
            return $this->belongsTo(Conduite::class,'conduite_id');
        }
}
