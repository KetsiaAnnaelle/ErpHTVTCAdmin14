<?php

namespace App\Http\Controllers;

use App\Models\PerformanceEns;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerformanceEnsController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {

            $performances = DB::table('performance_ens')
                ->join('enseignants', 'enseignants.id', '=', 'performance_ens.enseignant_id')
                ->select('performance_ens.id','performance_ens.enseignant_id',
                'performance_ens.assuidEns','performance_ens.respDelaiEns','performance_ens.travailEns',
                'performance_ens.savoirVivrEns','performance_ens.note','performance_ens.supprimer',
                'performance_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'performance_ens.created_at')
                ->where('performance_ens.supprimer',0)
                ->Where('performance_ens.archiver',0)
                ->orderBy('id','desc')
                ->get();

            return response()->json($performances);

        }

           /**
             * Display a listing of the resource.
             */
            public function perfEnsArchiver()
            {

                $performances = DB::table('performance_ens')
                    ->join('enseignants', 'enseignants.id', '=', 'performance_ens.enseignant_id')
                    ->select('performance_ens.id','performance_ens.enseignant_id',
                    'performance_ens.assuidEns','performance_ens.respDelaiEns','performance_ens.travailEns',
                    'performance_ens.savoirVivrEns','performance_ens.note','performance_ens.supprimer',
                    'performance_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'performance_ens.created_at')
                    ->where('performance_ens.supprimer',0)
                    ->Where('performance_ens.archiver',1)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($performances);

            }

            /**
             * Display a listing of the resource.
             */
            public function perfEnsSupprimer()
            {
               $performances = DB::table('performance_ens')
                   ->join('enseignants', 'enseignants.id', '=', 'performance_ens.enseignant_id')
                   ->select('performance_ens.id','performance_ens.enseignant_id',
                   'performance_ens.assuidEns','performance_ens.respDelaiEns','performance_ens.travailEns',
                   'performance_ens.savoirVivrEns','performance_ens.note','performance_ens.supprimer',
                   'performance_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'performance_ens.created_at')
                   ->where('performance_ens.supprimer',1)
                   ->Where('performance_ens.archiver',0)
                   ->orderBy('id','desc')
                   ->get();

               return response()->json($performances);

            }

             /**
             * Display a listing of the resource.
             */
            public function seePerformanceEns(string $id)
            {

              $performance=PerformanceEns::find($id)
                      ->get();

                return response()->json($performance);

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
                    PerformanceEns::create([
                        'assuidEns'=> $request->input('assuidEns'),
                        'respDelaiEns'=> $request->input('respDelaiEns'),
                        'travailEns'=> $request->input('travailEns'),
                        'savoirVivrEns'=> $request->input('savoirVivrEns'),
                        'note'=> $request->input('note'),
                        'enseignant_id'=> $request->input('enseignant_id'),
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

              $performance = DB::table('performance_ens')
                    ->join('enseignants', 'enseignants.id', '=', 'performance_ens.enseignant_id')
                    ->select('performance_ens.id','performance_ens.enseignant_id',
                    'performance_ens.assuidEns','performance_ens.respDelaiEns','performance_ens.travailEns',
                    'performance_ens.savoirVivrEns','performance_ens.note','performance_ens.supprimer',
                    'performance_ens.archiver','enseignants.nomEns','enseignants.prenomEns', 'performance_ens.created_at')
                    ->where('performance_ens.id',$id)
                    ->first();

                return response()->json($performance);
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
                $performance=PerformanceEns::find($id);
                if (!$performance) {
                    return response()->json(['message' => 'Performance non trouvée'], 404);
                }
                $performance->update([
                    'assuidEns'=> $request->input('assuidEns'),
                     'respDelaiEns'=> $request->input('respDelaiEns'),
                     'travailEns'=> $request->input('travailEns'),
                     'savoirVivrEns'=> $request->input('savoirVivrEns'),
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
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            $performance=PerformanceEns::find($id);
            $performance->delete();

            return response()->json([
                'message'=>true
            ]);
        }

       // Marquer une conduite comme supprimée
        public function supprimer($id)
        {
            $performance = PerformanceEns::find($id);
            if (!$performance) {
                return response()->json(['message' => 'Performance non trouvée'], 404);
            }

            $performance->supprimer = 1; // Marquer comme supprimée
            $performance->archiver = 0; // Marquer comme supprimée
            $performance->save();

            return response()->json(['message' => 'Performance supprimée']);
        }

        // Archiver une conduite
        public function archiver($id)
        {
            $performance = PerformanceEns::find($id);
            if (!$performance) {
                return response()->json(['message' => 'Performance non trouvée'], 404);
            }

            $performance->archiver = 1; // Marquer comme archivée
            $performance->supprimer = 0; // Marquer comme supprimée
            $performance->save();

            return response()->json(['message' => 'performance archivée']);
        }

         // Archiver une conduite
            public function archiverRestaurer($id)
            {
                $performance = PerformanceEns::find($id);
                if (!$performance) {
                    return response()->json(['message' => 'performance non trouvée'], 404);
                }

                $performance->archiver = 0; // Marquer comme non archivée
                $performance->supprimer = 0; // Marquer comme non supprimée
                $performance->save();

                return response()->json(['message' => 'performance archivée']);
            }

        public function deleteSelected(Request $request)
             {

             $datas = $request->input('data');

                 foreach ($datas as $data) {
                     $performance = PerformanceEns::find($data);
                     if (!$performance) {
                         return response()->json(['message' => 'performance non trouvée'], 404);
                     }
                     $performance->delete();
                 }
                 return response()->json(['message' => 'performances supprimer definitivement']);
             }

    public function restauresSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $performance = PerformanceEns::find($id);
            if (!$performance) {
                return response()->json(['message' => 'performance non trouvée'], 404);
            }
            $performance->archiver = 1;
            $performance->supprimer = 0;
            $performance->save();
        }
        return response()->json(['message' => 'performances restaurées']);
    }

    public function restaureSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $performance = PerformanceEns::find($id);
            if (!$performance) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $performance->archiver = 0;
            $performance->supprimer = 0;
            $performance->save();
        }
        return response()->json(['message' => 'performances restaurées']);
    }

    public function supprimeSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $performance = PerformanceEns::find($id);
            if (!$performance) {
                return response()->json(['message' => 'performance non trouvée'], 404);
            }
            $performance->archiver = 0;
            $performance->supprimer = 1;
            $performance->save();
        }
        return response()->json(['message' => 'performances supprimées']);
    }
}
