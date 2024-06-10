<?php

namespace App\Http\Controllers;

use App\Models\Enseignant;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EnseignantController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $enseignants = DB::table('enseignants')
            ->join('formations', 'formations.id', '=', 'enseignants.formation_id')
            ->join('cours', 'cours.id', '=', 'enseignants.cour_id')
            ->select('cours.nomCours', 'enseignants.id','enseignants.formation_id','enseignants.cour_id',
            'enseignants.nomEns','enseignants.prenomEns','enseignants.dateNaisEns','enseignants.emailEns',
            'enseignants.cniEns','enseignants.nivEtudeEns','enseignants.villeEns','enseignants.paysEns',
            'enseignants.telEns','enseignants.whatstappEns','enseignants.dernDiplEns','enseignants.genreEns',
            'enseignants.typeContratEns','enseignants.salaireEns','enseignants.photoProfilEns','enseignants.created_at',
            'enseignants.supprimer','enseignants.archiver','formations.nomForm')
            ->where('enseignants.supprimer',0)
            ->Where('enseignants.archiver',0)
            ->orderBy('id','desc')
            ->get();

        return response()->json($enseignants);

    }

       /**
         * Display a listing of the resource.
         */
        public function ensArchiver()
        {
            $enseignants = DB::table('enseignants')
                        ->join('formations', 'formations.id', '=', 'enseignants.formation_id')
                        ->join('cours', 'cours.id', '=', 'enseignants.cour_id')
                        ->select('cours.nomCours', 'enseignants.id','enseignants.formation_id','enseignants.cour_id',
                        'enseignants.nomEns','enseignants.prenomEns','enseignants.dateNaisEns','enseignants.emailEns',
                        'enseignants.cniEns','enseignants.nivEtudeEns','enseignants.villeEns','enseignants.paysEns',
                        'enseignants.telEns','enseignants.whatstappEns','enseignants.dernDiplEns','enseignants.genreEns',
                        'enseignants.typeContratEns','enseignants.salaireEns','enseignants.photoProfilEns','enseignants.created_at',
                        'enseignants.supprimer','enseignants.archiver','formations.nomForm')
                        ->where('enseignants.supprimer',0)
                        ->Where('enseignants.archiver',1)
                        ->orderBy('id','desc')
                        ->get();

                    return response()->json($enseignants);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function ensSupprimer()
                {
                    $enseignants = DB::table('enseignants')
                                ->join('formations', 'formations.id', '=', 'enseignants.formation_id')
                                ->join('cours', 'cours.id', '=', 'enseignants.cour_id')
                                ->select('cours.nomCours', 'enseignants.id','enseignants.formation_id','enseignants.cour_id',
                                'enseignants.nomEns','enseignants.prenomEns','enseignants.dateNaisEns','enseignants.emailEns',
                                'enseignants.cniEns','enseignants.nivEtudeEns','enseignants.villeEns','enseignants.paysEns',
                                'enseignants.telEns','enseignants.whatstappEns','enseignants.dernDiplEns','enseignants.genreEns',
                                'enseignants.typeContratEns','enseignants.salaireEns','enseignants.photoProfilEns','enseignants.created_at',
                                'enseignants.supprimer','enseignants.archiver','formations.nomForm')
                                ->where('enseignants.supprimer',1)
                                ->Where('enseignants.archiver',0)
                                ->orderBy('id','desc')
                                ->get();

                            return response()->json($enseignants);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seeEnseignant(string $id)
                        {

                          $enseignant=Enseignant::find($id)
                                  ->get();

                            return response()->json($enseignant);

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

            $request->validate([
                'photoProfilEns'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $imagePath = $request->file('photoProfilEns')->store();

            // Obtenez le fichier téléchargé
            $file = $request->file('photoProfilEns');

            // Générez un nom de fichier unique
            $fileName = now()->format('YmdHis') . '_' . $imagePath;

            // Stockez l'image dans le dossier 'public/imagesPerso'
            $file->move('imagesEnseig', $fileName); //move regarde directement dans public
            try {
                Enseignant::create([
                    'nomEns'=> $request->input('nomEns'),
                    'prenomEns'=> $request->input('prenomEns'),
                    'dateNaisEns'=> $request->input('dateNaisEns'),
                    'emailEns'=> $request->input('emailEns'),
                    'cniEns'=> $request->input('cniEns'),
                    'nivEtudeEns'=> $request->input('nivEtudeEns'),
                    'villeEns'=> $request->input('villeEns'),
                    'paysEns'=> $request->input('paysEns'),
                    'telEns'=> $request->input('telEns'),
                    'whatstappEns'=> $request->input('whatstappEns'),
                    'dernDiplEns'=> $request->input('dernDiplEns'),
                    'genreEns'=> $request->input('genreEns'),
                    'typeContratEns'=> $request->input('typeContratEns'),
                    'salaireEns'=> $request->input('salaireEns'),
                    'photoProfilEns'=> $fileName,
                    'archiver'=> 0,
                     'supprimer'=> 0,
                    'formation_id'=> $request->input('formation_id'),
                    'cour_id'=> $request->input('cour_id'),
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

        $enseignant = DB::table('enseignants')
                    ->join('formations', 'formations.id', '=', 'enseignants.formation_id')
                    ->join('cours', 'cours.id', '=', 'enseignants.cour_id')
                    ->select('cours.nomCours', 'enseignants.id','enseignants.formation_id','enseignants.cour_id',
                    'enseignants.nomEns','enseignants.prenomEns','enseignants.dateNaisEns','enseignants.emailEns',
                    'enseignants.cniEns','enseignants.nivEtudeEns','enseignants.villeEns','enseignants.paysEns',
                    'enseignants.telEns','enseignants.whatstappEns','enseignants.dernDiplEns','enseignants.genreEns',
                    'enseignants.typeContratEns','enseignants.salaireEns','enseignants.photoProfilEns','enseignants.created_at',
                    'enseignants.supprimer','enseignants.archiver','formations.nomForm')
                    ->where('enseignants.id',$id)
                    ->first();

                return response()->json($enseignant);
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
            $enseignant=Enseignant::find($id);
            if (!$enseignant) {
                return response()->json(['message' => 'Enseignant non trouvée'], 404);
            }
            $enseignant->update([
                'nomEns'=> $request->input('nomEns'),
                'prenomEns'=> $request->input('prenomEns'),
                'dateNaisEns'=> $request->input('dateNaisEns'),
                'emailEns'=> $request->input('emailEns'),
                'cniEns'=> $request->input('cniEns'),
                'nivEtudeEns'=> $request->input('nivEtudeEns'),
                'villeEns'=> $request->input('villeEns'),
                'paysEns'=> $request->input('paysEns'),
                'telEns'=> $request->input('telEns'),
                'whatstappEns'=> $request->input('whatstappEns'),
                'dernDiplEns'=> $request->input('dernDiplEns'),
                'genreEns'=> $request->input('genreEns'),
                'typeContratEns'=> $request->input('typeContratEns'),
                'salaireEns'=> $request->input('salaireEns'),
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
        $enseignant=Enseignant::find($id);
        $enseignant->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer une enseignant comme supprimée
    public function supprimer($id)
    {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'enseignant non trouvée'], 404);
        }

        $enseignant->supprimer = 1; // Marquer comme supprimée
        $enseignant->archiver = 0; // Marquer comme supprimée
        $enseignant->save();

        return response()->json(['message' => 'enseignant supprimé']);
    }

    // Archiver une enseignant
    public function archiver($id)
    {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'enseignant non trouvé'], 404);
        }

        $enseignant->archiver = 1; // Marquer comme archivée
        $enseignant->supprimer = 0; // Marquer comme supprimée
        $enseignant->save();

        return response()->json(['message' => 'enseignant archivé']);
    }

     // Archiver une enseignant
        public function archiverRestaurer($id)
        {
            $enseignant = Enseignant::find($id);
            if (!$enseignant) {
                return response()->json(['message' => 'enseignant non trouvé'], 404);
            }

            $enseignant->archiver = 0; // Marquer comme non archivée
            $enseignant->supprimer = 0; // Marquer comme non supprimée
            $enseignant->save();

            return response()->json(['message' => 'enseignant archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $enseignant = Enseignant::find($data);
                 if (!$enseignant) {
                     return response()->json(['message' => 'enseignant non trouvé'], 404);
                 }
                 $enseignant->delete();
             }
             return response()->json(['message' => 'enseignants supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'enseignant non trouvée'], 404);
        }
        $enseignant->archiver = 1;
        $enseignant->supprimer = 0;
        $enseignant->save();
    }
    return response()->json(['message' => 'enseignant restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'enseignant non trouvé'], 404);
        }
        $enseignant->archiver = 0;
        $enseignant->supprimer = 0;
        $enseignant->save();
    }
    return response()->json(['message' => 'enseignants restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['message' => 'enseignant non trouvé'], 404);
        }
        $enseignant->archiver = 0;
        $enseignant->supprimer = 1;
        $enseignant->save();
    }
    return response()->json(['message' => 'enseignant supprimé']);
}

}


