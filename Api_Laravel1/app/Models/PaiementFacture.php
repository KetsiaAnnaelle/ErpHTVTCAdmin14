<?php

namespace App\Models;

use Database\Factories\PaiementFactureFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaiementFacture extends Model
{
    use HasFactory;

      protected $fillable = [
         'MontantPaiement',
         'facture_id'
     ];

     protected static function newFactory()
     {
         return PaiementFactureFactory::new();
     }

     public function facture()
     {
         return $this->belongsTo(facture::class,'facture_id');
     }
}
