<?php

namespace App\Http\Controllers;

use App\Models\DepenseSortie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepenseSortieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = DB::table('depense_sorties')
            ->join('categorie_depenses', 'categorie_depenses.id', '=', 'depense_sorties.categorie_id')
            ->select('categorie_depenses.id',
                'categorie_depenses.nomCat',
                'depense_sorties.id',
                'depense_sorties.nomBudget',
                'depense_sorties.categorie_id',
                'depense_sorties.montant',
                'depense_sorties.devise',
                'depense_sorties.dateDepart',
                'depense_sorties.created_at'

               
            )
            // ->where('depense_sorties.archived_at',null)
            // ->where('depense_sorties.deleted_at',null)
            ->orderBy('depense_sorties.created_at','desc')
            ->get();
        // return EtudiantResource::collection(InscriptionEtudiant::orderBy('created_at','desc')->where('archived_at',null)->get());
        // return InscriptionEtudiant::orderBy('created_at','desc')->where('archived_at',null)->get();

        return response()->json($budgets);
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
    public function store(Request $request)
    {
        try {
            DepenseSortie::create([

                'nomBudget'=>$request->input('nomBudget'),
                'montant'=>$request->input('montant'),
                'devise'=>$request->input('devise'),
                'categorie_id'=>$request->input('categorie_id'),
                'dateDepart'=>$request->input('dateDepart')
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

    public function DetailsBudget(string $id){
        $budget = DepenseSortie::find($id);
        // $budget->formation->nomForm;

        return response()->json($budget);
    }




    //pour les boutons repeter

    // public function performTask(Request $request)
    // {
    //     // Récupérer la valeur du bouton cliqué depuis la requête
    //     $repeatOption = $request->input('repeatOption');

    //     // Désactiver les autres options après avoir cliqué sur l'un d'eux
    //     $disabledOptions = ['daily', 'once', 'weekly', 'biweekly', 'monthly', 'yearly'];
    //     $disabledOptions = array_diff($disabledOptions, [$repeatOption]);

    //     // Implémenter la logique en fonction de la valeur du bouton
    //     switch ($repeatOption) {
    //         case 'daily':
    //             // Logique quotidienne
    //             break;

    //         case 'once':
    //             // Logique pour une fois
    //             break;

    //         case 'weekly':
    //             // Logique hebdomadaire
    //             break;

    //         case 'biweekly':
    //             // Logique toutes les 2 semaines
    //             break;

    //         case 'monthly':
    //             // Logique mensuelle
    //             break;

    //         case 'yearly':
    //             // Logique annuelle
    //             break;

    //         default:
    //             return response()->json(['error' => 'Option de répétition non valide'], 400);
    //     }

    //     // Vous pouvez renvoyer une réponse réussie ou les données nécessaires
    //     return response()->json(['message' => 'Action répétée avec succès', 'disabledOptions' => $disabledOptions]);
    // }

    public function GoodperformTask(Request $request)
    {
        // Récupérer la valeur du bouton cliqué depuis la requête
        $repeatOption = $request->input('repeatOption');

         // Désactiver les autres options après avoir cliqué sur l'un d'eux
         $disabledOptions = ['daily', 'once', 'weekly', 'biweekly', 'monthly', 'yearly'];
         $disabledOptions = array_diff($disabledOptions, [$repeatOption]);

        // Implémenter la logique en fonction de la valeur du bouton
        switch ($repeatOption) {
            case 'daily':
                // Logique quotidienne (exemple: exécuter une tâche chaque jour)
                $result = $this->performDailyTask();
                break;

            case 'once':
                // Logique pour une fois (exemple: exécuter une tâche unique)
                $result = $this->performOnceTask();
                break;

            case 'weekly':
                // Logique hebdomadaire (exemple: exécuter une tâche chaque semaine)
                $result = $this->performWeeklyTask();
                break;

            case 'biweekly':
                // Logique toutes les 2 semaines (exemple: exécuter une tâche toutes les 2 semaines)
                $result = $this->performBiweeklyTask();
                break;

            case 'monthly':
                // Logique mensuelle (exemple: exécuter une tâche chaque mois)
                $result = $this->performMonthlyTask();
                break;

            case 'yearly':
                // Logique annuelle (exemple: exécuter une tâche chaque année)
                $result = $this->performYearlyTask();
                break;

            default:
                return response()->json(['error' => 'Option de répétition non valide'], 400);
        }

        // Vous pouvez renvoyer une réponse réussie ou les données nécessaires
        return response()->json(['message' => 'Action répétée avec succès', 'result' => $result]);
    }

// Logique quotidienne
private function performDailyTask()
{
    // Implémentez votre logique quotidienne ici
    return 'Tâche quotidienne effectuée';
}

// Logique pour une fois
private function performOnceTask()
{
    // Implémentez votre logique pour une fois ici
    return 'Tâche unique effectuée';
}

// Logique hebdomadaire
private function performWeeklyTask()
{
    // Implémentez votre logique hebdomadaire ici
    return 'Tâche hebdomadaire effectuée';
}

// Logique toutes les 2 semaines
private function performBiweeklyTask()
{
    // Implémentez votre logique toutes les 2 semaines ici
    return 'Tâche toutes les 2 semaines effectuée';
}

// Logique mensuelle
private function performMonthlyTask()
{
    // Implémentez votre logique mensuelle ici
    return 'Tâche mensuelle effectuée';
}

// Logique annuelle
private function performYearlyTask()
{
    // Implémentez votre logique annuelle ici
    return 'Tâche annuelle effectuée';
}














    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
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
            $budget=DepenseSortie::find($id);
            $budget->update([
                'nomBudget'=>$request->input('nomBudget'),
                'montant'=>$request->input('montant'),
                'devise'=>$request->input('devise'),
                'categorie_id'=>$request->input('categorie_id'),
                'dateDepart'=>$request->input('dateDepart')
            ]);
            return response()->json([
                'message'=>$id
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
        //
    }
}
