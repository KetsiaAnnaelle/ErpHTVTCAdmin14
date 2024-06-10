<?php

namespace App\Http\Controllers;

use App\Models\DepenseEntree;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepenseEntreeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaction = DB::table('depense_entrees')
            ->join('categorie_depenses', 'categorie_depenses.id', '=', 'depense_entrees.categorie_id')
            ->select('categorie_depenses.id',
                'categorie_depenses.nomCat',
                'depense_entrees.id',
                'depense_entrees.categorie_id',
                'depense_entrees.montant',
                'depense_entrees.devise',
                'depense_entrees.date',
                'depense_entrees.created_at'

               
            )
            // ->where('depense_entrees.archived_at',null)
            // ->where('depense_entrees.deleted_at',null)
            ->orderBy('depense_entrees.created_at','desc')
            ->get();
        // return EtudiantResource::collection(InscriptionEtudiant::orderBy('created_at','desc')->where('archived_at',null)->get());
        // return InscriptionEtudiant::orderBy('created_at','desc')->where('archived_at',null)->get();

        return response()->json($transaction);
    }

    public function store(Request $request)
    {
        try {

            $montantValue = $request->input('montant', 0);
            DepenseEntree::create([

                // 'montant'      => $montantValue,
                'montant'      => 7,
                'devise'       => $request->input('devise'),
                'categorie_id' => $request->input('categorie_id'),
                'date'         => $request->input('date')
            ]);

            return response()->json([
                'message'=>'true'
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'message'=> $e
            ]);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
     

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
