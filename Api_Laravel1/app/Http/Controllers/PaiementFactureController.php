<?php

namespace App\Http\Controllers;

use App\Models\PaiementFacture;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaiementFactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        try {
            $paye = PaiementFacture::create([

                'MontantPaiement'=> $request->input('MontantPaiement'),
                'facture_id'=> $id,

            ]);
             \Log::info('New :', $paye);
            return response()->json([
                'message'=>'true'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message'=>$e
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
     {

        try {
            $paiementFacture = DB::table('paiement_factures')
                ->join('factures', 'factures.id', '=', 'paiement_factures.facture_id')
                ->select('paiement_factures.id','paiement_factures.facture_id','paiement_factures.MontantPaiement',
                'paiement_factures.created_at','factures.archiver','factures.supprimer')
                ->where('paiement_factures.facture_id',$id)
                ->where('factures.archiver',0)
                ->where('factures.supprimer',0)
                ->get();
                 \Log::info('New paye:', $paiementFacture->toArray());
            return response()->json($paiementFacture->toArray());
        } catch (\Throwable $e) {
            \Log::error($e);
            return response()->json(['error' => $e->getMessage()], 500);
        }

     }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $paiement=PaiementFacture::find($id);

            $paiement->update([
                'MontantPaiement'=> $request->input('MontantPaiement'),
            ]);

            return response()->json([
                'message'=>$id
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message'=>$e
            ]);
        }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
