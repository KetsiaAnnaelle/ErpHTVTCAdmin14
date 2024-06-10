<?php

namespace App\Http\Controllers;

use App\Models\PerformancePerso;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerformancePersoController extends Controller
{
    /**
         * Display a listing of the resource.
         */
        public function index()
        {

            $performances = DB::table('performance_persos')
                ->join('personnels', 'personnels.id', '=', 'performance_persos.personnel_id')
                ->select('performance_persos.id','performance_persos.personnel_id',
                'performance_persos.assuidPerso','performance_persos.respDelaiPerso','performance_persos.travailPerso',
                'performance_persos.savoirVivrPerso','performance_persos.note','performance_persos.supprimer',
                'performance_persos.archiver','personnels.nomPerso','personnels.prenomPerso',
                'personnels.postePerso','personnels.adressePerso', 'performance_persos.created_at')
                ->where('performance_persos.supprimer',0)
                ->Where('performance_persos.archiver',0)
                ->orderBy('id','desc')
                ->get();

            return response()->json($performances);

        }

           /**
             * Display a listing of the resource.
             */
            public function perfArchiver()
            {

                 $performances = DB::table('performance_persos')
                     ->join('personnels', 'personnels.id', '=', 'performance_persos.personnel_id')
                     ->select('performance_persos.id','performance_persos.personnel_id',
                     'performance_persos.assuidPerso','performance_persos.respDelaiPerso','performance_persos.travailPerso',
                     'performance_persos.savoirVivrPerso','performance_persos.note','performance_persos.supprimer',
                     'performance_persos.archiver','personnels.nomPerso','personnels.prenomPerso',
                     'personnels.postePerso','personnels.adressePerso', 'performance_persos.created_at')
                     ->where('performance_persos.supprimer',0)
                     ->Where('performance_persos.archiver',1)
                     ->orderBy('id','desc')
                     ->get();

                 return response()->json($performances);

            }

            /**
             * Display a listing of the resource.
             */
            public function perfSupprimer()
            {
                $performances = DB::table('performance_persos')
                    ->join('personnels', 'personnels.id', '=', 'performance_persos.personnel_id')
                    ->select('performance_persos.id','performance_persos.personnel_id',
                    'performance_persos.assuidPerso','performance_persos.respDelaiPerso','performance_persos.travailPerso',
                    'performance_persos.savoirVivrPerso','performance_persos.note','performance_persos.supprimer',
                    'performance_persos.archiver','personnels.nomPerso','personnels.prenomPerso',
                    'personnels.postePerso','personnels.adressePerso', 'performance_persos.created_at')
                    ->where('performance_persos.supprimer',1)
                    ->Where('performance_persos.archiver',0)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($performances);

            }

             /**
             * Display a listing of the resource.
             */
            public function seePerformance(string $id)
            {

              $performance=PerformancePerso::find($id)
                      ->get();

//                                   return response()->json([
//                                       'message'=>true
//                                   ]);

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
                    PerformancePerso::create([
                        'assuidPerso'=> $request->input('assuidPerso'),
                        'respDelaiPerso'=> $request->input('respDelaiPerso'),
                        'travailPerso'=> $request->input('travailPerso'),
                        'savoirVivrPerso'=> $request->input('savoirVivrPerso'),
                        'note'=> $request->input('note'),
                        'personnel_id'=> $request->input('personnel_id'),
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

             $performance = DB::table('performance_persos')
                 ->join('personnels', 'personnels.id', '=', 'performance_persos.personnel_id')
                 ->select('performance_persos.id','performance_persos.personnel_id',
                 'performance_persos.assuidPerso','performance_persos.respDelaiPerso','performance_persos.travailPerso',
                 'performance_persos.savoirVivrPerso','performance_persos.note','performance_persos.supprimer',
                 'performance_persos.archiver','personnels.nomPerso','personnels.prenomPerso',
                 'personnels.postePerso','personnels.adressePerso', 'performance_persos.created_at')
                 ->where('performance_persos.id',$id)
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
                $performance=PerformancePerso::find($id);
                if (!$performance) {
                    return response()->json(['message' => 'Performance non trouvée'], 404);
                }
                $performance->update([
                    'assuidPerso'=> $request->input('assuidPerso'),
                    'respDelaiPerso'=> $request->input('respDelaiPerso'),
                    'travailPerso'=> $request->input('travailPerso'),
                    'savoirVivrPerso'=> $request->input('savoirVivrPerso'),
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
            $performance=PerformancePerso::find($id);
            $performance->delete();

            return response()->json([
                'message'=>true
            ]);
        }

       // Marquer une conduite comme supprimée
        public function supprimer($id)
        {
            $performance = PerformancePerso::find($id);
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
            $performance = PerformancePerso::find($id);
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
                $performance = PerformancePerso::find($id);
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
                     $performance = PerformancePerso::find($data);
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
            $performance = PerformancePerso::find($id);
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
            $performance = PerformancePerso::find($id);
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
            $performance = PerformancePerso::find($id);
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
