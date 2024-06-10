<?php

use App\Http\Controllers\AbscenceController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\FiliereEtudController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\RembourssementController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\PaiementFactureController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ConduiteController;
use App\Http\Controllers\NewConduiteController;
use App\Http\Controllers\PersonnelController;
use App\Http\Controllers\FicheTravailPersoController;
use App\Http\Controllers\PerformancePersoController;
use App\Http\Controllers\CongePersoController;
use App\Http\Controllers\CarrierePersoController;
use App\Http\Controllers\PaiementPersoController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\FicheCoursEnsController;
use App\Http\Controllers\PerformanceEnsController;
use App\Http\Controllers\PaiementEnsController;
use App\Http\Controllers\CongeEnsController;
use App\Http\Controllers\CarriereEnsController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\NewPaiementPersoController;
use App\Http\Controllers\NewPaiementEnsController;
use App\Http\Controllers\NewPerfEnsController;
use App\Http\Controllers\NewPerfPersoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieDepenseController;
use App\Http\Controllers\DepenseEntreeController;
use App\Http\Controllers\DepenseSortieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::middleware(['auth.api'])->group(function (){

    //Creer une Formation

    Route::get('/form', [FiliereEtudController::class, 'index']);
    Route::post('/form', [FiliereEtudController::class, 'FilièreEtud']);
    Route::get('/form/{nomForm}',[FiliereEtudController::class,'show']);
    Route::delete('/form/{id}',[FiliereEtudController::class,'destroy']);
    Route::put('/form/{id}/supprimer', [FiliereEtudController::class, 'supprimer']);
    Route::put('/form/{id}/archiver', [FiliereEtudController::class, 'archiver']);
    Route::post('/form/{id}',[FiliereEtudController::class,'update']);
    Route::post('/form/see/{id}',[FiliereEtudController::class,'seeForm']);
    Route::put('/form/element', [FiliereEtudController::class, 'deleteSelected']);
    Route::put('/form/elementRestaures', [FiliereEtudController::class, 'restauresSelected']);
    Route::put('/form/elementRestaure', [FiliereEtudController::class, 'restaureSelected']);
    Route::put('form/elementSupprime', [FiliereEtudController::class, 'supprimeSelected']);
    Route::get('/formsArchiver', [FiliereEtudController::class, 'formArchiver']);
    Route::get('/formsSupprimer', [FiliereEtudController::class, 'formSupprimer']);
    Route::put('/form/{id}/archiverRestaurer', [FiliereEtudController::class, 'archiverRestaurer']);


    //Cours

    Route::get('/cours',[CoursController::class,'index']);
    Route::get('/cours/{selectedFiliereId}',[CoursController::class,'selectedFiliere']);
    Route::get('/etud/{selectedCoursId}',[CoursController::class,'selectedCours']);
    Route::post('/cours',[CoursController::class,'store']);

    Route::get('/edit-cours/{id}', [CoursController::class, 'ShowInfosCoursEdit']); //recuperer les infos d'un etudiant avant de les modifier
    Route::put('/edit-cours/{id}', [CoursController::class, 'EditerCours'])->whereNumber('id'); //modifier un etudiant

    Route::delete('/force-delete-cours/{id}', [CoursController::class, 'DeleteCours'])->whereNumber('id');

    //route pour mettre un etudiant dans la corbeille
    Route::get('/get-cours-corbeille', [CoursController::class, 'AfficherLesCoursDansLaCorbeille']);
    Route::delete('/delete-cours/{id}/corbeille', [CoursController::class, 'MettreDansLaCorbeille'])->whereNumber('id');

    //restaurer un etudiant de la corbeille
    Route::put('/restore-cours/{id}/corbeille', [CoursController::class, 'RestaurerCoursDansLaCorbeille'])->whereNumber('id');

    Route::get('/GetFiliereDepense', [CoursController::class, 'GetFiliere']);

    //archiver un etudiant
    Route::get('/get-cours-archives', [CoursController::class, 'AfficherLesCoursArchivés']); //avoir tous les etudiants archives

    Route::put('/archive-cours/{id}', [CoursController::class, 'archive']); //pour archiver un etudiant

    Route::put('/restore-cours/{id}/archivé', [CoursController::class, 'RestaurerCoursArchivés'])->whereNumber('id');

     // Abscence

    // Abscence

    Route::get('/abscences',[AbscenceController::class,'index']);
    Route::post('/abscences',[AbscenceController::class,'store']);
    //Route::get('/abscence/{id}',[AbscenceController::class,'show']);
    Route::delete('/abscence/{id}',[AbscenceController::class,'destroy']);
    Route::put('abscence/{id}/supprimer', [AbscenceController::class, 'supprimer']);
    Route::put('abscence/{id}/archiver', [AbscenceController::class, 'archiver']);
    Route::post('/abscence/{id}',[AbscenceController::class,'update']);
    Route::post('/abscence/see/{id}',[AbscenceController::class,'seeAbscence']);
    Route::put('abscence/element', [AbscenceController::class, 'deleteSelected']);
    Route::put('abscence/elementRestaures', [AbscenceController::class, 'restauresSelected']);
    Route::put('abscence/elementRestaure', [AbscenceController::class, 'restaureSelected']);
    Route::put('abscence/elementSupprime', [AbscenceController::class, 'supprimeSelected']);
    Route::get('abscencesArchiver', [AbscenceController::class, 'absArchiver']);
    Route::get('abscencesSupprimer', [AbscenceController::class, 'absSupprimer']);
    Route::put('abscence/{id}/archiverRestaurer', [AbscenceController::class, 'archiverRestaurer']);
    Route::get('/abscence/formation/{nomForm}/etudiant', [AbscenceController::class, 'absenceForm']);
    Route::get('/abscences/formation/{nomForm}/etudiant/{id}', [AbscenceController::class, 'detailsAbsenceEtud']);
    Route::get('/etud/formation/${nomForm}/cours/${nomCours}', [AbscenceController::class, 'absenceFormCoursEtud']);
    Route::get('/formation/${nomForm}/cours', [AbscenceController::class, 'absenceFormCours']);
    Route::get('/formation/nombre', [AbscenceController::class, 'AbsenceParFiliere']);
    // Route::get('/etud/{selectedCoursId}',[AbscenceController::class,'selectedCours']);


    // InscriptionEtudiant


    Route::get('/etud/inscription/inscription', [EtudiantController::class, 'inscription']);
    Route::get('/etudiant/{selectedFiliereId}', [EtudiantController::class, 'selectedFiliere']);
    Route::post('/etud/inscription', [EtudiantController::class, 'inscrireEtudiant']);

    Route::get('/edit-student/{id}', [EtudiantController::class, 'ShowInfosStudentEdit']); //recuperer les infos d'un etudiant avant de les modifier
    Route::put('/edit-student/{id}', [EtudiantController::class, 'EditerStudent'])->whereNumber('id'); //modifier un etudiant

    Route::delete('/force-delete-student/{id}', [EtudiantController::class, 'DeleteEtudiant'])->whereNumber('id');

    //route pour mettre un etudiant dans la corbeille
    Route::get('/get-etudiant-corbeille', [EtudiantController::class, 'AfficherLesEtudiantsDansLaCorbeille']);
    Route::delete('/delete-student/{id}/corbeille', [EtudiantController::class, 'MettreDansLaCorbeille'])->whereNumber('id');

    //restaurer un etudiant de la corbeille
    Route::put('/restore-student/{id}/corbeille', [EtudiantController::class, 'RestaurerEtudiantDansLaCorbeille'])->whereNumber('id');

    //Pour avoir toutes les formations dans Etudiants

    Route::get('/getFormation', [EtudiantController::class, 'GetFormations']); //toutes les formations


    //archiver un etudiant
    Route::get('/get-etudiant-archives', [EtudiantController::class, 'AfficherLesEtudiantsArchivés']); //avoir tous les etudiants archives

    Route::put('/archive-student/{id}', [EtudiantController::class, 'archive']); //pour archiver un etudiant

    Route::put('/restore-student/{id}/archivé', [EtudiantController::class, 'RestaurerEtudiantArchivé'])->whereNumber('id'); //restaurer un etudiant archivé


    //Details d'un etudiant
    Route::get('/get-etudiant/{id}', [EtudiantController::class, 'DetailsEtudiant']);


    //Route pour avoir les etudiants d'une filiere

    Route::get('/students/{filiere}',[EtudiantController::class,'GetStudentsByClass']);


    //supprimer un etudiant quand on a selectionne
    Route::post('/element-etudiant', [EtudiantController::class, 'deleteSelected']);


    //Creer une Formation

    Route::post('/form', [FiliereEtudController::class, 'FilièreEtud']);
    Route::get('/form', [FiliereEtudController::class, 'index']); //toutes les formations


    //Cours

    Route::get('/cours',[CoursController::class,'index']);

   // Facture

   Route::get('/factures',[FactureController::class,'index']);
   Route::get('/factures-par-etud',[FactureController::class,'showFact']);
   Route::post('/factures',[FactureController::class,'store']);
   Route::get('/facture/etudiant/{id}/formation/{nomForm}',[FactureController::class,'show']);
   Route::get('/facture/etudiant/{id}',[FactureController::class,'showEtud']);
   Route::delete('/facture/{id}',[FactureController::class,'destroy']);
   Route::put('facture/{id}/supprimer', [FactureController::class, 'supprimer']);
   Route::put('facture/{id}/archiver', [FactureController::class, 'archiver']);
   Route::post('/facture/{id}',[FactureController::class,'update']);
   Route::post('/facture/see/{id}',[FactureController::class,'seeFacture']);
   Route::put('facture/element', [FactureController::class, 'deleteSelected']);
   Route::get('facturesArchiver', [FactureController::class, 'factArchiver']);
   Route::get('facturesSupprimer', [FactureController::class, 'factSupprimer']);
   Route::put('facture/elementRestaures', [FactureController::class, 'restauresSelected']);
   Route::put('facture/elementRestaure', [FactureController::class, 'restaureSelected']);
   Route::put('facture/elementSupprime', [FactureController::class, 'supprimeSelected']);
   Route::put('facture/{id}/archiverRestaurer', [FactureController::class, 'archiverRestaurer']);
   Route::get('/formation/Total_nombre', [FactureController::class, 'FactureParFiliere']);
   Route::get('/facture/formation/{nomForm}/etudiant', [FactureController::class, 'factureForm']);

    // Rembourssement

    Route::get('/rembourssements',[RembourssementController::class,'index']);
    Route::post('/rembourssements',[RembourssementController::class,'store']);
    Route::get('/rembourssement/{id}',[RembourssementController::class,'show']);
    Route::delete('/rembourssement/{id}',[RembourssementController::class,'destroy']);
    Route::put('rembourssement/{id}/supprimer', [RembourssementController::class, 'supprimer']);
    Route::put('rembourssement/{id}/brouillon', [RembourssementController::class, 'brouillon']);
    Route::post('/rembourssement/{id}',[RembourssementController::class,'update']);
    Route::post('/facture/see/{id}',[RembourssementController::class,'seeFacture']);
    Route::delete('rembourssement/element', [RembourssementController::class, 'deleteSelected']);
    Route::get('rembourssementsBrouillon', [RembourssementController::class, 'factBrouillon']);
    Route::get('rembourssementsSupprimer', [RembourssementController::class, 'factSupprimer']);
    Route::put('rembourssement/elementRestaures', [RembourssementController::class, 'restauresSelected']);
    Route::put('rembourssement/elementRestaure', [RembourssementController::class, 'restaureSelected']);
    Route::put('rembourssement/elementSupprime', [RembourssementController::class, 'supprimeSelected']);
    Route::put('rembourssements/{id}/brouillonRestaurer', [RembourssementController::class, 'brouillonRestaurer']);



    //Gestion des Paiements

    Route::get('/get-paiement', [PaiementController::class, 'index']);
    Route::get('/get-paiement/{id}', [PaiementController::class, 'show']);
    Route::get('/paiement/total', [PaiementController::class, 'paiementTotal']);
    Route::get('/get-paiement/etud/{id}', [PaiementController::class, 'showProchainEtud']);
    Route::get('/get-paiement/form/{nomForm}/etud', [PaiementController::class, 'showProchainPaiementParFormation']);
    Route::post('/create-paiement', [PaiementController::class, 'store']);
    Route::get('/get-paiement-etudiant', [PaiementController::class, 'showPaieEtud']);
    Route::get('/get-paiement-etudiant-montant/{nomForm}', [PaiementController::class, 'showPaieEtudMontant']);
    Route::get('/get-paiement-etudiant-montant/{id}', [PaiementController::class, 'showPaieMontant']);
    Route::put('/archive-paiement/{id}', [PaiementController::class, 'archivePaiement'])->whereNumber('id'); //pour archiver un etudiant
    Route::get('/update-paiement/{id}', [PaiementController::class, 'ShowInfosPaiementEdit']); //recuperer les infos d'un etudiant avant de les modifier
    Route::put('/update-paiement/{id}', [PaiementController::class, 'update'])->whereNumber('id'); //modifier un paiement


    Route::delete('/force-delete-paiement/{id}', [PaiementController::class, 'DeletePaiement'])->whereNumber('id');

    //route pour mettre un paiement dans la corbeille
    Route::get('/get-paiement-corbeille', [PaiementController::class, 'AfficherLesPaiementsDansLaCorbeille']);
    Route::delete('/delete-paiement/{id}/corbeille', [PaiementController::class, 'MettreDansLaCorbeille'])->whereNumber('id');

    //restaurer un paiement de la corbeille
    Route::put('/restore-paiement/{id}/corbeille', [PaiementController::class, 'RestaurerPaiementDansLaCorbeille'])->whereNumber('id');

    //archiver un paiement
    Route::get('/get-paiement-archives', [PaiementController::class, 'AfficherLesPaiementsArchivés']); //avoir tous les etudiants archives

    Route::put('/archive-paiement/{id}', [PaiementController::class, 'archivePaiement'])->whereNumber('id'); //pour archiver un etudiant

    Route::put('/restore-paiement/{id}/archivé', [PaiementController::class, 'RestaurerPaiementArchivé'])->whereNumber('id'); //restaurer un etudiant archivé

    //supprimer un paiement quand on a selectionne
    Route::post('/element-paiement', [PaiementController::class, 'deleteSelected']);
    Route::get('/GetEtudiantsAndFiliere', [PaiementController::class, 'GetEtudiantsAndFiliere']);



    //avoir les details d'un paiement dans facture

    Route::get('/get-paiement-Facture/{id}', [PaiementFactureController::class, 'show']);

    Route::post('/create-paiementFacture/{id}', [PaiementFactureController::class, 'store']);

    Route::put('/update-paiementFacture/{id}', [PaiementFactureController::class,'update'])->whereNumber('id'); //modifier un paiement





    // Stage

    Route::get('/stages',[StageController::class,'index']);
    Route::post('/stages',[StageController::class,'store']);
    Route::get('/stage/{id}',[StageController::class,'show']);
    Route::delete('/stage/{id}',[StageController::class,'destroy']);
    Route::put('stage/{id}/supprimer', [StageController::class, 'supprimer']);
    Route::put('stage/{id}/archiver', [StageController::class, 'archiver']);
    Route::post('/stage/{id}',[StageController::class,'update']);
    Route::post('/stage/see/{id}',[StageController::class,'seeStage']);
    Route::put('stage/element', [StageController::class, 'deleteSelected']);
    Route::put('stage/elementRestaures', [StageController::class, 'restauresSelected']);
    Route::put('stage/elementRestaure', [StageController::class, 'restaureSelected']);
    Route::put('stage/elementSupprime', [StageController::class, 'supprimeSelected']);
    Route::get('stagesArchiver', [StageController::class, 'stageArchiver']);
    Route::get('stagesSupprimer', [StageController::class, 'stageSupprimer']);
    Route::put('stages/{id}/archiverRestaurer', [StageController::class, 'archiverRestaurer']);
    Route::get('/stages/nombre', [StageController::class, 'StageParFiliere']);
    Route::get('/stage/formation/{nomForm}/etudiant', [StageController::class, 'detailsStageEtud']);

    // Conduite

    Route::get('/conduites',[ConduiteController::class,'index']);
    Route::post('/conduites',[ConduiteController::class,'store']);
    Route::get('/conduite/{id}',[ConduiteController::class,'show']);
    Route::delete('/conduite/{id}',[ConduiteController::class,'destroy']);
    Route::put('conduite/{id}/supprimer', [ConduiteController::class, 'supprimer']);
    Route::put('conduite/{id}/archiver', [ConduiteController::class, 'archiver']);
    Route::post('/conduite/{id}',[ConduiteController::class,'update']);
    Route::post('/conduite/see/{id}',[ConduiteController::class,'seeConduite']);
    Route::put('conduite/element', [ConduiteController::class, 'deleteSelected']);
    Route::get('conduitesArchiver', [ConduiteController::class, 'condArchiver']);
    Route::get('conduitesSupprimer', [ConduiteController::class, 'condSupprimer']);
    Route::put('conduite/elementRestaures', [ConduiteController::class, 'restauresSelected']);
    Route::put('conduite/elementRestaure', [ConduiteController::class, 'restaureSelected']);
    Route::put('conduite/elementSupprime', [ConduiteController::class, 'supprimeSelected']);
    Route::put('conduite/{id}/archiverRestaurer', [ConduiteController::class, 'archiverRestaurer']);

    //avoir les details d'une nouvelle conduite

    Route::post('/create-newConduite/{id}', [NewConduiteController::class, 'store']);
    Route::get('/get-newConduite', [NewConduiteController::class, 'index']);
    Route::post('/update-newConduite/{id}', [NewConduiteController::class,'update'])->whereNumber('id');
    Route::get('/newConduite/{id}',[NewConduiteController::class,'show']);

    // Personel

    Route::get('/personnels',[PersonnelController::class,'index']);
    Route::post('/personnels',[PersonnelController::class,'store']);
    Route::get('/personnel/{id}',[PersonnelController::class,'show']);
    Route::delete('/personnel/{id}',[PersonnelController::class,'destroy']);
    Route::put('personnel/{id}/supprimer', [PersonnelController::class, 'supprimer']);
    Route::put('personnel/{id}/archiver', [PersonnelController::class, 'archiver']);
    Route::post('/personnel/{id}',[PersonnelController::class,'update']);
    Route::post('/personnel/see/{id}',[PersonnelController::class,'seePersonnel']);
    Route::put('personnel/element', [PersonnelController::class, 'deleteSelected']);
    Route::put('personnel/elementRestaures', [PersonnelController::class, 'restauresSelected']);
    Route::put('personnel/elementRestaure', [PersonnelController::class, 'restaureSelected']);
    Route::put('personnel/elementSupprime', [PersonnelController::class, 'supprimeSelected']);
    Route::get('personnelsArchiver', [PersonnelController::class, 'persoArchiver']);
    Route::get('personnelsSupprimer', [PersonnelController::class, 'persoSupprimer']);
    Route::put('personnel/{id}/archiverRestaurer', [PersonnelController::class, 'archiverRestaurer']);

    // Fiche travail

    Route::get('/ficheTravails',[FicheTravailPersoController::class,'index']);
    Route::post('/ficheTravails',[FicheTravailPersoController::class,'store']);
    Route::get('/ficheTravail/{id}',[FicheTravailPersoController::class,'show']);
    Route::delete('/ficheTravail/{id}',[FicheTravailPersoController::class,'destroy']);
    Route::put('ficheTravail/{id}/supprimer', [FicheTravailPersoController::class, 'supprimer']);
    Route::put('ficheTravail/{id}/archiver', [FicheTravailPersoController::class, 'archiver']);
    Route::post('/ficheTravail/{id}',[FicheTravailPersoController::class,'update']);
    Route::post('/ficheTravail/see/{id}',[FicheTravailPersoController::class,'seeFT']);
    Route::put('ficheTravail/element', [FicheTravailPersoController::class, 'deleteSelected']);
    Route::put('ficheTravail/elementRestaures', [FicheTravailPersoController::class, 'restauresSelected']);
    Route::put('ficheTravail/elementRestaure', [FicheTravailPersoController::class, 'restaureSelected']);
    Route::put('ficheTravail/elementSupprime', [FicheTravailPersoController::class, 'supprimeSelected']);
    Route::get('ficheTravailsArchiver', [FicheTravailPersoController::class, 'ftArchiver']);
    Route::get('ficheTravailsSupprimer', [FicheTravailPersoController::class, 'ftSupprimer']);
    Route::put('ficheTravail/{id}/archiverRestaurer', [FicheTravailPersoController::class, 'archiverRestaurer']);

    // performance personnel

    Route::get('/performances',[PerformancePersoController::class,'index']);
    Route::post('/performances',[PerformancePersoController::class,'store']);
    Route::get('/performance/{id}',[PerformancePersoController::class,'show']);
    Route::delete('/performance/{id}',[PerformancePersoController::class,'destroy']);
    Route::put('performance/{id}/supprimer', [PerformancePersoController::class, 'supprimer']);
    Route::put('performance/{id}/archiver', [PerformancePersoController::class, 'archiver']);
    Route::post('/performance/{id}',[PerformancePersoController::class,'update']);
    Route::post('/performance/see/{id}',[PerformancePersoController::class,'seePerformance']);
    Route::put('performance/element', [PerformancePersoController::class, 'deleteSelected']);
    Route::get('performancesArchiver', [PerformancePersoController::class, 'perfArchiver']);
    Route::get('performancesSupprimer', [PerformancePersoController::class, 'perfSupprimer']);
    Route::put('performance/elementRestaures', [PerformancePersoController::class, 'restauresSelected']);
    Route::put('performance/elementRestaure', [PerformancePersoController::class, 'restaureSelected']);
    Route::put('performance/elementSupprime', [PerformancePersoController::class, 'supprimeSelected']);
    Route::put('performance/{id}/archiverRestaurer', [PerformancePersoController::class, 'archiverRestaurer']);

    //avoir les details d'une nouveau personnel

    Route::post('/create-newPesonnelEns/{id}', [NewPerfPersoController::class, 'store']);
    Route::get('/get-newPesonnelEns', [NewPerfPersoController::class, 'index']);
    Route::post('/update-newPesonnelEns/{id}', [NewPerfPersoController::class,'update'])->whereNumber('id');
    Route::get('/newPesonnelEns/{id}',[NewPerfPersoController::class,'show']);

    // Conge Personel

    Route::get('/conges',[CongePersoController::class,'index']);
    Route::post('/conges',[CongePersoController::class,'store']);
    Route::get('/conge/{id}',[CongePersoController::class,'show']);
    Route::delete('/conge/{id}',[CongePersoController::class,'destroy']);
    Route::put('conge/{id}/supprimer', [CongePersoController::class, 'supprimer']);
    Route::put('conge/{id}/archiver', [CongePersoController::class, 'archiver']);
    Route::post('/conge/{id}',[CongePersoController::class,'update']);
    Route::post('/conge/see/{id}',[CongePersoController::class,'seeConge']);
    Route::put('conge/element', [CongePersoController::class, 'deleteSelected']);
    Route::put('conge/elementRestaures', [CongePersoController::class, 'restauresSelected']);
    Route::put('conge/elementRestaure', [CongePersoController::class, 'restaureSelected']);
    Route::put('conge/elementSupprime', [CongePersoController::class, 'supprimeSelected']);
    Route::get('congesArchiver', [CongePersoController::class, 'congeArchiver']);
    Route::get('congesSupprimer', [CongePersoController::class, 'congeSupprimer']);
    Route::put('conge/{id}/archiverRestaurer', [CongePersoController::class, 'archiverRestaurer']);

    // Carriere Personnel

    Route::get('/carrieres',[CarrierePersoController::class,'index']);
    Route::post('/carrieres',[CarrierePersoController::class,'store']);
    Route::get('/carriere/{id}',[CarrierePersoController::class,'show']);
    Route::delete('/carriere/{id}',[CarrierePersoController::class,'destroy']);
    Route::put('carriere/{id}/supprimer', [CarrierePersoController::class, 'supprimer']);
    Route::put('carriere/{id}/archiver', [CarrierePersoController::class, 'archiver']);
    Route::post('/carriere/{id}',[CarrierePersoController::class,'update']);
    Route::post('/carriere/see/{id}',[CarrierePersoController::class,'seeCarriere']);
    Route::put('carriere/element', [CarrierePersoController::class, 'deleteSelected']);
    Route::put('carriere/elementRestaures', [CarrierePersoController::class, 'restauresSelected']);
    Route::put('carriere/elementRestaure', [CarrierePersoController::class, 'restaureSelected']);
    Route::put('carriere/elementSupprime', [CarrierePersoController::class, 'supprimeSelected']);
    Route::get('carrieresArchiver', [CarrierePersoController::class, 'carrArchiver']);
    Route::get('carrieresSupprimer', [CarrierePersoController::class, 'carrSupprimer']);
    Route::put('carriere/{id}/archiverRestaurer', [CarrierePersoController::class, 'archiverRestaurer']);

    // Paiement Personnel

    Route::get('/paiementPersos',[PaiementPersoController::class,'index']);
    Route::post('/paiementPersos',[PaiementPersoController::class,'store']);
    Route::get('/paiementPerso/{id}',[PaiementPersoController::class,'show']);
    Route::delete('/paiementPerso/{id}',[PaiementPersoController::class,'destroy']);
    Route::put('paiementPerso/{id}/supprimer', [PaiementPersoController::class, 'supprimer']);
    Route::put('paiementPerso/{id}/archiver', [PaiementPersoController::class, 'archiver']);
    Route::post('/paiementPerso/{id}',[PaiementPersoController::class,'update']);
    Route::post('/paiementPerso/see/{id}',[PaiementPersoController::class,'seePaiementPerso']);
    Route::put('paiementPerso/element', [PaiementPersoController::class, 'deleteSelected']);
    Route::put('paiementPerso/elementRestaures', [PaiementPersoController::class, 'restauresSelected']);
    Route::put('paiementPerso/elementRestaure', [PaiementPersoController::class, 'restaureSelected']);
    Route::put('paiementPerso/elementSupprime', [PaiementPersoController::class, 'supprimeSelected']);
    Route::get('paiementPersosArchiver', [PaiementPersoController::class, 'paieArchiver']);
    Route::get('paiementPersosSupprimer', [PaiementPersoController::class, 'paieSupprimer']);
    Route::put('paiementPerso/{id}/archiverRestaurer', [PaiementPersoController::class, 'archiverRestaurer']);

    //avoir les details d'une nouveau paiement d'un personnel

    // Route::post('/create-newPaiementPerso/{id}', [NewPaiementPersoController::class, 'store']);
    // Route::get('/get-newPaiementPerso', [NewPaiementPersoController::class, 'index']);
    // Route::post('/update-newPaiementPerso/{id}', [NewPaiementPersoController::class,'update'])->whereNumber('id');
    // Route::get('/newPaiementPerso/{id}',[NewPaiementPersoController::class,'show']);

    //Enseignant

    Route::get('/enseignants',[EnseignantController::class,'index']);
    Route::post('/enseignants',[EnseignantController::class,'store']);
    Route::get('/enseignant/{id}',[EnseignantController::class,'show']);
    Route::delete('/enseignant/{id}',[EnseignantController::class,'destroy']);
    Route::put('enseignant/{id}/supprimer', [EnseignantController::class, 'supprimer']);
    Route::put('enseignant/{id}/archiver', [EnseignantController::class, 'archiver']);
    Route::post('/enseignant/{id}',[EnseignantController::class,'update']);
    Route::post('/enseignant/see/{id}',[EnseignantController::class,'seeEnseignant']);
    Route::put('enseignant/element', [EnseignantController::class, 'deleteSelected']);
    Route::put('enseignant/elementRestaures', [EnseignantController::class, 'restauresSelected']);
    Route::put('enseignant/elementRestaure', [EnseignantController::class, 'restaureSelected']);
    Route::put('enseignant/elementSupprime', [EnseignantController::class, 'supprimeSelected']);
    Route::get('penseignantsArchiver', [EnseignantController::class, 'ensArchiver']);
    Route::get('enseignantsSupprimer', [EnseignantController::class, 'ensSupprimer']);
    Route::put('enseignant/{id}/archiverRestaurer', [EnseignantController::class, 'archiverRestaurer']);

    // Fiche cours enseignant

    Route::get('/ficheCours',[FicheCoursEnsController::class,'index']);
    Route::post('/ficheCours',[FicheCoursEnsController::class,'store']);
    Route::get('/ficheCour/{id}',[FicheCoursEnsController::class,'show']);
    Route::delete('/ficheCour/{id}',[FicheCoursEnsController::class,'destroy']);
    Route::put('ficheCour/{id}/supprimer', [FicheCoursEnsController::class, 'supprimer']);
    Route::put('ficheCour/{id}/archiver', [FicheCoursEnsController::class, 'archiver']);
    Route::post('/ficheCour/{id}',[FicheCoursEnsController::class,'update']);
    Route::post('/ficheCour/see/{id}',[FicheCoursEnsController::class,'seeFC']);
    Route::put('ficheCour/element', [FicheCoursEnsController::class, 'deleteSelected']);
    Route::put('ficheCour/elementRestaures', [FicheCoursEnsController::class, 'restauresSelected']);
    Route::put('ficheCour/elementRestaure', [FicheCoursEnsController::class, 'restaureSelected']);
    Route::put('ficheCour/elementSupprime', [FicheCoursEnsController::class, 'supprimeSelected']);
    Route::get('ficheCoursArchiver', [FicheCoursEnsController::class, 'fcArchiver']);
    Route::get('ficheCoursSupprimer', [FicheCoursEnsController::class, 'fcSupprimer']);
    Route::put('ficheCour/{id}/archiverRestaurer', [FicheCoursEnsController::class, 'archiverRestaurer']);

    // performance enseignant

    Route::get('/performancesEns',[PerformanceEnsController::class,'index']);
    Route::post('/performancesEns',[PerformanceEnsController::class,'store']);
    Route::get('/performanceEns/{id}',[PerformanceEnsController::class,'show']);
    Route::delete('/performanceEns/{id}',[PerformanceEnsController::class,'destroy']);
    Route::put('performanceEns/{id}/supprimer', [PerformanceEnsController::class, 'supprimer']);
    Route::put('performanceEns/{id}/archiver', [PerformanceEnsController::class, 'archiver']);
    Route::post('/performanceEns/{id}',[PerformanceEnsController::class,'update']);
    Route::post('/performanceEns/see/{id}',[PerformanceEnsController::class,'seePerformanceEns']);
    Route::put('performanceEns/element', [PerformanceEnsController::class, 'deleteSelected']);
    Route::get('performancesEnsArchiver', [PerformanceEnsController::class, 'perfEnsArchiver']);
    Route::get('performancesEnsSupprimer', [PerformanceEnsController::class, 'perfEnsSupprimer']);
    Route::put('performanceEns/elementRestaures', [PerformanceEnsController::class, 'restauresSelected']);
    Route::put('performanceEns/elementRestaure', [PerformanceEnsController::class, 'restaureSelected']);
    Route::put('performanceEns/elementSupprime', [PerformanceEnsController::class, 'supprimeSelected']);
    Route::put('performanceEns/{id}/archiverRestaurer', [PerformanceEnsController::class, 'archiverRestaurer']);

    //avoir les details d'une nouveau enseignant

    Route::post('/create-newPerformanceEns/{id}', [NewPerfEnsController::class, 'store']);
    Route::get('/get-newPerformanceEns', [NewPerfEnsController::class, 'index']);
    Route::post('/update-newPerformanceEns/{id}', [NewPerfEnsController::class,'update'])->whereNumber('id');
    Route::get('/newPerformanceEns/{id}',[NewPerfEnsController::class,'show']);

    // Paiement enseignant

    Route::get('/paiementEnss',[PaiementEnsController::class,'index']);
    Route::post('/paiementEnss',[PaiementEnsController::class,'store']);
    Route::get('/paiementEns/{id}',[PaiementEnsController::class,'show']);
    Route::delete('/paiementEns/{id}',[PaiementEnsController::class,'destroy']);
    Route::put('paiementEns/{id}/supprimer', [PaiementEnsController::class, 'supprimer']);
    Route::put('paiementEns/{id}/archiver', [PaiementEnsController::class, 'archiver']);
    Route::post('/paiementEns/{id}',[PaiementEnsController::class,'update']);
    Route::post('/paiementEns/see/{id}',[PaiementEnsController::class,'seePaiementEns']);
    Route::put('paiementEns/element', [PaiementEnsController::class, 'deleteSelected']);
    Route::put('paiementEns/elementRestaures', [PaiementEnsController::class, 'restauresSelected']);
    Route::put('paiementEns/elementRestaure', [PaiementEnsController::class, 'restaureSelected']);
    Route::put('paiementEns/elementSupprime', [PaiementEnsController::class, 'supprimeSelected']);
    Route::get('paiementEnssArchiver', [PaiementEnsController::class, 'paieEnsArchiver']);
    Route::get('paiementEnssSupprimer', [PaiementEnsController::class, 'paieEnsSupprimer']);
    Route::put('paiementEns/{id}/archiverRestaurer', [PaiementEnsController::class, 'archiverRestaurer']);

    //avoir les details d'une nouveau enseignant

    Route::post('/create-newPaiementEns/{id}', [NewPaiementEnsController::class, 'store']);
    Route::get('/get-newPaiementEns', [NewPaiementEnsController::class, 'index']);
    Route::post('/update-newPaiementEns/{id}', [NewPaiementEnsController::class,'update'])->whereNumber('id');
    Route::get('/newPaiementEns/{id}',[NewPaiementEnsController::class,'show']);

    // Conge enseignant

    Route::get('/congeEnss',[CongeEnsController::class,'index']);
    Route::post('/congeEnss',[CongeEnsController::class,'store']);
    Route::get('/congeEns/{id}',[CongeEnsController::class,'show']);
    Route::delete('/congeEns/{id}',[CongeEnsController::class,'destroy']);
    Route::put('congeEns/{id}/supprimer', [CongeEnsController::class, 'supprimer']);
    Route::put('congeEns/{id}/archiver', [CongeEnsController::class, 'archiver']);
    Route::post('/congeEns/{id}',[CongeEnsController::class,'update']);
    Route::post('/congeEns/see/{id}',[CongeEnsController::class,'seeCongeEns']);
    Route::put('congeEns/element', [CongeEnsController::class, 'deleteSelected']);
    Route::put('congeEns/elementRestaures', [CongeEnsController::class, 'restauresSelected']);
    Route::put('congeEns/elementRestaure', [CongeEnsController::class, 'restaureSelected']);
    Route::put('congeEns/elementSupprime', [CongeEnsController::class, 'supprimeSelected']);
    Route::get('congeEnssArchiver', [CongeEnsController::class, 'congeEnsArchiver']);
    Route::get('congeEnssSupprimer', [CongeEnsController::class, 'congeEnsSupprimer']);
    Route::put('congeEns/{id}/archiverRestaurer', [CongeEnsController::class, 'archiverRestaurer']);

    // Carriere enseignant

    Route::get('/carriereEnss',[CarriereEnsController::class,'index']);
    Route::post('/carriereEnss',[CarriereEnsController::class,'store']);
    Route::get('/carriereEns/{id}',[CarriereEnsController::class,'show']);
    Route::delete('/carriereEns/{id}',[CarriereEnsController::class,'destroy']);
    Route::put('carriereEns/{id}/supprimer', [CarriereEnsController::class, 'supprimer']);
    Route::put('carriereEns/{id}/archiver', [CarriereEnsController::class, 'archiver']);
    Route::post('/carriereEns/{id}',[CarriereEnsController::class,'update']);
    Route::post('/carriereEns/see/{id}',[CarriereEnsController::class,'seeCarriereEns']);
    Route::put('carriereEns/element', [CarriereEnsController::class, 'deleteSelected']);
    Route::put('carriereEns/elementRestaures', [CarriereEnsController::class, 'restauresSelected']);
    Route::put('carriereEns/elementRestaure', [CarriereEnsController::class, 'restaureSelected']);
    Route::put('carriereEns/elementSupprime', [CarriereEnsController::class, 'supprimeSelected']);
    Route::get('carriereEnssArchiver', [CarriereEnsController::class, 'carrEnsArchiver']);
    Route::get('carriereEnssSupprimer', [CarriereEnsController::class, 'carrEnsSupprimer']);
    Route::put('carriereEns/{id}/archiverRestaurer', [CarriereEnsController::class, 'archiverRestaurer']);

    // Gestion des Notes

    // routes/api.php
    Route::get('/get-note', [NoteController::class, 'index']);
    Route::post('/note', [NoteController::class,'store']);


    Route::get('/edit_note/{id}', [NoteController::class, 'edit']); //recuperer les infos d'une note avant de les modifier
    Route::put('/edit_note/{id}', [NoteController::class, 'update'])->whereNumber('id'); //modifier un etudiant

    Route::delete('/force-delete_note/{id}', [NoteController::class, 'destroy'])->whereNumber('id'); //supprimer une note

    //route pour mettre une note dans la corbeille
    Route::get('/get_note-corbeille', [NoteController::class, 'AfficherLesNotesDansLaCorbeille']);
    Route::delete('/delete_note/{id}/corbeille', [NoteController::class, 'MettreDansLaCorbeille'])->whereNumber('id');

    //restaurer un etudiant de la corbeille
    Route::put('/restore_note/{id}/corbeille', [NoteController::class, 'RestaurerNotetDansLaCorbeille'])->whereNumber('id');
    //archiver un etudiant
    Route::get('/get_note-archives', [NoteController::class, 'AfficherLesNotesArchivés']); //avoir tous les etudiants archives

    Route::put('/archive_note/{id}', [NoteController::class, 'archive']); //pour archiver un etudiant

    Route::put('/restore_note/{id}/archivé', [NoteController::class, 'RestaurerNoteArchivé'])->whereNumber('id'); //restaurer un etudiant archivé

    //supprimer un etudiant quand on a selectionne
    Route::post('/element_note', [NoteController::class, 'deleteSelected']);

    //Pour avoir les etudiants, la filiere et le cours dans notes

    Route::get('/GetEtudiantsAndFiliereAndCours', [NoteController::class, 'GetEtudiantsAndFiliere']);

    //routes pour le dashboard des etudiants

    Route::get('/etudiant_Inscrit_Par_Mois', [EtudiantController::class, 'studentsPerMonth']);
    Route::get('/effectif_filiere_enPourcentage', [EtudiantController::class, 'effectif_filiere_enPourcentage']);
    Route::get('/getEtudByForm', [EtudiantController::class, 'etudiantsParFiliere']); //pour avoir les etudiants par filiere

    Route::get('/absence_Par_Mois', [AbscenceController::class, 'absencePerMonth']);
    Route::get('/absence_filiere_enPourcentage', [AbscenceController::class, 'absence_filiere_enPourcentage']);
    Route::get('/getAbscByForm', [AbscenceController::class, 'absenceParFiliere']); //pour avoir les etudiants par filiere

    // Top 5 des meileurs et faibles etudiants

    Route::get('/top_Students', [ConduiteController::class, 'TopEtudiants']);
    Route::get('/NbreFiliere', [EtudiantController::class, 'NbreFiliere']);

    //Dashboard Facturation

    Route::get('/paiement_Inscrit_Par_Mois', [PaiementController::class, 'PaiementsPerMonth']);
    Route::get('/getScolariteByForm', [FactureController::class, 'ScolariteParFiliere']); //pour avoir les etudiants par filiere
    Route::get('/revenu_filiere', [FactureController::class, 'scolarite_filiere']);

// });

//Authentification

// Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/check-email', [AuthController::class, 'VerifierExistenceDeEmail']);

// Route::middleware('auth:sanctum')->group(function (){
//     Route::get('/user', [AuthController::class, 'user']);
// });



// // Route::post('/logout', [AuthController::class, 'logout']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/check-email', [AuthController::class, 'VerifierExistenceDeEmail']);

// Route::middleware('auth:sanctum')->group(function (){
    Route::get('/user/{id}', [AuthController::class, 'user']);
// });



//Gestion des depenses

// *** Gestion des Categories

Route::get('/categorieDepense', [CategorieDepenseController::class, 'create']);

Route::post('/categorieDepense', [CategorieDepenseController::class, 'store']);

Route::get('/edit-cat/{id}', [CategorieDepenseController::class, 'show']); //recuperer les infos d'un categorie avant de les modifier
Route::put('/edit-cat/{id}', [CategorieDepenseController::class, 'update']); //modifier un categorie

Route::delete('/force-delete-cat/{id}', [CategorieDepenseController::class, 'destroy']);

//supprimer un paiement quand on a selectionne
Route::post('/element-cat', [CategorieDepenseController::class, 'deleteSelected']);



//Gestion du Budget(sortie)

Route::get('/budget', [DepenseSortieController::class, 'index']);
Route::post('/budget', [DepenseSortieController::class, 'store']);

//Details d'un etudiant
Route::get('/get-budget/{id}', [DepenseSortieController::class, 'DetailsBudget']);

Route::put('/update-budget/{id}', [DepenseSortieController::class, 'update']);

Route::post('/boutonsRepeter', [DepenseSortieController::class, 'GoodperformTask']);
// Route::post('/create-budget', [DepenseSortieController::class, 'store']);


//Gestion des transactions


Route::get('/transaction', [DepenseEntreeController::class, 'index']);
Route::post('/transaction', [DepenseEntreeController::class, 'store']);
