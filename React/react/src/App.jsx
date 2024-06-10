import React, { createContext, useState, useEffect } from 'react';
import {Link, BrowserRouter, Routes, Route} from 'react-router-dom'
import Acceil from "./Acceil.jsx";
import EtudAbsc from "./pages/absence/EtudAbsc.jsx";
import VoirAbscence from "./pages/absence/VoirAbscence.jsx";
import AbscsnceArchive from "./pages/absence/AbscsnceArchive.jsx";
import AbscenceSupprimer from "./pages/absence/AbscenceSupprimer.jsx";
import ChoixFormFicheAbsence from './pages/absence/ChoixFormFicheAbsence.jsx';
import FicheAbsence from './pages/absence/FicheAbsence.jsx';
import DetailsAbsenceEtudiant from './pages/absence/DetailsAbsenceEtudiant.jsx';

import StageSupprimer from "./pages/stage/StageSupprimer.jsx";
import StageArchive from "./pages/stage/StageArchive.jsx";
import Stage from "./pages/stage/Stage.jsx";

import FactSupprimer from "./pages/facturation/FactSupprimer.jsx";
import FactArchive from "./pages/facturation/FactArchive.jsx";
import Fact from "./pages/facturation/Fact.jsx";
import VoirFacture from "./pages/facturation/VoirFacture.jsx";
import RegistreFact from './pages/facturation/RegistreFact.jsx';
import DetailsRegistreFact from './pages/facturation/DetailsRegistreFact.jsx';
import ChoixFormFact from "./pages/facturation/ChoixFormFact.jsx";
import DashboardFact from "./pages/dashboard/DashboardFact.jsx";

import Rembourssement from "./pages/rembourssement/Rembourssement.jsx";
import RembourssementSupprimer from "./pages/rembourssement/RembourssementSupprimer.jsx";
import RemboussementBrouillon from "./pages/rembourssement/RemboussementBrouillon.jsx";

