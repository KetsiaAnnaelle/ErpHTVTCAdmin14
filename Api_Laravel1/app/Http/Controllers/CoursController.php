<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\InscriptionEtudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CoursController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $cours=Cours::all();
        // return response()->json($cours);

        $cours = DB::table('cours')
        ->join('formations', 'formations.id', '=', 'cours.formation_id')
        ->select('cours.id',
            'cours.nomCours',
            'cours.heureDeb',
            'cours.heureFin',
            'cours.description',
            'cours.formation_id',
            'formations.id',
            'formations.nomForm',
            'cours.created_at',

        )
        ->where('cours.archived_at',null)
        ->where('cours.deleted_at',null)
        ->orderBy('cours.created_at','desc')
        ->get();
        // ->paginate(10);

        return response()->json($cours);

    }

    public function selectedCours(string $selectedCoursId)
    {
        $cours = Cours::find($selectedCoursId);

        if ($cours) {
            $etudiants = Cours::whereHas('formation', function ($query) use ($selectedCoursId) {
                $query->where('cours_id','=', $selectedCoursId);
            })->get();
            return response()->json($etudiants);
        } else {
            return response()->json([
                'message'=>'le cours est introuvable'
            ]);
        }
    }

    // public function cour(){
    //     return AbscenceResource::collection(Abscence::all());
    // }

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
    public function store(Request $request)
    {

        try {
            Cours::create([

                'nomCours'=>$request->input('nomCours'),
                'heureDeb'=>$request->input('heureDeb'),
                'heureFin'=>$request->input('heureFin'),
                'description'=>$request->input('description'),
                'formation_id'=>$request->input('formation_id'),

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
        $cours=Cours::find($id);

        return response()->json($cours);
    }

    public function selectedFiliere(string $selectedFiliereId)
        {

            $cours = DB::table('cours')
            ->join('formations', 'formations.id', '=', 'cours.formation_id')
            ->select('cours.id',
                'cours.nomCours',
                'formations.nomForm',

            )
            ->where('cours.formation_id',$selectedFiliereId)
            ->orderBy('cours.nomCours','asc')
            ->get();

            return response()->json($cours);

        }

    /**
     * Permet de rechercher un produit dont le nom est parmi les caracteres envoyés
     */
    public function edit(string $id)
    {

        //
    }

    public function archive(string $id)
    {

        $cours = Cours::find($id);
        $cours ->update([
            'archived_at'=>now()
        ]);

        return response()->json(['message'=>now()]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function search(Request $request)
    {
        $cours=Cours::where('nomPro','like','%'.$request->input('search').'%')->get();
        return response()->json($cours);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // $produit=Abscence::find($id);

        // $produit->update([
        //     'nomPro'=>$request->input('nom'),
        //     'priPro'=>$request->input('prix'),
        //     'fournisseur'=>$request->input('fours'),
        // ]);

        // return response()->json([
        //     'message'=>true
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function DeleteCours(string $id)
    {
        $cours=Cours::find($id);
        $cours->delete();

        return response()->json([
            'message'=>true
        ]);
    }


    public function GetFiliere(){

        $Filieres = DB::table('formations')
        ->select(
            'formations.id',
            'formations.nomForm'
        )
        // ->where('formations.archived_at',null)
        // ->where('formations.deleted_at',null)
        ->get();


        return response()->json($Filieres);
    }

    public function MettreDansLaCorbeille(string $id){

        $cours=Cours::find($id);
        //utiliser la suppression douce (soft delete) pour mettre un cours dans la corbeille
        // $cours -> delete([
        //     'deleted_at'=>now()
        // ]);
        Cours::whereIn('id',$cours)->delete();

        return response()->json(['message'=> 'cours mis en corbeille avec succès']);

    }

    public function AfficherLesCoursDansLaCorbeille (){

        $coursDansLaCorbeille = Cours::onlyTrashed()
            ->join('formations', 'formations.id', '=', 'cours.formation_id')
            ->select('cours.id',
                'cours.nomCours',
                'cours.heureDeb',
                'cours.heureFin',
                'cours.description',
                'cours.formation_id',
                'formations.id',
                'formations.nomForm',
                'cours.created_at',

            )
            ->get();

        return response()->json($coursDansLaCorbeille);
    }



    public function RestaurerCoursDansLaCorbeille(string $id){

        $cours = Cours::withTrashed()->find($id);

        if (!$cours) {
            return response()->json([
                'message'=>'cours non trouvé'
            ]);
        }

        if (!$cours ->trashed()) {
            return response()->json([
                'message'=>"Cet cours non trouvé"
            ]);
        }

        $cours->restore(); // cela difinira la date de suppression dans la colonne delete_at

        return response()->json([
            'message'=>'cours restauré avec succès',
        ]);
    }
}

