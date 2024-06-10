<?php

namespace App\Http\Controllers;

use App\Models\FicheCoursEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FicheCoursEnsController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $fcs = DB::table('fiche_cours_ens')
            ->join('enseignants', 'enseignants.id', '=', 'fiche_cours_ens.enseignant_id')
            ->select('fiche_cours_ens.enseignant_id', 'fiche_cours_ens.id', 'fiche_cours_ens.description',
                    'enseignants.nomEns','enseignants.prenomEns','fiche_cours_ens.supprimer','fiche_cours_ens.archiver','fiche_cours_ens.created_at')
            ->where('fiche_cours_ens.supprimer',0)
            ->Where('fiche_cours_ens.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($fcs);

    }

       /**
         * Display a listing of the resource.
         */
        public function fcArchiver()
        {

            $fcs = DB::table('fiche_cours_ens')
                ->join('enseignants', 'enseignants.id', '=', 'fiche_cours_ens.enseignant_id')
                ->select('fiche_cours_ens.enseignant_id', 'fiche_cours_ens.id', 'fiche_cours_ens.description',
                        'enseignants.nomEns','enseignants.prenomEns','fiche_cours_ens.supprimer','fiche_cours_ens.archiver','fiche_cours_ens.created_at')
                ->where('fiche_cours_ens.supprimer',0)
                ->Where('fiche_cours_ens.archiver',1)
                ->orderBy('id','desc')
                ->get();

            return response()->json($fcs);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function fcSupprimer()
                {
                    $fcs = DB::table('fiche_cours_ens')
                        ->join('enseignants', 'enseignants.id', '=', 'fiche_cours_ens.enseignant_id')
                        ->select('fiche_cours_ens.enseignant_id', 'fiche_cours_ens.id', 'fiche_cours_ens.description',
                                'enseignants.nomEns','enseignants.prenomEns','fiche_cours_ens.supprimer','fiche_cours_ens.archiver','fiche_cours_ens.created_at')
                        ->where('fiche_cours_ens.supprimer',1)
                        ->Where('fiche_cours_ens.archiver',0)
                        ->orderBy('id','desc')
                        ->get();

                    return response()->json($fcs);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seeFC(string $id)
                        {

                          $fc=FicheCoursEns::find($id)
                                  ->get();

                            return response()->json($fc);

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
                FicheCoursEns::create([
                    'enseignant_id'=> $request->input('enseignant_id'),
                    'description'=> $request->input('description'),
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

        $fc = DB::table('fiche_cours_ens')
            ->join('enseignants', 'enseignants.id', '=', 'fiche_cours_ens.enseignant_id')
            ->select('fiche_cours_ens.enseignant_id', 'fiche_cours_ens.id', 'fiche_cours_ens.description',
                    'enseignants.nomEns','enseignants.prenomEns','enseignants.nomForm', 'enseignants.nomCours','fiche_cours_ens.supprimer','fiche_cours_ens.archiver','fiche_cours_ens.created_at')
            ->where('fiche_cours_ens.id',$id)
            ->first();

        return response()->json($fc);
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
            $fc=FicheCoursEns::find($id);
            if (!$fc) {
                return response()->json(['message' => 'Fiche cours non trouvée'], 404);
            }
            $fc->update([
                'description'=> $request->input('description'),
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
        $ft=FicheCoursEns::find($id);
        $ft->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer une Fiche travail comme supprimée
    public function supprimer($id)
    {
        $ft = FicheCoursEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche cours non trouvé'], 404);
        }

        $ft->supprimer = 1; // Marquer comme supprimée
        $ft->archiver = 0; // Marquer comme supprimée
        $ft->save();

        return response()->json(['message' => 'Fiche cours supprimé']);
    }

    // Archiver un personnel
    public function archiver($id)
    {
        $ft = FicheCoursEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche cours non trouvé'], 404);
        }

        $ft->archiver = 1; // Marquer comme archivée
        $ft->supprimer = 0; // Marquer comme supprimée
        $ft->save();

        return response()->json(['message' => 'Fiche cours archivé']);
    }

     // Archiver un Fiche travail
        public function archiverRestaurer($id)
        {
            $ft = FicheCoursEns::find($id);
            if (!$ft) {
                return response()->json(['message' => 'Fiche cours non trouvé'], 404);
            }

            $ft->archiver = 0; // Marquer comme non archivée
            $ft->supprimer = 0; // Marquer comme non supprimée
            $ft->save();

            return response()->json(['message' => 'Fiche cours archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $ft = FicheCoursEns::find($data);
                 if (!$ft) {
                     return response()->json(['message' => 'Fiche cours non trouvé'], 404);
                 }
                 $ft->delete();
             }
             return response()->json(['message' => 'Fiche cours supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheCoursEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche cours non trouvé'], 404);
        }
        $ft->archiver = 1;
        $ft->supprimer = 0;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche cours restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheCoursEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche cours non trouvé'], 404);
        }
        $ft->archiver = 0;
        $ft->supprimer = 0;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche cours restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheCoursEns::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche cours non trouvé'], 404);
        }
        $ft->archiver = 0;
        $ft->supprimer = 1;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche cours supprimé']);
}

}


