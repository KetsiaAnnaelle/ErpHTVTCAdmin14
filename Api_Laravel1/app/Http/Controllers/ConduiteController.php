<?php

namespace App\Http\Controllers;

use App\Models\Conduite;
use App\Models\InscriptionEtudiant;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConduiteController extends Controller
{
    /**
         * Display a listing of the resource.
         */
    public function index()
    {

        $conduites = DB::table('conduites')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
            ->join('formations', 'formations.id', '=', 'conduites.formation_id')
            ->select('conduites.id','conduites.etudiant_id','conduites.formation_id','conduites.dateCond','conduites.assuidCond','conduites.comprCond','conduites.travailPersoCond','conduites.savoirVivrCond','conduites.avisFormcond','conduites.notecond','conduites.supprimer','conduites.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
            ->where('conduites.supprimer',0)
            ->Where('conduites.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($conduites);

    }

           /**
             * Display a listing of the resource.
             */
    public function condArchiver()
    {

            $conduites = DB::table('conduites')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
            ->join('formations', 'formations.id', '=', 'conduites.formation_id')
            ->select('conduites.id','conduites.etudiant_id','conduites.formation_id','conduites.dateCond','conduites.assuidCond','conduites.comprCond','conduites.travailPersoCond','conduites.savoirVivrCond','conduites.avisFormcond','conduites.notecond','conduites.supprimer','conduites.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
            ->Where('conduites.archiver',1)
            ->where('conduites.supprimer',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($conduites);

    }

            /**
     * Display a listing of the resource.
     */
    public function condSupprimer()
    {
        //$abscences=Abscence::all();

            $conduites = DB::table('conduites')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
            ->join('formations', 'formations.id', '=', 'conduites.formation_id')
            ->select('conduites.id','conduites.etudiant_id','conduites.formation_id','conduites.dateCond','conduites.assuidCond','conduites.comprCond','conduites.travailPersoCond','conduites.savoirVivrCond','conduites.avisFormcond','conduites.notecond','conduites.supprimer','conduites.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
            ->Where('conduites.supprimer',1)
            ->Where('conduites.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($conduites);

    }

             /**
     * Display a listing of the resource.
     */
    public function seeConduite(string $id)
    {
        //$abscences=Abscence::all();

        $conduite=Conduite::find($id)
                ->get();

    // return response()->json([
    //     'message'=>true
    // ]);

        return response()->json($conduite);

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
            Conduite::create([
                'dateCond'=> $request->input('dateCond'),
                'comprCond'=> $request->input('comprCond'),
                'assuidCond'=> $request->input('assuidCond'),
                'travailPersoCond'=> $request->input('travailPersoCond'),
                'savoirVivrCond'=> $request->input('savoirVivrCond'),
                'avisFormcond'=> $request->input('avisFormcond'),
                'notecond'=> $request->input('notecond'),
                'etudiant_id'=> $request->input('etudiant_id'),
                'formation_id'=> $request->input('formation_id'),
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

        $conduite = DB::table('conduites')
                ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
                ->join('formations', 'formations.id', '=', 'conduites.formation_id')
                ->select('conduites.id','conduites.etudiant_id','conduites.formation_id','conduites.dateCond','conduites.assuidCond','conduites.comprCond','conduites.travailPersoCond','conduites.savoirVivrCond','conduites.avisFormcond','conduites.notecond','conduites.supprimer','conduites.archiver','inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','formations.nomForm')
                ->where('conduites.id',$id)
                ->first();


        return response()->json($conduite);
    }

    /**
     * Permet de rechercher un produit dont le nom est parmi les caracteres envoyés
     */
    // public function TopEtudiants()
    // {

    //     $meilleursEtudiants = DB::table('inscription_etudiants')
    //         ->join('conduites', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
    //         ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
    //         ->select(DB::raw('conduites.notecond,formations.nomForm'),'inscription_etudiants.nomEtud')
    //         ->groupBy('formations.nomForm')
    //         ->orderBy('conduites.notecond', 'desc')
    //         // ->take(5)
    //         ->get();

    //     $faiblesStudents = DB::table('inscription_etudiants')
    //         ->join('conduites', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
    //         ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
    //         ->select(DB::raw('conduites.notecond,formations.nomForm'),'inscription_etudiants.nomEtud')
    //         ->groupBy('formations.nomForm')
    //         ->orderBy('conduites.notecond', 'asc')
    //         // ->take(5)
    //         ->get();

    //     return response()->json([
    //         'meilleurs_etudiants' => $meilleursEtudiants,
    //         'faibles_etudiants'   => $faiblesStudents,
    //     ]);


    // }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, string $id)
    {
        try {
            $conduites=Conduite::find($id);
            if (!$conduites) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $conduites->update([
                'dateCond'=> $request->input('dateCond'),
                'comprCond'=> $request->input('comprCond'),
                'assuidCond'=> $request->input('assuidCond'),
                'travailPersoCond'=> $request->input('travailPersoCond'),
                'savoirVivrCond'=> $request->input('savoirVivrCond'),
                'avisFormcond'=> $request->input('avisFormcond'),
                'notecond'=> $request->input('notecond'),
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
        $conduite=Conduite::find($id);
        $conduite->delete();

        return response()->json([
            'message'=>true
        ]);
    }

    // Marquer une conduite comme supprimée
    public function supprimer($id)
    {
        $conduite = Conduite::find($id);
        if (!$conduite) {
            return response()->json(['message' => 'Conduite non trouvée'], 404);
        }

        $conduite->supprimer = 1; // Marquer comme supprimée
        $conduite->archiver = 0; // Marquer comme supprimée
        $conduite->save();

        return response()->json(['message' => 'Conduite supprimée']);
    }

    // Archiver une conduite
    public function archiver($id)
    {
        $conduite = Conduite::find($id);
        if (!$conduite) {
            return response()->json(['message' => 'Conduite non trouvée'], 404);
        }

        $conduite->archiver = 1; // Marquer comme archivée
        $conduite->supprimer = 0; // Marquer comme supprimée
        $conduite->save();

        return response()->json(['message' => 'Conduite archivée']);
    }

    // Archiver une conduite
    public function archiverRestaurer($id)
    {
        $conduite = Conduite::find($id);
        if (!$conduite) {
            return response()->json(['message' => 'Conduite non trouvée'], 404);
        }

        $conduite->archiver = 0; // Marquer comme non archivée
        $conduite->supprimer = 0; // Marquer comme non supprimée
        $conduite->save();

        return response()->json(['message' => 'Conduite archivée']);
    }

    public function deleteSelected(Request $request)
    {

    $datas = $request->input('data');

        foreach ($datas as $data) {
            $conduite = Conduite::find($data);
            if (!$conduite) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $conduite->delete();
        }
        return response()->json(['message' => 'Conduites supprimer definitivement']);
    }

    public function restauresSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conduite = Conduite::find($id);
            if (!$conduite) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $conduite->archiver = 1;
            $conduite->supprimer = 0;
            $conduite->save();
        }
        return response()->json(['message' => 'Conduites restaurées']);
    }

    public function restaureSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conduite = Conduite::find($id);
            if (!$conduite) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $conduite->archiver = 0;
            $conduite->supprimer = 0;
            $conduite->save();
        }
        return response()->json(['message' => 'Conduites restaurées']);
    }

    public function supprimeSelected(Request $request)
    {
        $ids = $request->input('ids');

        foreach ($ids as $id) {
            $conduite = Conduite::find($id);
            if (!$conduite) {
                return response()->json(['message' => 'Conduite non trouvée'], 404);
            }
            $conduite->archiver = 0;
            $conduite->supprimer = 1;
            $conduite->save();
        }
        return response()->json(['message' => 'Conduites supprimées']);
    }

    public function TopEtudiants()
    {

        $meilleursEtudiants = DB::table('inscription_etudiants')
            ->join('conduites', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
            ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
            ->select(DB::raw('conduites.notecond,formations.nomForm'),'inscription_etudiants.nomEtud')
            ->groupBy('formations.nomForm')
            ->orderBy('conduites.notecond', 'desc')
            ->take(5)
            ->get();

        $faiblesStudents = DB::table('inscription_etudiants')
            ->join('conduites', 'inscription_etudiants.id', '=', 'conduites.etudiant_id')
            ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
            ->select(DB::raw('conduites.notecond,formations.nomForm'),'inscription_etudiants.nomEtud')
            ->groupBy('formations.nomForm')
            ->orderBy('conduites.notecond', 'asc')
            ->take(5)
            ->get();

        return response()->json([
            'meilleurs_etudiants' => $meilleursEtudiants,
            'faibles_etudiants'   => $faiblesStudents,
        ]);


    }
}
