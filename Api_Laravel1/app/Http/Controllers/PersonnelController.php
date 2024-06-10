<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use Illuminate\Console\View\Components\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PersonnelController extends Controller
{

    public function index()
    {
        $personnels = DB::table('personnels')
                   ->where('personnels.archiver',0)
                   ->where('personnels.supprimer',0)
                   ->orderBy('id','desc')
                   ->get();
       return response()->json($personnels);

    }

       /**
         * Display a listing of the resource.
         */
        public function persoArchiver()
        {

            $personnels = DB::table('personnels')
                       ->where('personnels.archiver',1)
                       ->where('personnels.supprimer',0)
                       ->orderBy('id','desc')
                       ->get();
           return response()->json($personnels);

        }

        /**
                 * Display a listing of the resource.
                 */
                public function persoSupprimer()
                {
                    $personnels = DB::table('personnels')
                               ->where('personnels.archiver',0)
                               ->where('personnels.supprimer',1)
                               ->orderBy('id','desc')
                               ->get();
                   return response()->json($personnels);

                }

         /**
                         * Display a listing of the resource.
                         */
                        public function seePersonnel(string $id)
                        {

                          $personnel=Personnel::find($id)
                                  ->get();

                            return response()->json($personnel);

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
                'nomPerso'=>'required',
                'prenomPerso'=>'required',
                'dateNaissancePerso'=>'required',
                'adressePerso'=>'required',
                'telPerso'=>'required',
                'postePerso'=>'required',
                'emailPerso'=>'required',
                'diplomePerso'=>'required',
                'salairePerso'=>'required|numeric',
                'imagePerso'=>'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'typeContratPerso'=>'required',
                'sexePerso'=>'required',
                'debutContratPerso'=>'required',
                'finContratPerso'=>'required'
            ]);

            $imagePath = $request->file('imagePerso')->store();

            // Obtenez le fichier téléchargé
            $file = $request->file('imagePerso');

            // Générez un nom de fichier unique
            $fileName = now()->format('YmdHis') . '_' . $imagePath;

            // Stockez l'image dans le dossier 'public/imagesPerso'
            $file->move('imagesPerso', $fileName); //move regarde directement dans public

            try {

                    Personnel::create([
                        'nomPerso'=> $request->input('nomPerso'),
                        'prenomPerso'=> $request->input('prenomPerso'),
                        'dateNaissancePerso'=> $request->input('dateNaissancePerso'),
                        'adressePerso'=> $request->input('adressePerso'),
                        'telPerso'=> $request->input('telPerso'),
                        'postePerso'=> $request->input('postePerso'),
                        'archiver'=> 0,
                        'supprimer'=> 0,
                        'emailPerso'=> $request->input('emailPerso'),
                        'diplomePerso'=> $request->input('diplomePerso'),
                        'typeContratPerso'=> $request->input('typeContratPerso'),
                        'imagePerso'=> $fileName,
                        'sexePerso'=> $request->input('sexePerso'),
                        'salairePerso'=> $request->input('salairePerso'),
                        'debutContratPerso'=> $request->input('debutContratPerso'),
                        'finContratPerso'=> $request->input('finContratPerso'),
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

        $personnel = DB::table('personnels')
               ->where('personnels.id',$id)
               ->first();
      return response()->json($personnel);
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
            $abscences=Abscence::find($id);
            if (!$abscences) {
                return response()->json(['message' => 'Personnel non trouvée'], 404);
            }
            $abscences->update([
                'nomPerso'=> $request->input('nomPerso'),
                'prenomPerso'=> $request->input('prenomPerso'),
                'dateNaissancePerso'=> $request->input('dateNaissancePerso'),
                'adressePerso'=> $request->input('adressePerso'),
                'telPerso'=> $request->input('telPerso'),
                'postePerso'=> $request->input('postePerso'),
                'archiver'=> 0,
                 'supprimer'=> 0,
                'emailPerso'=> $request->input('emailPerso'),
                'diplomePerso'=> $request->input('diplomePerso'),
                'typeContratPerso'=> $request->input('typeContratPerso'),
                 'sexePerso'=> $request->input('sexePerso'),
                'salairePerso'=> $request->input('salairePerso'),
                'debutContratPerso'=> $request->input('debutContratPerso'),
                'finContratPerso'=> $request->input('finContratPerso'),
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
        $personnel=Personnel::find($id);
        $personnel->delete();

        return response()->json([
            'message'=>true
        ]);
    }

   // Marquer un personnel comme supprimée
    public function supprimer($id)
    {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel non trouvé'], 404);
        }

        $personnel->supprimer = 1; // Marquer comme supprimée
        $personnel->archiver = 0; // Marquer comme supprimée
        $personnel->save();

        return response()->json(['message' => 'Personnel supprimé']);
    }

    // Archiver un personnel
    public function archiver($id)
    {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel non trouvé'], 404);
        }

        $personnel->archiver = 1; // Marquer comme archivée
        $personnel->supprimer = 0; // Marquer comme supprimée
        $personnel->save();

        return response()->json(['message' => 'Personnel archivé']);
    }

     // Archiver un personnel
        public function archiverRestaurer($id)
        {
            $personnel = Personnel::find($id);
            if (!$personnel) {
                return response()->json(['message' => 'Personnel non trouvé'], 404);
            }

            $personnel->archiver = 0; // Marquer comme non archivée
            $personnel->supprimer = 0; // Marquer comme non supprimée
            $personnel->save();

            return response()->json(['message' => 'Personnel archivé']);
        }

    public function deleteSelected(Request $request)
         {

         $datas = $request->input('data');

             foreach ($datas as $data) {
                 $personnel = Personnel::find($data);
                 if (!$personnel) {
                     return response()->json(['message' => 'Personnel non trouvé'], 404);
                 }
                 $personnel->delete();
             }
             return response()->json(['message' => 'Personnel supprimer definitivement']);
         }

public function restauresSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel non trouvé'], 404);
        }
        $personnel->archiver = 1;
        $personnel->supprimer = 0;
        $personnel->save();
    }
    return response()->json(['message' => 'Personnel restauré']);
}

public function restaureSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel non trouvé'], 404);
        }
        $personnel->archiver = 0;
        $personnel->supprimer = 0;
        $personnel->save();
    }
    return response()->json(['message' => 'Personnel restauré']);
}

public function supprimeSelected(Request $request)
{
    $ids = $request->input('ids');

    foreach ($ids as $id) {
        $personnel = Personnel::find($id);
        if (!$personnel) {
            return response()->json(['message' => 'Personnel non trouvé'], 404);
        }
        $personnel->archiver = 0;
        $personnel->supprimer = 1;
        $personnel->save();
    }
    return response()->json(['message' => 'Personnel supprimé']);
}

}