import CreerPaiement from "./pages/paiement/CreerPaiement.jsx";
import PaiementsArchives from "./pages/paiement/PaiementsArchives.jsx";
import CorbeillePaiement from "./pages/paiement/CorbeillePaiement.jsx";
import EtudDashboard from "./pages/dashboard/EtudDashboard.jsx";
import EtudInscription from "./pages/etudiant/EtudInscription.jsx";
import EtudiantsArchives from "./pages/etudiant/EtudiantsArchives.jsx";
import CorbeilleEtud from "./pages/etudiant/CorbeilleEtud.jsx";
import DetailsEtudiant from "./pages/etudiant/DetailsEtudiant.jsx";
import Login from "./pages/connexion/Login.jsx";
import Register from "./pages/connexion/Register.jsx";
import Profil from "./pages/connexion/Profil.jsx";
import Error from "./pages/Error.jsx";
import Conduite from "./pages/conduite/Conduite.jsx";
import VoirConduite from "./pages/conduite/VoirConduite.jsx";
import ConduiteArchive from "./pages/conduite/ConduiteArchive.jsx";
import ConduiteSupprimer from "./pages/conduite/ConduiteSupprimer.jsx";
import CreateForm from "./pages/formation/CreateForm.jsx";
import FormArchiver from "./pages/formation/FormArchiver.jsx";
import CorbeilleForm from "./pages/formation/CorbeilleForm.jsx";
import EmploiDuTemps from "./pages/emploiDuTemps/EmploiDuTemps.jsx";
import ChoixForm from "./pages/emploiDuTemps/ChoixForm.jsx";
import Personnel from "./pages/personnel/Personnel.jsx";
import VoirPersonnel from "./pages/personnel/VoirPersonnel.jsx";
import PersonnelArchive from "./pages/personnel/PersonnelArchive.jsx";
import PersonnelSupprimer from "./pages/personnel/PersonnelSupprimer.jsx";
import FicheTravail from "./pages/fichetravail/FicheTravail.jsx";
import VoirFicheTravail from "./pages/fichetravail/VoirFicheTravail.jsx";
import FicheTravailArchive from "./pages/fichetravail/FicheTravailArchive.jsx";
import FicheTravailSupprimer from "./pages/fichetravail/FicheTravailSupprimer.jsx";
import Performance from "./pages/performance/Performance.jsx";
import VoirPerformance from "./pages/performance/VoirPerformance.jsx";
import Examen from "./pages/examen/Examen.jsx";
import PlaningGlobal from "./pages/planningGlobal/PlaningGlobal.jsx";
import ChoixFormExamen from "./pages/examen/ChoixFormExamen.jsx";
import PerformanceSupprimer from "./pages/performance/PerformanceSupprimer.jsx";
import PerformanceArchive from "./pages/performance/PerformanceArchive.jsx";
import Conge from "./pages/conge/Conge.jsx";
import ArchiveConge from "./pages/conge/ArchiveConge.jsx";
import CorbeilleConge from "./pages/conge/CorbeilleConge.jsx";
import CorbeilleCarriere from "./pages/carriere/CorbeilleCarriere.jsx";
import ArchiveCarriere from "./pages/carriere/ArchiveCarriere.jsx";
import Crarriere from "./pages/carriere/Crarriere.jsx";
import PaiementPersonnel from "./pages/paiementPersonnel/PaiementPersonnel.jsx";
import VoirPaiementPerso from "./pages/paiementPersonnel/VoirPaiementPerso.jsx";
import ArchivePaiementPerso from "./pages/paiementPersonnel/ArchivePaiementPerso.jsx";
import CorbeillePaiementPerso from "./pages/paiementPersonnel/CorbeillePaiementPerso.jsx";
import Persos from "./pages/personnel/Persos.jsx";
import Enseignant from "./pages/enseignant/Enseignant.jsx";
import VoirEnseignant from "./pages/enseignant/VoirEnseignant.jsx";
import ArchiveEnseignant from "./pages/enseignant/ArchiveEnseignant.jsx";
import CorbeilleEnseignant from "./pages/enseignant/CorbeilleEnseignant.jsx";
import FicheCoursEnseignant from "./pages/ficheCours/FicheCoursEnseignant.jsx";
import VoirFicheCourEns from "./pages/ficheCours/VoirFicheCourEns.jsx";
import ArchiveFicheCours from "./pages/ficheCours/ArchiveFicheCours.jsx";
import CorbeilleFicheCours from "./pages/ficheCours/CorbeilleFicheCours.jsx";
import PerformanceEns from "./pages/performanceEns/PerformanceEns.jsx";
import VoirPerformanceEns from "./pages/performanceEns/VoirPerformanceEns.jsx";
import ArchiveEns from "./pages/performanceEns/ArchiveEns.jsx";
import CongeEns from "./pages/congeEns/CongeEns.jsx";
import CorbeilleEns from "./pages/congeEns/CorbeilleEns.jsx";
import ArchiveCongeEns from "./pages/congeEns/ArchiveCongeEns.jsx";
import CrarriereEns from "./pages/carriereEns/CrarriereEns.jsx";
import ArchiveCarriereEns from "./pages/carriereEns/ArchiveCarriereEns.jsx";
import CorbeilleCarriereEns from "./pages/carriereEns/CorbeilleCarriereEns.jsx";
import PaiementEns from "./pages/paiementEns/PaiementEns.jsx";
import VoirPaiementEns from "./pages/paiementEns/VoirPaiementEns.jsx";
import ArchivePaiementEns from "./pages/paiementEns/ArchivePaiementEns.jsx";
import CorbeillePaiementEns from "./pages/paiementEns/CorbeillePaiementEns.jsx";
import { SidebarProvider } from './component/SidebarContext.jsx';
import HeaderGeneral from "./component/HeaderGeneral.jsx";
import BarreLateraleForm from "./component/BarreLateraleForm.jsx"
import Note from './pages/note/Note.jsx'
import NoteArchviees from './pages/note/NoteArchviees.jsx'
import NoteCorbeille from './pages/note/NoteCorbeille.jsx'
import DashboardForm from "./pages/dashboard/DashboardForm.jsx";
import DashboardPerso from "./pages/dashboard/DashboardPerso.jsx";
import DashboardEns from "./pages/dashboard/DashboardEns.jsx";
import DashboardGeneral from "./pages/dashboard/DashboardGeneral.jsx";
import Sortie from './pages/dépense/Sorties/Sortie.jsx';
import Catégorie from './pages/dépense/Catégorie/Catégorie.jsx';
import CorbeilleCours from './pages/cours/CorbeilleCours.jsx';
import ArchiveCours from './pages/cours/ArchiveCours.jsx';
import DetailsBudget from './pages/dépense/Sorties/DetailsBudget.jsx';
import DashboardDepense from './pages/dépense/DashboardDepense.jsx';
import Transaction from './pages/dépense/Transaction.jsx';
import Cours from './pages/cours/Cours.jsx';
import ListeEtudByFiliere from './pages/etudiant/ListeEtudByFiliere.jsx';
import DetailsEtudiantsParFiliere from './pages/etudiant/DetailsEtudiantsParFiliere.jsx';
import DetailsPaiement from './pages/facturation/DetailsPaiement.jsx'
import StageFiliere from './pages/stage/StageFiliere.jsx';
import DetailsStageEtudiant from './pages/stage/DetailsStageEtudiant.jsx';
import ChoixFormStage from "./pages/stage/ChoixFormStage.jsx";
export const USER = createContext();

