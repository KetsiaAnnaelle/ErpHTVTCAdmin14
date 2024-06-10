<?php

namespace App\Http\Controllers;

use App\Models\CongeEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CongeEnsController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {

            $conges = DB::table('conge_ens')
                ->join('enseignants','enseignants.id', '=', 'conge_ens.enseignant_id')
                ->select('conge_ens.id','conge_ens.enseignant_id',
                'conge_ens.typeConge','conge_ens.dateDeb','conge_ens.dateFin','conge_ens.supprimer',
                'conge_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'conge_ens.created_at')
                ->where('conge_ens.supprimer',0)
                ->Where('conge_ens.archiver',0)
                ->orderBy('id','desc')
                ->get();

            return response()->json($conges);

        }

           /**
             * Display a listing of the resource.
             */
            public function congeEnsArchiver()
            {

                 $conges = DB::table('conge_ens')
                    ->join('enseignants','enseignants.id', '=', 'conge_ens.enseignant_id')
                    ->select('conge_ens.id','conge_ens.enseignant_id',
                    'conge_ens.typeConge','conge_ens.dateDeb','conge_ens.dateFin','conge_ens.supprimer',
                    'conge_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'conge_ens.created_at')
                    ->where('conge_ens.supprimer',0)
                    ->Where('conge_ens.archiver',1)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($conges);

            }

            /**
             * Display a listing of the resource.
             */
            public function congeEnsSupprimer()
            {
                 $conges = DB::table('conge_ens')
                    ->join('enseignants','enseignants.id', '=', 'conge_ens.enseignant_id')
                    ->select('conge_ens.id','conge_ens.enseignant_id',
                    'conge_ens.typeConge','conge_ens.dateDeb','conge_ens.dateFin','conge_ens.supprimer',
                    'conge_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'conge_ens.created_at')
                    ->where('conge_ens.supprimer',1)
                    ->Where('conge_ens.archiver',0)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($conges);

            }

             /**
             * Display a listing of the resource.
             */
            public function seeConge(string $id)
            {

              $conge=CongeEns::find($id)
                      ->get();

//                                   return response()->json([
//                                       'message'=>true
//                                   ]);

                return response()->json($conge);

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
                    CongeEns::create([
                        'enseignant_id'=> $request->input('enseignant_id'),
                        'typeConge'=> $request->input('typeConge'),
                        'dateDeb'=> $request->input('dateDeb'),
                        'dateFin'=> $request->input('dateFin'),
                        'note'=> $request->input('note'),
                        'archiver'=>0,
                        'supprimer'=>0,
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

               $conge = DB::table('conge_ens')
                  ->join('enseignants','enseignants.id', '=', 'conge_ens.enseignant_id')
                  ->select('conge_ens.id','conge_ens.enseignant_id',
                  'conge_ens.typeConge','conge_ens.dateDeb','conge_ens.dateFin','conge_ens.supprimer',
                  'conge_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'conge_ens.created_at')
                  ->where('conge_ens.id',$id)
                  ->first();

              return response()->json($conge);
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
                $conge=CongeEns::find($id);
                if (!$conge) {
                    return response()->json(['message' => 'Conge non trouvée'], 404);
                }
                $conge->update([
                    'typeConge'=> $request->input('typeConge'),
                    'dateDeb'=> $request->input('dateDeb'),
                    'dateFin'=> $request->input('dateFin'),
                    'archiver'=>0,
                    'supprimer'=>0,
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
            $conge=CongeEns::find($id);
            $conge->delete();

            return response()->json([
                'message'=>true
            ]);
        }

       // Marquer une conge comme supprimé
        public function supprimer($id)
        {
            $conge = CongeEns::find($id);
            if (!$conge) {
                return response()->json(['message' => 'Conge non trouvé'], 404);
            }

            $conge->supprimer = 1; // Marquer comme supprimée
            $conge->archiver = 0; // Marquer comme supprimée
            $conge->save();

            return response()->json(['message' => 'Conge supprimé']);
        }

        // Archiver un conge
        public function archiver($id)
        {
            $conge = CongeEns::find($id);
            if (!$conge) {
                return response()->json(['message' => 'Conge non trouvé'], 404);
            }

            $conge->archiver = 1; // Marquer comme archivée
            $conge->supprimer = 0; // Marquer comme supprimée
            $conge->save();

            return response()->json(['message' => 'Conge archivé']);
        }

         // Archiver un conge
            public function archiverRestaurer($id)
            {
                $conge = CongeEns::find($id);
                if (!$conge) {
                    return response()->json(['message' => 'Conge non trouvé'], 404);
                }

                $conge->archiver = 0; // Marquer comme non archivée
                $conge->supprimer = 0; // Marquer comme non supprimée
                $conge->save();

                return response()->json(['message' => 'Conge archivé']);
            }

        public function deleteSelected(Request $request)
             {

             $datas = $request->input('data');

                 foreach ($datas as $data) {
                     $conge = CongeEns::find($data);
                     if (!$conge) {
                         return response()->json(['message' => 'Conge non trouvé'], 404);
                     }
                     $conge->delete();
                 }
                 return response()->json(['message' => 'Conges supprimer definitivement']);
             }

    public function restauresSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conge = CongeEns::find($id);
            if (!$conge) {
                return response()->json(['message' => 'Conge non trouvé'], 404);
            }
            $conge->archiver = 1;
            $conge->supprimer = 0;
            $conge->save();
        }
        return response()->json(['message' => 'Conges restauré']);
    }

    public function restaureSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conge = CongeEns::find($id);
            if (!$conge) {
                return response()->json(['message' => 'conge non trouvé'], 404);
            }
            $conge->archiver = 0;
            $conge->supprimer = 0;
            $conge->save();
        }
        return response()->json(['message' => 'conges restauré']);
    }

    public function supprimeSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conge = CongeEns::find($id);
            if (!$conge) {
                return response()->json(['message' => 'conge non trouvé'], 404);
            }
            $conge->archiver = 0;
            $conge->supprimer = 1;
            $conge->save();
        }
        return response()->json(['message' => 'conges supprimé']);
    }
}
