<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rembourssement;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Support\Facades\DB;

class RembourssementController extends Controller
{
    /**
             * Display a listing of the resource.
             */
            public function index()
            {

                $rembourssements = DB::table('rembourssements')
                    ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'rembourssements.etudiant_id')
                    ->join('formations', 'formations.id', '=', 'rembourssements.formation_id')
                    ->select('rembourssements.id','rembourssements.total','rembourssements.formation_id','rembourssements.paye','rembourssements.restant','rembourssements.echeance','rembourssements.status','rembourssements.supprimer','rembourssements.archiver','rembourssements.created_at','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                    ->where('rembourssements.supprimer',0)
                    ->Where('rembourssements.archiver',0)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($rembourssements);

            }

               /**
                 * Display a listing of the resource.
                 */
                public function rembourBrouillon()
                {

                    $rembourssements = DB::table('rembourssements')
                                    ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'rembourssements.etudiant_id')
                                    ->join('formations', 'formations.id', '=', 'rembourssements.formation_id')
                                    ->select('rembourssements.id','rembourssements.total','rembourssements.formation_id','rembourssements.paye','rembourssements.restant','rembourssements.echeance','rembourssements.status','rembourssements.supprimer','rembourssements.archiver', 'rembourssements.created_at','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                                    ->where('rembourssements.supprimer',0)
                                    ->Where('rembourssements.archiver',1)
                                    ->orderBy('id','desc')
                                    ->get();

                                return response()->json($rembourssements);

                }

                /**
                         * Display a listing of the resource.
                         */
                        public function factSupprimer()
                        {

                        $rembourssements = DB::table('rembourssements')
                                        ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'rembourssements.etudiant_id')
                                        ->join('formations', 'formations.id', '=', 'rembourssements.formation_id')
                                        ->select('rembourssements.id','rembourssements.total','rembourssements.formation_id','rembourssements.paye','rembourssements.restant','rembourssements.echeance','rembourssements.status','rembourssements.supprimer','rembourssements.archiver', 'rembourssements.created_at','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                                        ->where('rembourssements.supprimer',1)
                                        ->Where('rembourssements.archiver',0)
                                        ->orderBy('id','desc')
                                        ->get();

                                    return response()->json($rembourssements);

                        }

                 /**
                 * Display a listing of the resource.
                 */
                public function seeFactures(string $id)
                {

                  $facture=facture::find($id)
                          ->get();

                    return response()->json($facture);

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

              public function store(Request $request){
                    try {
                        rembourssement::create([
                              'total'=> $request->input('total'),
                              'paye'=> $request->input('paye'),
                              'restant'=> $request->input('restant'),
                              'echeance'=> $request->input('echeance'),
                              'status'=> $request->input('status'),
                              'formation_id'=> $request->input('formation_id'),
                              'archiver'=> 0,
                               'supprimer'=> 0,
                              'etudiant_id'=> $request->input('etudiant_id'),
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
             * Display the specified resource.
             */
             public function show(string $id)
                     {

                        $facture = DB::table('rembourssements')
                                     ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'rembourssements.etudiant_id')
                                     ->join('formations', 'formations.id', '=', 'rembourssements.formation_id')
                                     ->select('rembourssements.id','rembourssements.total','rembourssements.formation_id','rembourssements.etudiant_id','rembourssements.paye','rembourssements.restant','rembourssements.echeance','rembourssements.status','rembourssements.supprimer','rembourssements.archiver','rembourssements.created_at','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                                     ->where('rembourssements.id',$id)
                                     ->first();

                         //$abscence=Abscence::find($id);

                     }


            /**
             * Permet de rechercher un produit dont le nom est parmi les caracteres envoyés
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
                    $rembourssements=Rembourssement::find($id);
                    $rembourssements->update([
                        'total'=> $request->input('total'),
                        'paye'=> $request->input('paye'),
                        'restant'=> $request->input('restant'),
                        'echeance'=> $request->input('echeance'),
                        'status'=> $request->input('status'),
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
                $rembourssement=Rembourssement::find($id);
                $rembourssement->delete();

                return response()->json([
                    'message'=>true
                ]);
            }

           // Marquer une absence comme supprimée
            public function supprimer($id)
            {
                $rembourssement = Rembourssement::find($id);
                if (!$rembourssement) {
                    return response()->json(['message' => 'Rembourssement non trouvée'], 404);
                }

                $rembourssement->supprimer = 1; // Marquer comme supprimée
                $rembourssement->archiver = 0; // Marquer comme supprimée
                $rembourssement->save();

                return response()->json(['message' => 'Rembourssement supprimée']);
            }

            // Archiver une absence
            public function brouillon($id)
            {
                $rembourssement = Rembourssement::find($id);
                if (!$rembourssement) {
                    return response()->json(['message' => 'Rembourssement non trouvée'], 404);
                }

                $rembourssement->archiver = 1; // Marquer comme archivée
                $rembourssement->supprimer = 0; // Marquer comme supprimée
                $rembourssement->save();

                return response()->json(['message' => 'Rembourssement en Brouillon']);
            }

             // Archiver une absence
                public function brouillonRestaurer($id)
                {
                    $rembourssement = Rembourssement::find($id);
                    if (!$rembourssement) {
                        return response()->json(['message' => 'Rembourssement non trouvée'], 404);
                    }

                    $rembourssement->archiver = 0; // Marquer comme non archivée
                    $rembourssement->supprimer = 0; // Marquer comme non supprimée
                    $rembourssement->save();

                    return response()->json(['message' => 'Rembourssement en brouillon']);
                }

            public function deleteSelected(Request $request)
                 {
                     $selectedRecords = $request->input('selectedRecords');

                     // Supprimez les éléments sélectionnés
                     Element::whereIn('id', $selectedRecords)->delete();

                     return response()->json(['message' => 'Éléments sélectionnés supprimés avec succès']);
                 }

                 public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $stage = Stage::find($id);
        if (!$stage) {
            return response()->json(['message' => 'Stage non trouvé'], 404);
        }
        $stage->archiver = 1;
        $stage->supprimer = 0;
        $stage->save();
    }
    return response()->json(['message' => 'Stages restaurés']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $stage = Stage::find($id);
        if (!$stage) {
            return response()->json(['message' => 'Stage non trouvé'], 404);
        }
        $stage->archiver = 0;
        $stage->supprimer = 0;
        $stage->save();
    }
    return response()->json(['message' => 'Stages restaurés']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $stage = Stage::find($id);
        if (!$stage) {
            return response()->json(['message' => 'Stage non trouvé'], 404);
        }
        $stage->archiver = 0;
        $stage->supprimer = 1;
        $stage->save();
    }
    return response()->json(['message' => 'Stages supprimés']);
}



}