const USER_TYPES = {
    PUBLIC: 'Public User',
    NORMAL_USER: 'Normal User',
    ADMIN_USER: 'Admin User',
};

const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER;
function Perso() {
    return null;
}

const App = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || []);

    const [token, settoken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        console.log(localStorage.setItem('user',JSON.stringify(user)))
        console.log(token)
    }, [user])

    return (
       <USER.Provider value={[user, setUser, token, settoken]}>

           <BrowserRouter>
               <Routes>
                   <Route path='/' element={<Acceil />} />

                   {/* Gestion des Etudiantss */}

                   <Route path='/etud/dash' element={<EtudDashboard />} />
                   <Route path='/etud/inscription' element={<EtudInscription />} />
                   <Route path='/etud/listeEtud' element={<ListeEtudByFiliere />} />
                   <Route path='/etud/detailslisteEtud/:nomform' element={<DetailsEtudiantsParFiliere />} />
                   <Route path='/etud/archive' element={<EtudiantsArchives />} />
                   <Route path='/etud/corbeille' element={<CorbeilleEtud />} />
                   <Route path='/etud/details/:id' element={<DetailsEtudiant />} />

                   {/* Gestion des Formations */}

                   <Route path='/form' element={< CreateForm/>} />
                   <Route path='/form/archive' element={<FormArchiver />} />
                   <Route path='/form/corbeille' element={<CorbeilleForm />} />
                   <Route path='/emploiTemps/:nomForm' element={<EmploiDuTemps />} />
                   <Route path='/examen/:nomForm' element={<Examen />} />
                   <Route path='/planingGlobal' element={<PlaningGlobal />} />
                   <Route path='/choix_formation_Examen' element={<ChoixFormExamen />} />
                   <Route path='/choix_formation' element={<ChoixForm />} />
                   <Route path='/dashboard_form' element={<DashboardForm />} />

                   {/* Gestion Des Notes */}
                   <Route path='/note' element={<Note />} />
                   <Route path='/note_archive' element={<NoteArchviees />} />
                   <Route path='/note_corbeille' element={<NoteCorbeille />} />

                   {/* Gestion des Absences */}

                   <Route path='/etud/abscence' element={<EtudAbsc />} />
                   <Route path='/etud/voir_abscence/:id' element={<VoirAbscence />} />
                   <Route path='/abscence_archiver' element={< AbscsnceArchive/>} />
                   <Route path='/abscence_supprimer' element={< AbscenceSupprimer/>} />
                   <Route path='/choix_formation_fiche_absence' element={< ChoixFormFicheAbsence/>} />
                    <Route path='/fiche_absence/:nomForm' element={< FicheAbsence/>} />
                    <Route path='/abs/voir_fiche_abscence/:id' element={<VoirAbscence />} />
                    <Route path='/abs/detail_abscence_etudiant/:id' element={<DetailsAbsenceEtudiant />} />

                   {/* Gestion des Stages */}

                   <Route path='/stage' element={< Stage/>} />
                   <Route path='/stage_supprimer' element={< StageSupprimer/>} />
                   <Route path='/stage_archiver' element={< StageArchive/>} />
                   <Route path='/choix_formation_stage' element={< ChoixFormStage/>} />
                    <Route path='/stage_formation/:nomForm' element={< StageFiliere/>} />
                    <Route path='/abs/detail_stage_etudiant/:id' element={<DetailsStageEtudiant />} />

                   {/* Gestion des Facturations */}

                   <Route path='/fact' element={< Fact/>} />
                   <Route path='/fact/fact_supprimer' element={< FactSupprimer/>} />
                   <Route path='/fact/fact_archiver' element={< FactArchive/>} />
                   <Route path='/fact/voir_facture/:id/formation/:nomForm' element={< VoirFacture/>} />        
                   <Route path='/fact/choix_formation_facture' element={< ChoixFormFact/>} />
                   <Route path='/fact/registre_facture/:nomForm' element={< RegistreFact/>} />
                   <Route path='/fact/detail_facture/:id' element={<DetailsRegistreFact />} />
                   <Route path='/fact/detail_paiement/:id/formation/:nomForm' element={< DetailsPaiement/>} />                     
                   <Route path='/fact/dash' element={< DashboardFact/>} />

                   {/* Gestion des Rembourssements */}

                   <Route path='/rembour' element={< Rembourssement/>} />
                   <Route path='/rembour/rembour_supprimer' element={< RembourssementSupprimer/>} />
                   <Route path='/rembour/rembour_archiver' element={< RemboussementBrouillon/>} />
                   <Route path='/rembour/rembour/voir_rembourssement/:id' element={< VoirFacture/>} />

                   {/* Gestion Des Paiements */}

                   <Route path='/fact/paie' element={< CreerPaiement/>} />
                   <Route path='/fact/paie_archiver' element={< PaiementsArchives/>} />
                   <Route path='/fact/paie_corbeille' element={< CorbeillePaiement/>} />

                   {/* Gestion des conduites */}

                   <Route path='/conduite' element={<Conduite />} />
                   <Route path='/conduite/voir_conduite/:id' element={<VoirConduite />} />
                   <Route path='/conduite_archiver' element={< ConduiteArchive/>} />
                   <Route path='/conduite_supprimer' element={< ConduiteSupprimer/>} />

                   {/* Gestion du personnel */}

                   <Route path='/recrutement_personnel' element={<Persos />} />
                   <Route path='/personnel/voir_personnel/:id' element={<VoirPersonnel />} />
                   <Route path='/personnel_archiver' element={< PersonnelArchive/>} />
                   <Route path='/personnel_supprimer' element={< PersonnelSupprimer/>} />
                   <Route path='/dashboard_perso' element={< DashboardPerso/>} />

                   {/* Gestion du fiche de travail */}

                   <Route path='/personnel/fiche_travail' element={<FicheTravail />} />
                   <Route path='/personnel/voir_fiche_travail/:id' element={<VoirFicheTravail />} />
                   <Route path='/fiche_travail_archiver' element={< FicheTravailArchive/>} />
                   <Route path='/fiche_travail_supprimer' element={< FicheTravailSupprimer/>} />

                   {/* Gestion des performances */}

                   <Route path='/performance' element={<Performance />} />
                   <Route path='/performance/voir_performance/:id' element={<VoirPerformance />} />
                   <Route path='/performance_archiver' element={< PerformanceArchive/>} />
                   <Route path='/performance_supprimer' element={< PerformanceSupprimer/>} />

                   {/* Gestion des conges personnel */}

                   <Route path='/conge' element={<Conge />} />
                   <Route path='/conge_archiver' element={< ArchiveConge/>} />
                   <Route path='/conge_supprimer' element={< CorbeilleConge/>} />

                   {/* Gestion des carrieres personnel */}

                   <Route path='/carriere' element={<Crarriere />} />
                   <Route path='/carriere_archiver' element={< ArchiveCarriere/>} />
                   <Route path='/carriere_supprimer' element={< CorbeilleCarriere/>} />

                   {/* Gestion des paiements personnel */}

                   <Route path='/paiement_personnel' element={<PaiementPersonnel />} />
                   <Route path='/paiement_personnel/voir_paiement_personnel/:id' element={<VoirPaiementPerso />} />
                   <Route path='/paiement_personnel_archiver' element={< ArchivePaiementPerso/>} />
                   <Route path='/paiement_personnel_supprimer' element={< CorbeillePaiementPerso/>} />

                   {/* Gestion  enseignant */}

                   <Route path='/recrutement_enseignant' element={<Enseignant />} />
                   <Route path='/enseignant/voir_enseignant/:id' element={<VoirEnseignant />} />
                   <Route path='/enseignant_archiver' element={< ArchiveEnseignant/>} />
                   <Route path='/enseignant_supprimer' element={< CorbeilleEnseignant/>} />
                   <Route path='/dashboard_ens' element={< DashboardEns/>} />

                   {/* Gestion du fiche de cours */}

                   <Route path='/enseignant/fiche_cours' element={<FicheCoursEnseignant />} />
                   <Route path='/enseignant/voir_fiche_cours/:id' element={<VoirFicheCourEns />} />
                   <Route path='/fiche_cours_archiver' element={< ArchiveFicheCours/>} />
                   <Route path='/fiche_cours_supprimer' element={< CorbeilleFicheCours/>} />

                   {/* Gestion des performances */}

                   <Route path='/performance_enseignant' element={<PerformanceEns/>} />
                   <Route path='/performance_enseignant/voir_performance/:id' element={<VoirPerformanceEns />} />
                   <Route path='/enseignant/performance_archiver' element={< ArchiveEns/>} />
                   <Route path='/enseignant/performance_supprimer' element={< CorbeilleEns/>} />

                   {/* Gestion des conges enseignant */}

                   <Route path='/conge_enseignant' element={<CongeEns />} />
                   <Route path='/enseignant/conge_archiver' element={< ArchiveCongeEns/>} />
                   <Route path='/enseignant/conge_supprimer' element={< CorbeilleEns/>} />

                   {/* Gestion des carrieres enseignant */}

                   <Route path='/carriere_enseignant' element={<CrarriereEns />} />
                   <Route path='/enseignant/carriere_archiver' element={< ArchiveCarriereEns/>} />
                   <Route path='/enseignant/carriere_supprimer' element={< CorbeilleCarriereEns/>} />

                   {/* Gestion des paiements enseignant */}

                   <Route path='/paiement_enseignant' element={<PaiementEns />} />
                   <Route path='/enseignant/voir_paiement/:id' element={<VoirPaiementEns />} />
                   <Route path='/paiement_enseignant_archiver' element={< ArchivePaiementEns/>} />
                   <Route path='/paiement_enseignant_supprimer' element={< CorbeillePaiementEns/>} />


                   {/* Gestion des cours */}

                   <Route path='/cours' element={<Cours />} />
                    <Route path='/cours_archive' element={<ArchiveCours />} />
                    <Route path='/cours_corbeille' element={<CorbeilleCours />} />


                    {/* Gestion Des Depenses */}


                    <Route path='/depense/Catégorie' element={<Catégorie />} />


                    {/* <Route path='/depense/dashboard' element={<DashboardDepense />} /> */}
                    <Route path='/depense/transaction' element={<Transaction />} />


                    <Route path='/depense/sortie' element={<Sortie />} />
                    <Route path='/details-Budget/:id' element={<DetailsBudget />} />



                   {/* Dashboard général */}

                   <Route path='/dashboard_general' element={< DashboardGeneral/>} />

                   {/* Connexion */}
                   <Route path='/login' element={< Login/>} />
                   <Route path='/register' element={< Register/>} />
                   <Route path='/profil' element={< Profil/>} />

                   <Route path='*' element={<Error />} />

               </Routes>
           </BrowserRouter>
       </USER.Provider>

    );
};

export default App;