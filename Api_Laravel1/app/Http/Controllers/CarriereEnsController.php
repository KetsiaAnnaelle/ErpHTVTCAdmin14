<?php

namespace App\Http\Controllers;

use App\Models\CarriereEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarriereEnsController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $carrieres = DB::table('carriere_ens')
            ->join('enseignants', 'enseignants.id', '=', 'carriere_ens.enseignant_id')
            ->select('carriere_ens.enseignant_id', 'carriere_ens.id', 'carriere_ens.AncienPosteEns','carriere_ens.NouveauPosteEns',
                    'carriere_ens.NouveauSalaireEns','carriere_ens.MotifPromotionEns','enseignants.salaireEns',
                    'enseignants.nomEns','enseignants.prenomEns','carriere_ens.supprimer','carriere_ens.archiver','carriere_ens.created_at')
            ->where('carriere_ens.supprimer',0)
            ->Where('carriere_ens.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($carrieres);

    }

       /**
         * Display a listing of the resource.
         */
        public function carrArchiver()
        {

            $carrieres = DB::table('carriere_ens')
                        ->join('enseignants', 'enseignants.id', '=', 'carriere_ens.enseignant_id')
                        ->select('carriere_ens.enseignant_id', 'carriere_ens.id', 'carriere_ens.AncienPosteEns','carriere_ens.NouveauPosteEns',
                                'carriere_ens.NouveauSalaireEns','carriere_ens.MotifPromotionEns','enseignants.salaireEns',
                                'enseignants.nomEns','enseignants.prenomEns','carriere_ens.supprimer','carriere_ens.archiver','carriere_ens.created_at')
                        ->where('carriere_ens.supprimer',0)
                        ->Where('carriere_ens.archiver',1)
                        ->orderBy('id','desc')
                        ->get();

                    return response()->json($carrieres);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function carrSupprimer()
                {
                    $carrieres = DB::table('carriere_ens')
                                ->join('enseignants', 'enseignants.id', '=', 'carriere_ens.enseignant_id')
                                ->select('carriere_ens.enseignant_id', 'carriere_ens.id', 'carriere_ens.AncienPosteEns','carriere_ens.NouveauPosteEns',
                                        'carriere_ens.NouveauSalaireEns','carriere_ens.MotifPromotionEns','enseignants.salaireEns',
                                        'enseignants.nomEns','enseignants.prenomEns','carriere_ens.supprimer','carriere_ens.archiver','carriere_ens.created_at')
                                ->where('carriere_ens.supprimer',1)
                                ->Where('carriere_ens.archiver',0)
                                ->orderBy('id','desc')
                                ->get();

                            return response()->json($carrieres);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seeCarriere(string $id)
                        {

                          $carriere=CarriereEns::find($id)
                                  ->get();

                            return response()->json($carriere);

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
                CarriereEns::create([
                    'enseignant_id'=> $request->input('enseignant_id'),
                    'AncienPosteEns'=> $request->input('AncienPosteEns'),
                    'NouveauPosteEns'=> $request->input('NouveauPosteEns'),
                    'NouveauSalaireEns'=> $request->input('NouveauSalaireEns'),
                    'MotifPromotionEns'=> $request->input('MotifPromotionEns'),
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

        $carriere = DB::table('carriere_ens')
                    ->join('enseignants', 'enseignants.id', '=', 'carriere_ens.enseignant_id')
                    ->select('carriere_ens.enseignant_id', 'carriere_ens.id', 'carriere_ens.AncienPosteEns','carriere_ens.NouveauPosteEns',
                            'carriere_ens.NouveauSalaireEns','carriere_ens.MotifPromotionEns','enseignants.salaireEns',
                            'enseignants.nomEns','enseignants.prenomEns','carriere_ens.supprimer','carriere_ens.archiver','carriere_ens.created_at')
                    ->where('carriere_ens.id',$id)
                    ->first();

        return response()->json($carriere);
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
            $carriere=CarriereEns::find($id);
            if (!$carriere) {
                return response()->json(['message' => 'carriere non trouvée'], 404);
            }
            $carriere->update([
                'AncienPosteEns'=> $request->input('AncienPosteEns'),
                'NouveauPosteEns'=> $request->input('NouveauPosteEns'),
                'NouveauSalaireEns'=> $request->input('NouveauSalaireEns'),
                'MotifPromotionEns'=> $request->input('MotifPromotionEns'),
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
        $carriere=CarriereEns::find($id);
        $carriere->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer une carriere comme supprimée
    public function supprimer($id)
    {
        $carriere = CarriereEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'carriere non trouvé'], 404);
        }

        $carriere->supprimer = 1; // Marquer comme supprimée
        $carriere->archiver = 0; // Marquer comme supprimée
        $carriere->save();

        return response()->json(['message' => 'carriere supprimé']);
    }

    // Archiver un carriere
    public function archiver($id)
    {
        $carriere = CarriereEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'carriere non trouvé'], 404);
        }

        $carriere->archiver = 1; // Marquer comme archivée
        $carriere->supprimer = 0; // Marquer comme supprimée
        $carriere->save();

        return response()->json(['message' => 'carriere archivé']);
    }

     // Archiver un carriere
        public function archiverRestaurer($id)
        {
            $carriere = CarriereEns::find($id);
            if (!$carriere) {
                return response()->json(['message' => 'carriere non trouvé'], 404);
            }

            $carriere->archiver = 0; // Marquer comme non archivée
            $carriere->supprimer = 0; // Marquer comme non supprimée
            $carriere->save();

            return response()->json(['message' => 'carriere archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $carriere = CarriereEns::find($data);
                 if (!$carriere) {
                     return response()->json(['message' => 'carriere non trouvé'], 404);
                 }
                 $carriere->delete();
             }
             return response()->json(['message' => 'carriere supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $carriere = CarriereEns::find($id);
        if (!$carriere) {
            return response()->json(['message' => 'carriere non trouvé'], 404);
        }
        $carriere->archiver = 1;
        $carriere->supprimer = 0;
        $carriere->save();
    }
    return response()->json(['message' => 'carriere restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $carriere = CarriereEns::find($id);
        if (!$carriere) {
            return response()->json(['message' => 'carriere non trouvé'], 404);
        }
        $carriere->archiver = 0;
        $carriere->supprimer = 0;
        $carriere->save();
    }
    return response()->json(['message' => 'carriere restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $carriere = CarriereEns::find($id);
        if (!$carriere) {
            return response()->json(['message' => 'carriere non trouvé'], 404);
        }
        $carriere->archiver = 0;
        $carriere->supprimer = 1;
        $carriere->save();
    }
    return response()->json(['message' => 'carriere supprimé']);
}

}


