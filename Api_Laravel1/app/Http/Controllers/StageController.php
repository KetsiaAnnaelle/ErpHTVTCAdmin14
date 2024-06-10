<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StageController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $stages = DB::table('stages')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
            ->join('formations', 'formations.id', '=', 'stages.formation_id')
            ->select('stages.id','stages.etudiant_id','stages.formation_id','stages.nomEntrSta','stages.dateDebSta','stages.projetSta','stages.dateFinSta','stages.statutProjSta','stages.rapSta','stages.noteSta','stages.created_at','stages.supprimer','stages.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
            ->where('stages.supprimer',0)
            ->Where('stages.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($stages);

    }

       /**
         * Display a listing of the resource.
         */
        public function stageArchiver()
        {
            //$abscences=Abscence::all();

            $stages = DB::table('stages')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
            ->join('formations', 'formations.id', '=', 'stages.formation_id')
            ->select('stages.id','stages.etudiant_id','stages.formation_id','stages.nomEntrSta','stages.dateDebSta','stages.projetSta','stages.dateFinSta','stages.statutProjSta','stages.rapSta','stages.noteSta','stages.created_at','stages.supprimer','stages.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
            ->where('stages.supprimer',0)
            ->Where('stages.archiver',1)
            ->orderBy('id','desc')
            ->get();

        return response()->json($stages);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function stageSupprimer()
                {

                    $stages = DB::table('stages')
                    ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
                    ->join('formations', 'formations.id', '=', 'stages.formation_id')
                    ->select('stages.id','stages.etudiant_id','stages.formation_id','stages.nomEntrSta','stages.dateDebSta','stages.dateFinSta','stages.statutProjSta','stages.projetSta','stages.rapSta','stages.noteSta','stages.created_at','stages.supprimer','stages.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                    ->where('stages.supprimer',1)
                    ->Where('stages.archiver',0)
                    ->orderBy('id','desc')
                    ->get();

                return response()->json($stages);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seeStage(string $id)
                        {
                            //$abscences=Abscence::all();

                          $stage=Stage::find($id)
                                  ->get();

                            return response()->json($stage);

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

                Stage::create([
                    'nomEntrSta'=> $request->input('nomEntrSta'),
                    'dateDebSta'=> $request->input('dateDebSta'),
                    'dateFinSta'=> $request->input('dateFinSta'),
                    'projetSta'=> $request->input('projetSta'),
                    'statutProjSta'=> $request->input('statutProjSta'),
                    'rapSta'=> $request->input('rapSta'),
                    'noteSta'=> $request->input('noteSta'),
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

        $stage = DB::table('stages')
                    ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
                    ->join('formations', 'formations.id', '=', 'stages.formation_id')
                    ->select('stages.id','stages.etudiant_id','stages.formation_id','stages.nomEntrSta','stages.projetSta','stages.dateDebSta','stages.dateFinSta','stages.statutProjSta','stages.rapSta','stages.noteSta','stages.created_at','stages.supprimer','stages.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                    ->where('stages.etudiant_id',$id)
                    ->first();


         return response()->json($stage);
     }

     /**
     * Display the specified resource.
     */
     public function StageParFiliere()
     {

        $stage = DB::table('formations')
                    ->leftJoin('stages', function ($join) {
                        $join->on('formations.id', '=', 'stages.formation_id');
                    })
                    ->leftJoin('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
                    ->select(DB::raw('formations.id, formations.nomForm, COALESCE(COUNT(stages.id), 0) as nombre'))
                    ->groupBy('formations.id', 'formations.nomForm')
                    ->get();


         return response()->json($stage);
     }

    /**
     * Display the specified stage formations.
     */
     public function detailsStageEtud(string $nomForm)
     {
        try {
            $stage = DB::table('stages')
                ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'stages.etudiant_id')
                ->join('formations', 'formations.id', '=', 'stages.formation_id')
                ->select('stages.id','stages.etudiant_id','stages.formation_id','stages.nomEntrSta','stages.projetSta','stages.dateDebSta','stages.dateFinSta','stages.statutProjSta','stages.rapSta','stages.noteSta','stages.created_at','stages.supprimer','stages.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                ->where('formations.nomForm',$nomForm)
                ->get();
             return response()->json($stage);
        } catch (\Throwable $e) {
            return response()->json([
                'message'=>$e
            ]);
        }
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
            $stages=Stage::find($id);
            if (!$stages) {
                return response()->json(['message' => 'Stage non trouvée'], 404);
            }else{

                $stages->update([
                    'nomEntrSta'=> $request->input('nomEntrSta'),
                    'dateDebSta'=> $request->input('dateDebSta'),
                    'dateFinSta'=> $request->input('dateFinSta'),
                    'projetSta'=> $request->input('projetSta'),
                    'statutProjSta'=> $request->input('statutProjSta'),
                    'rapSta'=> $request->input('rapSta'),
                    'noteSta'=> $request->input('noteSta'),
                    'archiver'=> 0,
                    'supprimer'=> 0,
                ]);
                return response()->json(['message' => 'true']);
            }
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
        $stage=Stage::find($id);
        $stage->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer un stage comme supprimé
    public function supprimer($id)
    {
        $stage = Stage::find($id);
        if (!$stage) {
            return response()->json(['message' => 'Stage non trouvé'], 404);
        }

        $stage->supprimer = 1; // Marquer comme supprimée
        $stage->archiver = 0; // Marquer comme supprimée
        $stage->save();

        return response()->json(['message' => 'Stage supprimé']);
    }

    // Archiver un stage
    public function archiver($id)
    {
        $stage = Stage::find($id);
        if (!$stage) {
            return response()->json(['message' => 'Stage non trouvé'], 404);
        }

        $stage->supprimer = 0; // Marquer comme supprimée
        $stage->archiver = 1; // Marquer comme supprimée
        $stage->save();

        return response()->json(['message' => 'Stage archivé']);
    }

     // Archiver un stage
        public function archiverRestaurer($id)
        {
            $stage = Stage::find($id);
            if (!$stage) {
                return response()->json(['message' => 'Stage non trouvé'], 404);
            }

            $stage->archiver = 0; // Marquer comme non archivée
            $stage->supprimer = 0; // Marquer comme non supprimée
            $stage->save();

            return response()->json(['message' => 'Stage archivée']);
        }

     public function deleteSelected(Request $request)
          {

          $datas = $request->input('data');

              foreach ($datas as $data) {
                  $stage = Stage::find($data);
                  if (!$stage) {
                      return response()->json(['message' => 'Stage non trouvée'], 404);
                  }
                  $stage->delete();
              }
              return response()->json(['message' => 'Stages supprimer definitivement']);
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
        $fact = Stage::find($id);
        if (!$fact) {
            return response()->json(['message' => 'facture non trouvé'], 404);
        }
        $fact->archiver = 0;
        $fact->supprimer = 0;
        $fact->save();
    }
    return response()->json(['message' => 'factures restaurés']);
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


