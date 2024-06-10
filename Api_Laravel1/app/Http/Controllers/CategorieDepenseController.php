<?php

namespace App\Http\Controllers;

use App\Models\CategorieDepense;
use Illuminate\Http\Request;

class CategorieDepenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories =  CategorieDepense::orderBy('created_at','asc')->get(); 
        // $categories =  CategorieDepense::all(); 
        return response()->json($categories);
        // return CategorieDepense::orderBy('created_at','desc')->where('archived_at',null)->get(); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            CategorieDepense::create([

                // 'icone'=>$request->input('icone'),
                'nomCat'=>$request->input('nomCat'),
                'typeCat'=>$request->input('typeCat'),
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

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }
    
    
    //afficher les informations de l'categorie dont on veut modifier les informations
    public function show(string $id)
    {
        $categorie=CategorieDepense::find($id);

        return response()->json($categorie);
    }

    
    
    /**
     * Update the specified resource in storage.
     */
    
    //fonction pour editer les informations affichees
     //  Editer Categories
    public function update(Request $request, string $id)
    {
        try {
            $categorie=CategorieDepense::find($id);


            $categorie->update([
                'nomCat'=> $request->input('nomCat'),
                
            ]);

        return response()->json([
            'message'=>true,
        ]);
        } catch (\Throwable $th) {
            return response()->json($th);
        }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categorie = CategorieDepense::find($id);

        $categorie->delete();
        // if (!$categorie) {
        //     return response()->json([
        //         'message'=>'categorie non trouvé'
        //     ]);
        // }

        // if (!$categorie ->trashed()) {
        //     return response()->json([
        //         'message'=>"Cet categorie n'est pas dans la corbeille"
        //     ]);
        // }
        // $categorie->forceDelete();

        return response()->json([
            'message'=>'categorie supprime definitivement avec succes',
        ]);
    }

    public function deleteSelected(Request $request)
    {
        $categories = CategorieDepense::find($request->data);
        foreach($categories as $categorie){
            $categorie->delete();
        }

        return response()->json(true);
    }

   
}
