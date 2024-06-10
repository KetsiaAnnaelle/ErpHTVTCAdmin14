import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate,NavLink } from "react-router-dom";
import { Container, Row, Col, ListGroup, Breadcrumb, Card,Button} from "react-bootstrap";
import axios from "axios";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import.meta.env.VITE_URL;
import.meta.env.VITE_URL_Image;

const CreateEtudiantPdf = ({ etud }) => {

    const createdDate = new Date(etud.created_at);
    const formatdate = createdDate.toLocaleDateString();

    const ImageURL = `${import.meta.env.VITE_URL_Image}/uploadImage/${etud.profil}`
    console.log(ImageURL);

    console.log(etud);
    // Créez un style pour vos éléments PDF
    const styles = StyleSheet.create({
        page: {
            flex:1,
            flexDirection:'column',
            padding:20,
            justifyContent:'space-between',
            backgroundColor:'whitesmoke'
        },
        container: {
            flexDirection: 'row',
            justifyContent:"center",
            // backgroundColor:'whitesmoke'
        },
        content: {
            flex:1,
            flexDirection:'column',
            justifyContent:"center"
        },
        contents: {
            flex:1,
            flexDirection:'row',
            justifyContent:"space-between",
            alignContent:'space-around',
            marginTop:100
        },
        marge: {
            marginBottom:10
        },
        padding: {
            padding:5
        },
        title: {
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 25,
            marginTop: 10,
            color:'blue',
            fontWeight:'10px'
        },
        info: {
            fontSize: 12,
            marginBottom: 5,
            // flex: 1,
            // borderBottom: '2px solid #0D6EFD',
            // padding: 4,
            // fontSize:'12'
        },
        bold: {
            fontWeight: 'bold',
            fontSize:12,
            color:'red',

            // backgroundColor:"white",
            // borderRadius:'10px',
            // padding:"10px 10px",
        },
        bolds: {
            fontSize:12,
        },
        logo: {
            width: 80,
            height: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
        },

        image: {
            width:'80px',
            borderRadius:'50%'
        },

        card: {
            backgroundColor:"white",
            borderRadius:'10px',
            padding:"10px 10px",
            // flexDirection: 'row',
            marginBottom:'10px',
            // height:'auto',
            // justifyContent:'flex-start'
        },

        

    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.container}>
                    <Image src="/assets/img/logo.png" style={styles.logo} />
                    <Image source ={ImageURL} style={styles.image}/>

                    <View style={styles.card}>
                        <View style={styles.marge}>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>HIGH TECH VOCATIONAL TRAINING CENTER</Text>
                            </Text>
                        <View style={styles.card}>
                            <Text style={styles.info}>
                                <Text style={styles.bolds}>{etud.nomEtud + ' ' + etud.prenomEtud}</Text>
                            </Text>

                            <Text style={styles.info}>
                                Filière: <Text style={styles.bold}>{(etud.formation && etud.formation.nomForm)}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>Douala</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>Cameroun</Text>
                            </Text>
                        </View>
                            <Text style={styles.info}>
                                Tél: <Text>+237690889086</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text>infos@highteccentre.com</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text>https://highteccentre.com</Text>
                            </Text>
                        </View>

                    </View>
                </View>

                <View style={styles}>
                    <Text style={styles.title}>Informations Personnelles sur l'étudiant du {formatdate}</Text>


                    <div className="row mb-3">
                        <div className="col-md-4 col-lg-9">


                            <View style={styles.card}>
                                <h4 className="fw-bold text-primary">Informations Personnelles</h4>
                                <Text style={styles.info}>
                                    Noms de l'étudiant: <Text style={styles.bolds}>{etud.nomEtud + ' ' + etud.prenomEtud}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Sexe de l'etudiant: <Text style={styles.bolds}>{(etud.sexe)}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Date et Lieu De Naissance : <Text style={styles.bolds}>{etud.birthday}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Niveau D'Etudes : <Text style={styles.bolds}>{etud.niveau}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Ville : <Text style={styles.bolds}>{etud.ville}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Pays: <Text style={styles.bolds}>{etud.pays}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Téléphone :<Text style={styles.bolds}>{etud.telEtud}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Filière: <Text style={styles.bolds}>{(etud.formation && etud.formation.nomForm)}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Dernier Diplome: <Text style={styles.bolds}>{etud.diplome}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Nom du tuteur: <Text style={styles.bolds}>{etud.nomTuteur}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Téléphone du Tuteur: <Text style={styles.bolds}>{etud.telTuteur}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Motivation: <Text style={styles.bolds}>{etud.motivation}</Text>
                                </Text>

                                <Text style={styles.info}>
                                    Découverte Du Centre: <Text style={styles.bolds}>{etud.decouverte}</Text>
                                </Text>
                            </View>

                          
                        </div>

                        
                        
                    </div>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Informations sur les absences de l'étudiant</Text>
                        {
                            etud.absence ==0 ?
                            
                            <Text style={styles.info}>
                               PAS D'ABSENCES 
                            </Text>

                            :

                                etud.absence && etud.absence.map((element,index)=>{
                                    console.log(etud);
                                    return(
                                        
                                        <>
                                            <Text style={styles.info}>
                                                Nom du cours : {element.cour_id || element.cour.nomCours}
                                            </Text>

                                            <Text style={styles.info}>
                                                Date du Cours : {etud.absence && element.dateAbs}
                                            </Text>

                                            <Text style={styles.info}>
                                                Nombre d'heure d'absence : {etud.absence && element.nbreHeureAbs}
                                            </Text>

                                            <Text style={styles.info}>
                                                Type d'absence : {etud.absence && element.typeAbs}
                                            </Text>

                                            <Text style={styles.info}>
                                                Motif : {etud.absence && element.motifAbs}
                                            </Text>
                                        </>
                                    )
                                })
                        }
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Historique de Paiement</Text>
                    {
                        etud.paiement==0 ?
                        <Text style={styles.info}>
                            PAS DE PAIEMENT
                        </Text>
                        :

                        etud.paiement && etud.paiement.map((element,index)=>{
                            const createdDatePaie = new Date(element.created_at);
                            const formatdatePaie = createdDatePaie.toLocaleDateString();
                            return(

                                <>
                                    <Text style={styles.info}>
                                        Date Du Paiement : {etud.paiement && formatdatePaie}
                                    </Text>

                                    <Text style={styles.info}>
                                        Montant : {etud.paiement && element.MontantPaiement} FCFA
                                    </Text>

                                    <Text style={styles.info}>
                                        Moyen de Paiement : {etud.paiement && element.MoyenPaiement}
                                    </Text>

                                    <Text style={styles.info}>
                                        Motif : {etud.paiement && element.MotifPaiement}
                                    </Text> 

                                    <Text style={styles.info}>
                                        Prochain Paiement : {etud.paiement && element.ProchainPaiement}
                                    </Text>
                                </>
                            )
                        })
                        
                        
                    }
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Conduite</Text>
                    {
                        etud.conduite==0 ?
                        <Text style={styles.info}>
                           Pas Encore Evalué
                        </Text>
                        :

                        etud.conduite && etud.conduite.map((element,index)=>{
                            return(

                                <>
                                    <Text style={styles.info}>
                                        Note de la conduite : {etud.conduite && element.notecond}/20
                                    </Text>

                                    <Text style={styles.info}>
                                        Niveau d'assiduité : {etud.conduite && element.assuidCond}
                                    </Text>

                                    <Text style={styles.info}>
                                        Niveau de Compréhension : {etud.conduite && element.comprCond}
                                    </Text>

                                    <Text style={styles.info}>
                                        Travail Personnel : {etud.conduite && element.travailPersoCond}
                                    </Text> 

                                    <Text style={styles.info}>
                                        Avis du Formateur : {etud.conduite && element.avisFormcond}
                                    </Text>

                                </>
                            )
                        })
                        
                        
                    }
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Conduite</Text>
                    {
                        etud.note ==0?
                        <Text style={styles.info}>
                           PAS DE NOTE
                        </Text>
                        :

                        etud.note && etud.note.map((element,index)=>{
                            return(

                                <>
                                    <Text style={styles.info} key={index}>
                                        Note de la conduite : {etud.note && element.valeur}/20
                                    </Text>
                                </>
                            )
                        })
                        
                        
                    }
                </View>

                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>INFORMATIONS SUR</Text>
                        <Text style={styles.bold}>L'ABSCENCE</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>Ce document est imprimé</Text>
                        <Text style={styles.bold}> pour chaque abscence</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const DetailsEtudiant = () => {

    const [fresh, setfresh] = useState(false)
    const [abs, setabs] = useState([])
    const [load, setload] = useState(false)
    const [allstud, setallstud] = useState([])
    const [paie, setpaie] = useState([])

    const {id}=useParams()
    const history = useNavigate()

    const createdDate = new Date(allstud.created_at);
    const formatdate = createdDate.toLocaleDateString();

    

    async function getEtudiants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-etudiant/${id}`);
            setallstud(response.data);
            console.log(response.data);
        } catch (error) {
            // console.log(error);
            console.log('echec');
        }
    }

    useEffect(() => {
        if (!load===true){
            getEtudiants()
        }
    },[fresh])

    const [activeTab, setActiveTab] = useState('profile-edit');

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    

    // console.log(allstud.absence.map((element,index) =>{
    //     element.dateAbs
    // }))

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col className='d-md-none d-lg-block'>
                    <BarreLateraleEtud/>
                </Col>

                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Details sur un etudiant</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/inscription">Etudiants</NavLink></li>
                                    <li className="breadcrumb-item active">Details</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Details de {allstud.nomEtud + ' ' + allstud.prenomEtud}</h3>
                                            </div>

                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card justify-content-center d-flex">
                                                            <div className="card-body table-responsive p-0">

                                                                <div className="col-md mt-5">

                                                                    <Row className='mx-3'>
                                                                        <Col className='col-md-3'>
                                                                            <Card className='border-0 w-100'>
                                                                                <Card.Body>
                                                                                
                                                                                    <Row>
                                                                                        <Col className='col d-flex justify-content-center my-3'>
                                                                                            <img className="text-center" width={'200px'} height={'200px'} src={`${import.meta.env.VITE_URL_Image}/uploadImage/${allstud.profil}`} alt="profil"/>
                                                                                        </Col>

                                                                                    </Row>

                                                                                    <Row>
                                                                                        <Col className='col text-center'>
                                                                                            <Card.Text>
                                                                                                Nom de L'etudiant : <span className='fw-bold fs-5 text-primary'>{allstud.nomEtud}</span>
                                                                                            </Card.Text>  

                                                                                            <Card.Text>
                                                                                                {/* Filière : <span className='fw-bold fs-5 text-danger'>{allstud.formation_id}</span> */}
                                                                                                Filière : <span className='fw-bold fs-5 text-primary'>{(allstud.formation && allstud.formation.nomForm)}</span>
                                                                                            </Card.Text>  

                                                                                        </Col>
                                                                                    </Row>
                                                                                   
                                                                                </Card.Body>
                                                                            </Card>

                                                                        </Col>

                                                                        <Col className='col-md-9'>
                                                                            <Card className='border-0 w-100'>
                                                                                <Card.Body>
                                                                                
                                                                                    <Row className="mt-5">

                                                                                        <div className="col-md">
                                                                                            <div className="card">
                                                                                                <div className="card-body pt-3">
                                                                                                {/* <!-- Bordered Tabs --> */}
                                                                                                    <ul className="nav nav-tabs nav-tabs-bordered">

                                                                                                        {/* <li className="nav-item">
                                                                                                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                                                                                        </li> */}

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'profile-edit' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#profile-edit">Infos Perso.</button>
                                                                                                        </li>

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'infos_comp' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#infos_comp">Autres Infos</button>
                                                                                                        </li>

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'HeureAbs' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#HeureAbs">Heures Abs. </button>
                                                                                                        </li>

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'HistoPaie' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#HistoPaie">Histo. Paie. </button>
                                                                                                        </li>

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'Note' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#Note">Notes </button>
                                                                                                        </li>

                                                                                                        <li className="nav-item">
                                                                                                            <button className={`nav-link fw-bold ${activeTab === 'Conduite' ? 'active' : ''}`} data-bs-toggle="tab" data-bs-target="#Conduite">Conduite</button>
                                                                                                        </li>


                                                                                                    </ul>

                                                                                                    <div className="tab-content pt-2">
                                                                                                        <div className="tab-pane active profile-edit pt-3" id="profile-edit">

                                                                                                            {/* <!-- Profile Edit htmlForm --> */}
                                                                                                            <form>
                                                                                                                <div className="row mb-3">
                                                                                                                    <div className="col-md-8 col-lg-9">
                                                                                                                        
                                                                                                                        <Card.Text>
                                                                                                                            Date et Lieu De Naissance : <span className='fw-bold text-primary'>{allstud.birthday}</span>
                                                                                                                        </Card.Text>
                                                                                                                        <Card.Text>
                                                                                                                            Sexe : <span className='fw-bold text-primary'>{allstud.sexe}</span>
                                                                                                                        </Card.Text>


                                                                                                                        <Card.Text>
                                                                                                                            Niveau D'Etudes : <span className='fw-bold text-primary'>{allstud.niveau}</span>
                                                                                                                        </Card.Text>

                                                                                                                        <Card.Text>
                                                                                                                            Ville : <span className='fw-bold text-primary'>{allstud.ville}</span>
                                                                                                                        </Card.Text>

                                                                                                                        <Card.Text>
                                                                                                                            Pays: <span className='fw-bold text-primary'>{allstud.pays}</span>
                                                                                                                        </Card.Text>

                                                                                                                        <Card.Text>
                                                                                                                            Telephone : <span className='fw-bold'> {allstud.telEtud}</span>
                                                                                                                        </Card.Text>
                                                                                                                        
                                                                                                                        <Card.Text>
                                                                                                                            Dernier Diplome :  <img className="circle-rounded" width={'150px'} height={'120px'} src={`${import.meta.env.VITE_URL_Image}/uploadImage/${allstud.diplome}`} alt="profil"/>
                                                                                                                        </Card.Text>
                                                                                                                    </div>
                                                                                                                </div>
 
                                                                                                            </form>
                                                                                                            {/* <!-- End Profile Edit htmlForm --> */}

                                                                                                        </div>

                                                                                                        <div className="tab-pane fade pt-3" id="infos_comp">
                                                                                                                <form>
                                                                                                                    <Card.Text>
                                                                                                                        Nom du Tuteur : <span className='fw-bold text-primary'>{allstud.nomTuteur}</span>
                                                                                                                    </Card.Text>

                                                                                                                    <Card.Text>
                                                                                                                        Telephone du Tuteur : <span className='fw-bold text-primary'>{allstud.telTuteur}</span>
                                                                                                                    </Card.Text>

                                                                                                                    <Card.Text>
                                                                                                                        Motivation : <span className='fw-bold text-primary'>{allstud.motivation}</span>
                                                                                                                    </Card.Text>

                                                                                                                    <Card.Text>
                                                                                                                        Decouverte Du Centre : <span className='fw-bold text-primary'>{allstud.decouverte}</span>
                                                                                                                    </Card.Text>
                                                                                                                </form> {/* <!-- End Change Password htmlForm --> */}
                                                                                                            
                                                                                                        </div>

                                                                                                        <div className="tab-pane fade pt-3" id="HeureAbs">
                                                                                                            {/* <!-- Change Password htmlForm --> */}
                                                                                                                <form>
                                                                                                                    {
                                                                                                                        allstud.absence ==0 ?
                                                                                                                        
                                                                                                                        <Card.Text>
                                                                                                                            <span className='fw-bold text-info d-flex justify-content-center'>PAS D'ABSENCES </span>
                                                                                                                        </Card.Text>

                                                                                                                        :

                                                                                                                            allstud.absence && allstud.absence.map((element,index)=>{
                                                                                                                                return(
                                                                                                                                    
                                                                                                                                    <>
                                                                                                                                        <Card.Text>
                                                                                                                                            Nom du cours : <span className='fw-bold text-primary'>{element.cour_id || element.cour.nomCours}</span>
                                                                                                                                        </Card.Text>

                                                                                                                                        <Card.Text>
                                                                                                                                            Date du Cours : <span className='fw-bold text-primary'>{allstud.absence && element.dateAbs}</span>
                                                                                                                                        </Card.Text>

                                                                                                                                        <Card.Text>
                                                                                                                                            Nombre d'heure d'absence : <span className='fw-bold text-primary'>{allstud.absence && element.nbreHeureAbs}</span>
                                                                                                                                        </Card.Text>

                                                                                                                                        <Card.Text>
                                                                                                                                            Type d'absence : <span className='fw-bold text-primary'>{allstud.absence && element.typeAbs}</span>
                                                                                                                                        </Card.Text>

                                                                                                                                        <Card.Text>
                                                                                                                                            Motif : <span className='fw-bold text-primary'>{allstud.absence && element.motifAbs}</span>
                                                                                                                                        </Card.Text>
                                                                                                                                    </>
                                                                                                                                )
                                                                                                                            })
                                                                                                                    }
                                                                                                                </form> {/* <!-- End Change Password htmlForm --> */}
                                                                                                        </div>

                                                                                                        <div className="tab-pane fade pt-3" id="HistoPaie">
                                                                                                            {/* <!-- Change Password htmlForm --> */}
                                                                                                                <form>
                                                                                                                    {
                                                                                                                        allstud.paiement==0 ?
                                                                                                                        <Card.Text>
                                                                                                                            <span className='fw-bold text-info d-flex justify-content-center'>PAS DE PAIEMENT</span>
                                                                                                                        </Card.Text>
                                                                                                                        :

                                                                                                                        <div className="card recent-sales overflow-auto">

                                                                                                                            <div className="card-body">

                                                                                                                                <table className="table table-borderless datatable">
                                                                                                                                    <thead>
                                                                                                                                    <tr>
                                                                                                                                        <th scope="col">Date Du Paiement</th>
                                                                                                                                        <th scope="col">Montant</th>
                                                                                                                                        <th scope="col">Moyen de Paiement</th>
                                                                                                                                        <th scope="col">Motif</th>
                                                                                                                                        <th scope="col"> Prochain Paiement</th>
                                                                                                                                    </tr>
                                                                                                                                    </thead>
                                                                                                                                    <tbody>
                                                                                                                                        {
                                                                                                                                            allstud.paiement && allstud.paiement.map((element, index) => {
                                                                                                                                                const createdDatePaie = new Date(element.created_at);
                                                                                                                                                const formatdatePaie = createdDatePaie.toLocaleDateString();
                                                                                                                                            return (
                                                                                                                                                <>
                                                                                                                                                    <tr>
                                                                                                                                                        <td>{allstud.paiement && formatdatePaie}</td>
                                                                                                                                                        <td className='text-success fw-bold'>{allstud.paiement && element.MontantPaiement} FCFA</td>
                                                                                                                                                        <td className='text-success fw-bold'>{allstud.paiement && element.MoyenPaiement}</td>
                                                                                                                                                        <td>{allstud.paiement && element.MotifPaiement}</td>
                                                                                                                                                        <td>{allstud.paiement && element.ProchainPaiement}</td>
                                                                                                                                                    </tr>
                                                                                                                                                </>
                                                                                                                                            )
                                                                                                                                        })}
                                                                                                                                    </tbody>
                                                                                                                                </table>

                                                                                                                            </div>

                                                                                                                        </div>
                                                                                                                    }
                                                                                                                   
                                                                                                                </form> {/* <!-- End Change Password htmlForm --> */}
                                                                                                        </div>

                                                                                                        <div className="tab-pane fade pt-3" id="Note">
                                                                                                            {/* <!-- Change Password htmlForm --> */}
                                                                                                                <form>

                                                                                                                    {
                                                                                                                        allstud.note ==0?

                                                                                                                            <Card.Text>
                                                                                                                                <span className='fw-bold text-info d-flex justify-content-center'>PAS DE NOTE</span>
                                                                                                                            </Card.Text>
                                                                                                                        :
                                                                                                                        
                                                                                                                        allstud.note &&
                                                                                                                         allstud.note.map((element,index)=>{
                                                                                                                            return(

                                                                                                                                <Card.Text>
                                                                                                                                    Note de l'etudiant : <span className='fw-bold text-info'>{allstud.note && element.valeur}/20</span>
                                                                                                                                </Card.Text>

                                                                                                                            )
                                                                                                                        })

                                                                                                                        // && allstud.formation && allstud.formation.cours.map((element,index)=>{
                                                                                                                        //     return(

                                                                                                                        //         <Card.Text>
                                                                                                                        //             Nom du cours : <span className='fw-bold text-info'>{allstud.note && element.nomCours}</span>
                                                                                                                        //         </Card.Text>
                                                                                                                        //     )
                                                                                                                        // })
                                                                                                                    }

                                                                                                                </form> {/* <!-- End Change Password htmlForm --> */}
                                                                                                        </div>

                                                                                                        <div className="tab-pane fade pt-3" id="Conduite">
                                                                                                            {/* <!-- Change Password htmlForm --> */}
                                                                                                                <form>

                                                                                                                    {
                                                                                                                        allstud.conduite ==0?

                                                                                                                        <Card.Text>
                                                                                                                             <span className='fw-bold text-primary d-flex justify-content-center'>Pas Encore Evalué</span>
                                                                                                                        </Card.Text>
                                                                                                                        :
                                                                                                                        
                                                                                                                        allstud.conduite && allstud.conduite.map((element,index)=>{
                                                                                                                            return(
                                                                                                                                <div key={index}>
                                                                                                                                    <Card.Text>
                                                                                                                                        Note de la conduite : <span className='fw-bold text-info'>{allstud.conduite && element.notecond}/20</span>
                                                                                                                                    </Card.Text>

                                                                                                                                    <Card.Text>
                                                                                                                                        Niveau d'assiduité : <span className='fw-bold text-info'>{allstud.conduite && element.assuidCond}</span>
                                                                                                                                    </Card.Text>

                                                                                                                                    <Card.Text>
                                                                                                                                        Niveau de Compréhension : <span className='fw-bold text-info'>{allstud.conduite && element.comprCond}</span>
                                                                                                                                    </Card.Text>

                                                                                                                                    <Card.Text>
                                                                                                                                        Travail Personnel : <span className='fw-bold text-info'>{allstud.conduite && element.travailPersoCond}</span>
                                                                                                                                    </Card.Text>

                                                                                                                                    <Card.Text>
                                                                                                                                        Qvis du Formateur : <span className='fw-bold text-info'>{allstud.conduite && element.avisFormcond}</span>
                                                                                                                                    </Card.Text>
                                                                                                                                
                                                                                                                                </div>
                                                                                                                            )
                                                                                                                        })
                                                                                                                    }

                                                                                                                </form> {/* <!-- End Change Password htmlForm --> */}
                                                                                                        </div>


                                                                                                    </div>{/* <!-- End Bordered Tabs --> */}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                    </Row>
                                                                                   
                                                                                </Card.Body>
                                                                            </Card>

                                                                        </Col>


                                                                    </Row>

                                                                </div>

                                                                <Row>
                                                                    <Col className='text-center'>
                                                                    
                                                                        <PDFDownloadLink document={<CreateEtudiantPdf etud={allstud}/>} fileName='Details_Etudiant'>
                                                                            {({load})=>
                                                                                load ?(<Button variant="success" className='mt-4 w-25 mb-3'>Télécharger en cours ...</Button>):(<Button variant="success" className='mt-4 w-25 mb-3'>Télécharger PDF</Button>)}
                                                                        </PDFDownloadLink>

                                                                    </Col>

                                                                </Row>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </section>

                    </main>

                    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                        className="bi bi-arrow-up-short"></i></a>
                </Col>
            </Row>

        </Container>
    );
};

export default DetailsEtudiant;