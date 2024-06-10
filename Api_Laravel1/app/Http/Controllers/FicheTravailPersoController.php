<?php

namespace App\Http\Controllers;

use App\Models\FicheTravailPerso;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FicheTravailPersoController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $fts = DB::table('fiche_travail_persos')
            ->join('personnels', 'personnels.id', '=', 'fiche_travail_persos.personnel_id')
            ->select('fiche_travail_persos.personnel_id', 'fiche_travail_persos.id', 'fiche_travail_persos.description',
                    'personnels.nomPerso','personnels.prenomPerso','fiche_travail_persos.supprimer','fiche_travail_persos.archiver','fiche_travail_persos.created_at')
            ->where('fiche_travail_persos.supprimer',0)
            ->Where('fiche_travail_persos.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($fts);

    }

       /**
         * Display a listing of the resource.
         */
        public function ftArchiver()
        {

            $fts = DB::table('fiche_travail_persos')
                ->join('personnels', 'personnels.id', '=', 'fiche_travail_persos.personnel_id')
                ->select('fiche_travail_persos.personnel_id', 'fiche_travail_persos.id', 'fiche_travail_persos.description',
                        'personnels.nomPerso','personnels.prenomPerso','fiche_travail_persos.supprimer','fiche_travail_persos.archiver','fiche_travail_persos.created_at')
                ->where('fiche_travail_persos.supprimer',0)
                ->Where('fiche_travail_persos.archiver',1)
                ->orderBy('id','desc')
                ->get();

            return response()->json($fts);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function ftSupprimer()
                {
                    $fts = DB::table('fiche_travail_persos')
                        ->join('personnels', 'personnels.id', '=', 'fiche_travail_persos.personnel_id')
                        ->select('fiche_travail_persos.personnel_id', 'fiche_travail_persos.id', 'fiche_travail_persos.description',
                                'personnels.nomPerso','personnels.prenomPerso','fiche_travail_persos.supprimer','fiche_travail_persos.archiver','fiche_travail_persos.created_at')
                        ->where('fiche_travail_persos.supprimer',1)
                        ->Where('fiche_travail_persos.archiver',0)
                        ->orderBy('id','desc')
                        ->get();

                    return response()->json($fts);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seeFT(string $id)
                        {

                          $ft=FicheTravailPerso::find($id)
                                  ->get();

                            return response()->json($ft);

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
                FicheTravailPerso::create([
                    'personnel_id'=> $request->input('personnel_id'),
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

        $ft = DB::table('fiche_travail_persos')
            ->join('personnels', 'personnels.id', '=', 'fiche_travail_persos.personnel_id')
            ->select('fiche_travail_persos.personnel_id', 'fiche_travail_persos.id', 'fiche_travail_persos.description','personnels.postePerso','personnels.adressePerso',
                    'personnels.nomPerso','personnels.prenomPerso','fiche_travail_persos.supprimer','fiche_travail_persos.archiver','fiche_travail_persos.created_at')
            ->where('fiche_travail_persos.id',$id)
            ->first();

        return response()->json($ft);
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
            $ft=FicheTravailPerso::find($id);
            if (!$ft) {
                return response()->json(['message' => 'Fiche travail non trouvée'], 404);
            }
            $ft->update([
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
        $ft=FicheTravailPerso::find($id);
        $ft->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer une Fiche travail comme supprimée
    public function supprimer($id)
    {
        $ft = FicheTravailPerso::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche travail non trouvé'], 404);
        }

        $ft->supprimer = 1; // Marquer comme supprimée
        $ft->archiver = 0; // Marquer comme supprimée
        $ft->save();

        return response()->json(['message' => 'Fiche travail supprimé']);
    }

    // Archiver un personnel
    public function archiver($id)
    {
        $ft = FicheTravailPerso::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche travail non trouvé'], 404);
        }

        $ft->archiver = 1; // Marquer comme archivée
        $ft->supprimer = 0; // Marquer comme supprimée
        $ft->save();

        return response()->json(['message' => 'Fiche travail archivé']);
    }

     // Archiver un Fiche travail
        public function archiverRestaurer($id)
        {
            $ft = FicheTravailPerso::find($id);
            if (!$ft) {
                return response()->json(['message' => 'Fiche travail non trouvé'], 404);
            }

            $ft->archiver = 0; // Marquer comme non archivée
            $ft->supprimer = 0; // Marquer comme non supprimée
            $ft->save();

            return response()->json(['message' => 'Fiche travail archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $ft = FicheTravailPerso::find($data);
                 if (!$ft) {
                     return response()->json(['message' => 'Fiche travail non trouvé'], 404);
                 }
                 $ft->delete();
             }
             return response()->json(['message' => 'Fiche travail supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheTravailPerso::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche travail non trouvé'], 404);
        }
        $ft->archiver = 1;
        $ft->supprimer = 0;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche travail restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheTravailPerso::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche travail non trouvé'], 404);
        }
        $ft->archiver = 0;
        $ft->supprimer = 0;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche travail restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $ft = FicheTravailPerso::find($id);
        if (!$ft) {
            return response()->json(['message' => 'Fiche travail non trouvé'], 404);
        }
        $ft->archiver = 0;
        $ft->supprimer = 1;
        $ft->save();
    }
    return response()->json(['message' => 'Fiche travail supprimé']);
}

}


