<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FiliereEtudController extends Controller
{
    public function index(){

        $formations = DB::table('formations')
                    ->where('formations.archiver',0)
                    ->where('formations.supprimer',0)
                    ->orderBy('id','desc')
                    ->get();
        return response()->json($formations);
    }

    public function formSupprimer(){

        $formations = DB::table('formations')
                    ->where('formations.archiver',0)
                    ->where('formations.supprimer',1)
                    ->orderBy('id','desc')
                    ->get();
        return response()->json($formations);
    }

    public function formArchiver(){

        $formations = DB::table('formations')
                    ->where('formations.archiver',1)
                    ->where('formations.supprimer',0)
                    ->orderBy('id','desc')
                    ->get();
        return response()->json($formations);
    }

    public function FilièreEtud(Request $request){

        Formation::create([
            'nomForm'=> $request->input('nomForm'),
            'scolariteForm'=> $request->input('scolariteForm'),
             'archiver'=> 0,
             'supprimer'=> 0,
        ]);

        return response()->json([
            'message'=>true,
        ]);
    }

    /**
             * Display the specified resource.
             */
             public function show(string $nomForm)
             {
                  $formation = DB::table('formations')
                           ->where('formations.nomForm',$nomForm)
                           ->first();
                  return response()->json($formation);
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
                    $formations=Formation::find($id);
                    if (!$formations) {
                        return response()->json(['message' => 'Formation non trouvée'], 404);
                    }
                    $formations->update([
                        'nomForm'=> $request->input('nomForm'),
                        'scolariteForm'=> $request->input('scolariteForm'),
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
                $formation=Formation::find($id);
                $formation->delete();

                return response()->json([
                    'message'=>true
                ]);
            }

           // Marquer une formation comme supprimée
            public function supprimer($id)
            {
                $formation = Formation::find($id);
                if (!$formation) {
                    return response()->json(['message' => 'Formation non trouvée'], 404);
                }

                $formation->supprimer = 1; // Marquer comme supprimée
                $formation->archiver = 0; // Marquer comme supprimée
                $formation->save();

                return response()->json(['message' => 'Formation supprimée']);
            }

            // Archiver une formation
            public function archiver($id)
            {
                $formation = Formation::find($id);
                if (!$formation) {
                    return response()->json(['message' => 'Formation non trouvée'], 404);
                }

                $formation->archiver = 1; // Marquer comme archivée
                $formation->supprimer = 0; // Marquer comme supprimée
                $formation->save();

                return response()->json(['message' => 'Formation archivée']);
            }

             // Archiver une formation
                public function archiverRestaurer($id)
                {
                    $formation = Formation::find($id);
                    if (!$formation) {
                        return response()->json(['message' => 'Formation non trouvée'], 404);
                    }

                    $formation->archiver = 0; // Marquer comme non archivée
                    $formation->supprimer = 0; // Marquer comme non supprimée
                    $formation->save();

                    return response()->json(['message' => 'Formation archivée']);
                }

            public function deleteSelected(Request $request)
                 {

                 $datas = $request->input('data');

                     foreach ($datas as $data) {
                         $formation = Formation::find($data);
                         if (!$formation) {
                             return response()->json(['message' => 'Formation non trouvée'], 404);
                         }
                         $formation->delete();
                     }
                     return response()->json(['message' => 'Formations supprimer definitivement']);
                 }

        public function restauresSelected(Request $request)
        {
            $ids = $request->input('ids');

            foreach ($ids as $id) {
                $formation = Formation::find($id);
                if (!$formation) {
                    return response()->json(['message' => 'Formation non trouvée'], 404);
                }
                $formation->archiver = 1;
                $formation->supprimer = 0;
                $formation->save();
            }
            return response()->json(['message' => 'Formation restaurées']);
        }

        public function restaureSelected(Request $request)
        {
            $ids = $request->input('ids');

            foreach ($ids as $id) {
                $formation = Formation::find($id);
                if (!$formation) {
                    return response()->json(['message' => 'Formation non trouvée'], 404);
                }
                $formation->archiver = 0;
                $formation->supprimer = 0;
                $formation->save();
            }
            return response()->json(['message' => 'Formations restaurées']);
        }

        public function supprimeSelected(Request $request)
        {
            $ids = $request->input('ids');

            foreach ($ids as $id) {
                $formation = Formation::find($id);
                if (!$formation) {
                    return response()->json(['message' => 'Formation non trouvée'], 404);
                }
                $formation->archiver = 0;
                $formation->supprimer = 1;
                $formation->save();
            }
            return response()->json(['message' => 'Formations supprimées']);
        }

}
