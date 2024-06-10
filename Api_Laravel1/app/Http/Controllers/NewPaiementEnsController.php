<?php

namespace App\Http\Controllers;

use App\Models\NewPaiementEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewPaiementEnsController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {


        }

        public function seeNewPaiementEns(string $id)
        {

          $newPaiement=NewPaiementEns::find($id)
                  ->get();

            return response()->json($newPaiement);

        }

        public function show(string $id)
         {

            try {
                $newPaiements = DB::table('new_paiement_ens')
                    ->join('paiement_ens', 'paiement_ens.id', '=', 'new_paiement_ens.paiement_ens_id')
                    ->select('new_paiement_ens.id','new_paiement_ens.conduite_id','new_paiement_ens.montantEns','new_paiement_ens.created_at','paiement_ens.supprimer','paiement_ens.archiver')
                    ->where('new_conduites.conduite_id',$id)
                    ->where('paiement_ens.supprimer',0)
                    ->where('paiement_ens.archiver',0)
                    ->get();
                    \Log::info('New Paiement:', $newPaiement->toArray());
                return response()->json($newPaiement->toArray());
            } catch (\Throwable $e) {
                \Log::error($e);
                return response()->json(['error' => $e->getMessage()], 500);
            }

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
                NewPaiementEns::create([
                    'montantEns'=> $request->input('montantEns'),
                    'paiement_ens_id'=> $id,
                ]);
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
                $newPaiement=NewPaiementEns::find($id);

                $newPaiement->update([
                    'montantEns'=> $request->input('montantEns'),
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
