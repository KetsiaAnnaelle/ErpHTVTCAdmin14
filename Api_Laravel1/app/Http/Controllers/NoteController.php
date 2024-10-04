<?php

namespace App\Http\Controllers;

use App\Models\InscriptionEtudiant;
use App\Models\Note;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Show the form for creating a new resource.
     */

     //afficher toute les notes crees5
    public function index()
    {
        $Notes = DB::table('notes')
            ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'notes.Etudiant_id')
            ->join('formations', 'formations.id', '=', 'notes.formation_id')
            ->join('cours', 'cours.id', '=', 'notes.cour_id')
            ->select(
                'notes.id',
                'notes.formation_id',
                'notes.Etudiant_id',
                'notes.valeur',
                'notes.cour_id',
                'notes.created_at',
                'formations.nomForm',
                'inscription_etudiants.nomEtud',
                'cours.nomCours',
                )
            // ->whereNotNull('notes.archived_at')
            ->where('notes.archived_at',null)
            ->where('notes.deleted_at',null)
            ->where('inscription_etudiants.deleted_at',null)
            ->orderBy('notes.created_at','desc')
            ->get();

        // $Notes = Note::orderBy("created_at","desc")->get();

        return response()->json($Notes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $note = Note::create([
                'valeur'=>$request->input('valeur'),
                'Etudiant_id'=>$request->input('Etudiant_id'),
                'formation_id'=>$request->input('formation_id'),
                'cour_id'=>$request->input('cour_id'),
            ]);
            $note->save();
            return response()->json($request);
        } catch (\Throwable $e) {
            return response()->json([
                'message'=>$e
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
        // $notes = DB::table('notes')
        // ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'notes.Etudiant_id')
        // ->join('formations', 'formations.id', '=', 'notes.formation_id')
        // ->join('cours', 'cours.id', '=', 'notes.noteCours')
        // ->select('cours.nomCours', 'notes.id','notes.etudiant_id','notes.formation_id','notes.cour_id','abscences.dateAbs','abscences.nbreHeureAbs','abscences.typeAbs','abscences.motifAbs','abscences.supprimer','abscences.archiver','inscription_etudiants.nomEtud','inscription_etudiants.created_at','inscription_etudiants.prenomEtud','formations.nomForm')
    //->where('notes.id',$id)
    //     ->first();

    //     return response()->json($notes);
    // }

    /**

    * Show the form for editing the specified resource.
    */

    // ShowInfosNoteEdit
    public function edit(string $id)
    {
        $note=Note::find($id);

        return response()->json($note);
    }

    /**
     * Update the specified resource in storage.
     */

    // EditerNote
    public function update(Request $request, string $id)
    {
        try {
            $etudiants=Note::find($id);


            $etudiants->update([
                'valeur'=>$request->input('valeur'),
                'Etudiant_id'=>$request->input('Etudiant_id'),
                'formation_id'=>$request->input('formation_id'),
                'cour_id'=>$request->input('cour_id'),
            ])->save();

            return response()->json([
                'message'=>true,
            ]);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function GetEtudiantsAndFiliere(){
        $etudiants = DB::table('inscription_etudiants')
        ->select(
            'inscription_etudiants.id',
            'inscription_etudiants.nomEtud',
        )
        ->where('inscription_etudiants.archived_at',null)
        ->where('inscription_etudiants.deleted_at',null)
        ->get();

        $Fileres = DB::table('formations')
        ->select(
            'formations.id',
            'formations.nomForm'
        )
        // ->where('formations.archived_at',null)
        // ->where('formations.deleted_at',null)
        ->get();

        $Cours = DB::table('cours')
        ->select(
            'cours.id',
            'cours.nomCours'
        )
        // ->where('cours.archived_at',null)
        // ->where('cours.deleted_at',null)
        ->get();

        $response = [
            'etudiants' =>$etudiants,
            'Fileres' =>$Fileres,
            'Cours' =>$Cours,
        ];

        return response()->json($response);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Note = Note::withTrashed()->find($id);

        if (!$Note) {
            return response()->json([
                'message'=>'Note non trouvé'
            ]);
        }

        if (!$Note ->trashed()) {
            return response()->json([
                'message'=>"Cet Note n'est pas dans la corbeille"
            ]);
        }
        $Note->forceDelete();

        return response()->json([
            'message'=>'Note supprime definitivement avec succes',
        ]);
    }


    //Fonction pour un etudiant en corbeille: recuperer les etudiants marques comme supprime et les afficher dans la page de la corbeiile

    public function AfficherLesNotesDansLaCorbeille (){

        $NoteDansLaCorbeille = Note::onlyTrashed()
                                ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'notes.Etudiant_id')
                                ->join('formations', 'formations.id', '=', 'notes.formation_id')
                                ->join('cours', 'cours.id', '=', 'notes.cour_id')
                                ->select(
                                    'notes.id',
                                    'notes.formation_id',
                                    'notes.Etudiant_id',
                                    'notes.valeur',
                                    'notes.deleted_at',
                                    'notes.cour_id',
                                    'notes.created_at',
                                    'formations.nomForm',
                                    'inscription_etudiants.nomEtud',
                                    'cours.nomCours',
                                    )
                                ->get();

        return response()->json($NoteDansLaCorbeille);
    }

    //fonction pour mettre un etudiant dans la corbeille
    public function MettreDansLaCorbeille(string $id){

        $Note=Note::find($id);
        //utiliser la suppression douce (soft delete) pour mettre un etudiant dans la corbeille
        // $Note -> delete([
        //     'deleted_at'=>now()
        // ]);
        Note::whereIn('id',$Note)->delete();

        return response()->json(['message'=> 'Note mis en corbeille avec succès']);

    }

    public function RestaurerNotetDansLaCorbeille(string $id){

        $etudiant = Note::withTrashed()->find($id);

        if (!$etudiant) {
            return response()->json([
                'message'=>'Etudiant non trouvé'
            ]);
        }

        if (!$etudiant ->trashed()) {
            return response()->json([
                'message'=>"Cet Etudiant non trouvé"
            ]);
        }

        $etudiant->restore(); // cela difinira la date de suppression dans la colonne delete_at

        return response()->json([
            'message'=>'Etudiant restauré avec succès',
        ]);
    }

    //pour gerer l'achivage d'un etudiant
    public function archive(string $id)
    {

        $Note = Note::find($id);
        $Note ->update([
            'archived_at'=>now()
        ]);

        return response()->json(['message'=>now()]);

    }

    public function AfficherLesNotesArchivés (){

        $Notes = DB::table('notes')
        ->join('inscription_etudiants', 'inscription_etudiants.id', '=', 'notes.Etudiant_id')
        ->join('formations', 'formations.id', '=', 'notes.formation_id')
        ->join('cours', 'cours.id', '=', 'notes.cour_id')
        ->select(
            'notes.id',
            'notes.formation_id',
            'notes.Etudiant_id',
            'notes.valeur',
            'notes.cour_id',
            'notes.created_at',
            'formations.nomForm',
            'inscription_etudiants.nomEtud',
            'cours.nomCours',
            'notes.archived_at'
            )
        ->whereNotNull('notes.archived_at')
        ->orderBy('notes.created_at','desc')
        ->get();

        return response()->json($Notes);
    }

    public function DetailsNote(string $id){


        $Note = Note::find($id);
        $Note->Formation->nomForm;
        $Note->Etudiant_id;

        // $NoteStud = InscriptionEtudiant::find($id);
        // $NoteStud->note;
        // $Note->Etudiant->id;

        return response()->json($Note);
        // return response()->json(['note' => $Note, 'allnotes' => $NoteStud]);
    }


    public function AllNote(string $id){


        $Note = InscriptionEtudiant::find($id);
        $Note->note;
        // $Note->Etudiant->id;

        return response()->json($Note);
    }

    //Restaurer une note
    public function RestaurerNoteArchivé(string $id){

        $Note = Note::find($id);


        if (!$Note) {
            return response()->json([
                'message'=>'Note non trouvé'
            ]);
        }

        // $etudiant->formation->nomForm;
        //Reinitialiser la colonne archived_at pour restaurer l'etudiant
        $Note->update([
            'archived_at'=>null
        ]);

        return response()->json([
            'message'=>'Note restauré avec succès',
            $Note
        ]);
    }

    //supprimer plusieurs notes a la fois
    public function deleteSelected(Request $request)
    {
        $notes = Note::find($request->data);
        foreach($notes as $note){
            $note->delete();
        }

        return response()->json(true);
    }


    public function generatePDF($etudiantId){
        try {
            $options = new Options();
            $options->set('defaultFont', 'Arial');
            $options->set('isCssEnabled', true); // prise en charge du css3
            $options->set('defaultPaperOrientation', 'landscape');
            $dompdf = new Dompdf($options);

            // Fetch student data using etudiant_id
            // $studentData = DB::table('inscription_etudiants')
            //     ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
            //     ->select('inscription_etudiants.nomEtud', 'inscription_etudiants.id', 'inscription_etudiants.prenomEtud', 'inscription_etudiants.formation_id', 'formations.id', 'formations.nomForm',
            //     DB::raw('DATE_FORMAT(inscription_etudiants.created_at, "%y") as yearCreated')) //pour extraire 24 de 2024 par exemple
            //     ->where('inscription_etudiants.id', $etudiantId)
            //     ->first();

            // $nomEns = DB::table('cours')
            //                 ->join('en')

            $student = DB::table('inscription_etudiants')
            ->join('formations', 'formations.id', '=', 'inscription_etudiants.formation_id')
            ->select('inscription_etudiants.nomEtud','inscription_etudiants.prenomEtud','inscription_etudiants.formation_id','formations.nomForm')
            ->where('inscription_etudiants.id', $etudiantId)->first();
            $notes = DB::table('notes')
                ->join('cours', 'cours.id', '=', 'notes.cour_id')
                ->select(
                    'cours.nomCours',
                    'notes.valeur',
                    'notes.id as note_id', // Assurez-vous que 'notes.id' est sélectionné avec un alias
                    'cours.nomCours',
                    // Ajoutez ces colonnes si elles existent dans la table 'notes'
                    // 'notes.appreciation',
                    // 'notes.observations'
                    'cours.id'
                )
                ->where('notes.etudiant_id', $etudiantId)
                ->get();

            // return view('bulletin', compact('student', 'notes'));



        // // Récupérer les données des tranches pour la filière de l'étudiant
        //     $tranches = DB::table('tranches')
        //     ->where('formation_id', $studentData->formation_id)
        //     ->get();

        // $totalPaye = 0;
        // $totalRestant = 0;

        // // Parcourir les tranches et calculer les montants payés et restants
        // $trancheData = $tranches->map(function ($tranche) use ($etudiantId, &$totalPaye, &$totalRestant) {
        //     $factures = DB::table('factures')
        //         ->select(
        //             DB::raw('SUM(paye) as SumPaye'),
        //             DB::raw('SUM(restant) as SumRestant'),
        //             // DB::raw('DATE_FORMAT(created_at, "%y") as yearCreated')
        //         )
        //         ->where('tranche_id', $tranche->id)
        //         ->where('etudiant_id', $etudiantId)
        //         ->where('supprimer', 0)
        //         ->where('archiver', 0)
        //         ->first();

        //     if ($factures && $factures->SumPaye !== null) {
        //         $tranche->SumPaye = $factures->SumPaye;
        //         $tranche->SumRestant = $factures->SumRestant;
        //         // $tranche->yearCreated = $factures->yearCreated;
        //     } else {
        //         $tranche->SumPaye = 0;
        //         $tranche->SumRestant = $tranche->montant;
        //         // $tranche->yearCreated = date('y', strtotime($tranche->created_at));
        //     }

        //     $totalPaye += $tranche->SumPaye;
        //     $totalRestant += $tranche->SumRestant;

        //     return $tranche;
        // });

        // Charger les données dans la vue
        $pdf = app('dompdf.wrapper');
        $pdf->loadView('bulletin', compact('student', 'notes'));

        // Télécharger le fichier PDF
        return $pdf->download("test.pdf");
        } catch (\Throwable $e) {
            // Gérer l'exception
            Log::error('Error generating PDF: ' . $e->getMessage());
            return response()->json(['error' => 'Error generating PDF: ' . $e->getMessage()], 500);
        }
    }
}
