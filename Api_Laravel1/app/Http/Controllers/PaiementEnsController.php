<?php

namespace App\Http\Controllers;

use App\Models\PaiementEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaiementEnsController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $paiements = DB::table('paiement_ens')
            ->join('enseignants', 'enseignants.id', '=', 'paiement_ens.enseignant_id')
            ->select('paiement_ens.enseignant_id', 'paiement_ens.id', 'paiement_ens.RefPaiementEns','paiement_ens.MoyenPaiementEns',
                    'paiement_ens.MontantPaiementEns','paiement_ens.MotifPaiementEns','paiement_ens.ProchainPaiementEns','enseignants.salaireEns',
                    'enseignants.nomEns','enseignants.prenomEns','paiement_ens.supprimer','paiement_ens.archiver','paiement_ens.created_at')
            ->where('paiement_ens.supprimer',0)
            ->Where('paiement_ens.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($paiements);

    }

       /**
         * Display a listing of the resource.
         */
        public function paieArchiver()
        {

             $paiements = DB::table('paiement_ens')
                ->join('enseignants', 'enseignants.id', '=', 'paiement_ens.enseignant_id')
                ->select('paiement_ens.enseignant_id', 'paiement_ens.id', 'paiement_ens.RefPaiementEns','paiement_ens.MoyenPaiementEns',
                        'paiement_ens.MontantPaiementEns','paiement_ens.MotifPaiementEns','paiement_ens.ProchainPaiementEns','enseignants.salaireEns',
                        'enseignants.nomEns','enseignants.prenomEns','paiement_ens.supprimer','paiement_ens.archiver','paiement_ens.created_at')
                ->where('paiement_ens.supprimer',0)
                ->Where('paiement_ens.archiver',1)
                ->orderBy('id','desc')
                ->get();

            return response()->json($paiements);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function paieSupprimer()
                {
                     $paiements = DB::table('paiement_ens')
                        ->join('enseignants', 'enseignants.id', '=', 'paiement_ens.enseignant_id')
                        ->select('paiement_ens.enseignant_id', 'paiement_ens.id', 'paiement_ens.RefPaiementEns','paiement_ens.MoyenPaiementEns',
                                'paiement_ens.MontantPaiementEns','paiement_ens.MotifPaiementEns','paiement_ens.ProchainPaiementEns','enseignants.salaireEns',
                                'enseignants.nomEns','enseignants.prenomEns','paiement_ens.supprimer','paiement_ens.archiver','paiement_ens.created_at')
                        ->where('paiement_ens.supprimer',1)
                        ->Where('paiement_ens.archiver',0)
                        ->orderBy('id','desc')
                        ->get();

                    return response()->json($paiements);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seePaiementPerso(string $id)
                        {

                          $paiement=PaiementEns::find($id)
                                  ->get();

                            return response()->json($paiement);

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
                PaiementEns::create([
                    'enseignant_id'=> $request->input('enseignant_id'),
                    'RefPaiementEns'=> $request->input('RefPaiementEns'),
                    'MontantPaiementEns'=> $request->input('MontantPaiementEns'),
                    'MoyenPaiementEns'=> $request->input('MoyenPaiementEns'),
                    'MotifPaiementEns'=> $request->input('MotifPaiementEns'),
                    'ProchainPaiementEns'=> $request->input('ProchainPaiementEns'),
                    'archiver'=> 0,
                    'supprimer'=> 0,
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

         $paiement = DB::table('paiement_ens')
            ->join('enseignants', 'enseignants.id', '=', 'paiement_ens.enseignant_id')
            ->select('paiement_ens.enseignant_id', 'paiement_ens.id', 'paiement_ens.RefPaiementEns','paiement_ens.MoyenPaiementEns',
                    'paiement_ens.MontantPaiementEns','paiement_ens.MotifPaiementEns','paiement_ens.ProchainPaiementEns','enseignants.salaireEns',
                    'enseignants.nomEns','enseignants.prenomEns','paiement_ens.supprimer','paiement_ens.archiver','paiement_ens.created_at')
            ->where('paiement_ens.id',$id)
            ->first();

        return response()->json($paiement);
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
            $paiement=PaiementEns::find($id);
            if (!$paiement) {
                return response()->json(['message' => 'paiement non trouvée'], 404);
            }
            $paiement->update([
                'RefPaiementEns'=> $request->input('RefPaiementEns'),
                'MontantPaiementEns'=> $request->input('MontantPaiementEns'),
                'MoyenPaiementEns'=> $request->input('MoyenPaiementEns'),
                'MotifPaiementEns'=> $request->input('MotifPaiementEns'),
                'ProchainPaiementEns'=> $request->input('ProchainPaiementEns'),
                'archiver'=> 0,
                'supprimer'=> 0,
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $paiement=PaiementEns::find($id);
        $paiement->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer une paiement comme supprimée
    public function supprimer($id)
    {
        $paiement = PaiementEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'paiement non trouvé'], 404);
        }

        $paiement->supprimer = 1; // Marquer comme supprimée
        $paiement->archiver = 0; // Marquer comme supprimée
        $paiement->save();

        return response()->json(['message' => 'paiement supprimé']);
    }

    // Archiver un paiement
    public function archiver($id)
    {
        $paiement = PaiementEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'paiement non trouvé'], 404);
        }

        $paiement->archiver = 1; // Marquer comme archivée
        $paiement->supprimer = 0; // Marquer comme supprimée
        $paiement->save();

        return response()->json(['message' => 'paiement archivé']);
    }

     // Archiver un paiement
        public function archiverRestaurer($id)
        {
            $paiement = PaiementEns::find($id);
            if (!$paiement) {
                return response()->json(['message' => 'paiement non trouvé'], 404);
            }

            $paiement->archiver = 0; // Marquer comme non archivée
            $paiement->supprimer = 0; // Marquer comme non supprimée
            $paiement->save();

            return response()->json(['message' => 'paiement archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $paiement = PaiementEns::find($data);
                 if (!$paiement) {
                     return response()->json(['message' => 'paiement non trouvé'], 404);
                 }
                 $paiement->delete();
             }
             return response()->json(['message' => 'paiements supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $paiement = PaiementEns::find($id);
        if (!$paiement) {
            return response()->json(['message' => 'paiement non trouvé'], 404);
        }
        $paiement->archiver = 1;
        $paiement->supprimer = 0;
        $paiement->save();
    }
    return response()->json(['message' => 'paiements restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $paiement = PaiementEns::find($id);
        if (!$paiement) {
            return response()->json(['message' => 'paiement non trouvé'], 404);
        }
        $paiement->archiver = 0;
        $paiement->supprimer = 0;
        $paiement->save();
    }
    return response()->json(['message' => 'paiements restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $paiement = PaiementEns::find($id);
        if (!$paiement) {
            return response()->json(['message' => 'paiement non trouvé'], 404);
        }
        $paiement->archiver = 0;
        $paiement->supprimer = 1;
        $paiement->save();
    }
    return response()->json(['message' => 'paiements supprimé']);
}

}


