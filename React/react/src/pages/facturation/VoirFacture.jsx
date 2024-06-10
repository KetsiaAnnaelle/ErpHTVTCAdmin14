import React, {useEffect, useState} from 'react';
import {Breadcrumb, Col, Container, Row, Card, Button, Table,OverlayTrigger, Tooltip, Modal, Form} from "react-bootstrap";
import {Link, useNavigate, useParams, NavLink} from "react-router-dom";
import axios from "axios";
import {AiOutlineDownload, AiOutlinePlusCircle, AiFillSave} from 'react-icons/ai';
import {FaEdit, FaEye, FaTrashAlt, FaFileArchive, FaFilter, FaFileSignature} from "react-icons/fa";
import {PiNewspaperThin} from "react-icons/pi";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {useForm, Controller} from "react-hook-form";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import ReactLoading from "react-loading";
import {useFactureContext} from "./FactureProvider.jsx";

const CreateFacturePdf = ({ fact, paie }) => {

    const createdDate = new Date(fact.created_at);
    const formatdate = createdDate.toLocaleDateString();

    console.log(fact)

    let payesP = 0
    let restantsP = 0
    let payes = 0
    let restants = 0
    let paye = 0
    let restant = 0
    let totals = 0

    // Créez un style pour vos éléments PDF
    const styles = StyleSheet.create({
        page: {
            flex:1,
            flexDirection:'column',
            padding:20,
            justifyContent:'space-between'
        },
        container: {
            flexDirection: 'row',
            justifyContent:"center"
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
            marginTop:'200'
        },
        contentss: {
            flexDirection:'row',
            justifyContent:"space-between",
        },
        marge: {
            marginBottom:10
        },
        padding: {
            padding:5
        },
        title: {
            fontSize: 16,
            marginBottom: 25,
            marginTop: 15,
            color:'red'
        },
        info: {
            fontSize: 12,
            marginBottom: 5,
            flexDirection:'row'
        },
        bold: {
            fontSize:12
        },
        bolds: {
            fontWeight: 'bold',
            fontSize:12,
        },
        logo: {
            width: 80,
            height: 80,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        tableContainer: {
            marginTop: 20,
            padding: 10,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableRowEven: {
            backgroundColor: '#f2f2f2',
            flexDirection: 'row',
        },
        tableRowOdd: {
            flexDirection: 'row',
        },
        tableCell: {
            flex: 1,
            borderBottom: '2px solid #0D6EFD',
            padding: 4,
            fontSize:'12'
        },
        tableCellHeader: {
            flex: 1,
            borderTop: '2px solid #0D6EFD',
            padding: 4,
            fontWeight: 'bold',
            fontSize:'14'
        },
        colors:{
            color:'#0D6EFD'
        },
        colorss:{
            color:'#0D6EFD',
            fontSize:'12'
        },
        contentEnd:{
            marginTop:'20',
            flexDirection:'column',
            justifyContent:'flex-end'
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <Image src="/assets/img/logo.png" style={styles.logo} />
                    <View>
                        <View style={styles.marge}>
                            <Text style={styles.info}>
                                <Text style={styles.bolds}>HIGH TECH VOCATIONAL TRAINING CENTER A24</Text>
                            </Text>
                            <Text style={styles.info}>
                                Tél: <Text style={styles.bold}>+237690889086</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>infos@highteccentre.com</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>https://highteccentre.com</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.info}>
                                <Text style={styles.bolds}>{fact.nomEtud + ' ' + fact.prenomEtud}</Text>
                            </Text>
                            <Text style={styles.info}>
                                Filière: <Text style={styles.bold}>{fact.nomForm}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>Douala</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>Cameroun</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View >
                    <Text style={styles.title}>Facture FAC/2024/000{fact.id}</Text>
                    <View style={styles.contentss}>
                        <View>
                            <Text style={styles.info}>
                                <Text style={styles.colors}>Date de la facture :</Text>
                                <Text>{formatdate}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.info}>
                                <Text style={styles.colors}>Date d'échéance :</Text>
                                <Text>{fact.echeance}</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Description</Text>
                        <Text style={styles.tableCellHeader}>Quantité</Text>
                        <Text style={styles.tableCellHeader}>PU</Text>
                        <Text style={styles.tableCellHeader}>Paye</Text>
                        <Text style={styles.tableCellHeader}>Reste</Text>
                        <Text style={styles.tableCellHeader}>Montant</Text>
                    </View>
                    {
                            fact.map((element,index) => {

                                const createdDate = new Date(element.created_at);
                                const formatdate = createdDate.toLocaleDateString();
                                payes = payes + element.paye
                                restants = totals - payes

                                return(
                                    <>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCell}>{element.nomForm}</Text>
                                            <Text style={styles.tableCell}>1,00</Text>
                                            <Text style={styles.tableCell}>{element.total}</Text>
                                            <Text style={styles.tableCell}>{element.paye}</Text>
                                            <Text style={styles.tableCell}>{element.restant}</Text>
                                        </View>
                                    </>
                                )
                            })
                    }
                    <View style={styles.contentEnd}>
                        {paie.map((element, index) => {
                                const createdDateNew = new Date(element.created_at);
                                const formatdateNewPaie = createdDateNew.toLocaleDateString();
                                payesP = payesP + element.MontantPaiement
                                restantsP = totals - payesP
                                return(
                                    <>
                                        <View style={styles.contentEnd}>
                                            <View style={styles.info}>
                                                <Text style={styles.bolds}>Payé le {formatdateNewPaie} </Text>
                                                <Text style={styles.bolds}>    {element.MontantPaiement}FCFA </Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            }
                        )}
                        {
                            fact.map((element,index) => {
                                totals = element.total
                                if(index === 0){
                                    return(
                                        <>
                                            <View style={styles.info}>
                                                <Text style={styles.colors}>Coût total de la formation :</Text>
                                                <Text>    {totals} FCFA</Text>
                                            </View>
                                        </>
                                    )
                                }
                            })
                        }
                        {
                            paie.map((element,index) => {
                                paye = payes + payesP
                                restant = totals -paye
                                if (index === 0) {
                                    return (
                                        <>
                                            <View style={styles.info}>
                                                <Text style={styles.colors}>Montant total payé :</Text>
                                                <Text>    {paye >= totals ? totals : paye} FCFA</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.colors}>Montant total restant :</Text>
                                                <Text>    {restant <= 0 ? 0 : restant} FCFA</Text>
                                            </View>
                                        </>
                                    );
                                }
                                return null
                            })
                        }²
                    </View>
                </View>
                <Text style={styles.bold}>Merci d'utiliser la communication suivante pour votre paiement : <Text>FAC/2024/000{fact.id}</Text></Text>


                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>RECU DE PAIEMENT</Text>
                        <Text style={styles.bold}>DES FRAIS DE FORMATION </Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.colorss}>Ce document est imprimé</Text>
                        <Text style={styles.colorss}> pour les paiement</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    // const [leon, setleon] = useState([]);
    const dateActuelle = new Date()
    
    
    const history= useNavigate()
    const updatePaiement = async (data) => {
    
    await axios.put(`${import.meta.env.VITE_URL}/update-paiement/${props.data.id}`,{
    'RefPaiement': data.RefPaiement,
    'formation_id': data.formation_id,
    'Etudiant_id': data.Etudiant_id,
    'MontantPaiement': data.MontantPaiement,
    'MoyenPaiement': data.MoyenPaiement,
    'MotifPaiement': data.MotifPaiement,
    'ProchainPaiement': data.ProchainPaiement
    })
    .then(function (response) {
    console.log(response.data);
    se
    swal({
    title: "Modification Reussi !!!",
    text: "You clicked the button!",
    icon: "success",
    button: "OK",
    timer: 2000
    });
    
    window.location.reload()
    })
    .catch(function (error) {
    console.log(error);
    });
    }
    
    
    return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
    Modifier un Paiement
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <Form onSubmit={handleSubmit(updatePaiement)}>
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Reference</Form.Label>
    <Form.Control type="text" {...register("RefPaiement", { required: true, min:0 })} defaultValue={props.data.RefPaiement} />
    {errors.RefPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
    </Form.Group>
    
    <Form.Select aria-label="Default select example" {...register("formation_id", { required: true })} className='mb-3'controlId="fil" defaultValue={props.data.formation_id}>
    <option>Choisir la filière</option>
    {
    props.paiement.length!=0 && (
    props.paiement.Fileres.map((element, index) => {
    return (
    <option key={index} value={element.id} selected={element.formation_id == props.data.formation_id}>{element.nomForm}</option>
    );
    })
    )
    }
    </Form.Select>
    {errors.formation_id?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}
    
    
    <Form.Select aria-label="Default select example" {...register("Etudiant_id", { required: true })} className='mb-3' controlId="fil" defaultValue={props.data.Etudiant_id}>
    <option>Choisir l'étudiant</option>
    {
    props.paiement.length!=0 && (
    props.paiement.etudiants.map((element, index) => {
    return (
    <option key={index} value={element.id} selected={element.Etudiant_id == props.data.Etudiant_id}>{element.nomEtud}</option>
    );
    })
    )
    }
    </Form.Select>
    {errors.Etudiant_id?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}
    
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Montant Du Paiement</Form.Label>
    <Form.Control type="number" {...register("MontantPaiement", { required: true, min:0 })} defaultValue={props.data.MontantPaiement}/>
    {errors.MontantPaiement?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
    {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
    </Form.Group>
    
    
    <Form.Select aria-label="Default select example" {...register("MoyenPaiement", { required: true })} className='mb-3'controlId="" defaultValue={props.data.MoyenPaiement}>
    <option>Moyen De Paiement</option>
    <option value="Orange Money">Orange Money</option>
    <option value="MTN Monney">MTN Money</option>
    <option value="Virement Bancaire">Virement Bancaire</option>
    <option value="Espèce">Espèce</option>
    </Form.Select>
    {errors.MoyenPaiement?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Motif</Form.Label>
    <Form.Control type="text" {...register("MotifPaiement", { required: true, min:0 })} defaultValue={props.data.MotifPaiement} />
    {errors.MotifPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Prochain Paiement</Form.Label>
    <Form.Control type="date" {...register("ProchainPaiement", { required: true,
    validate:(value) => new Date(value) > dateActuelle})} defaultValue={props.data.ProchainPaiement}/>
    {errors.ProchainPaiement?.type==='required' && <span className='text-danger'>La date du prochain paiement est Obligatoire</span>}
    {errors.ProchainPaiement?.type==='validate' && <span className='text-danger'>Cette date doit être supérieure à la date d'aujourd'hui </span>}
    </Form.Group>
    
    <Row className='text-center mt-5'>
    <Col className='col-md-6'>
    <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75' >Modifier</Button>{' '}
    </Col>
    
    <Col className='col-md-6'>
    <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' >Annuler</Button>{' '}
    </Col>
    </Row>
    </Form>
    </Modal.Body>
    </Modal>
    );
    }

const VoirFacture = () => {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [fact, setfact] = useState([])
    const [etud, setetud] = useState([])
    const [leon, setleon] = useState([]);

    const [paiementFacture, setpaiementFacture] = useState([])


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);


    const [params, setparams] = useState([])

    const [idL, setidL] = useState(0)
    const [modalShow, setModalShow] = React.useState(false);

    let payesP = 0
    let restantsP = 0
    let payes = 0
    let restants = 0
    let totals = 0

    let { paye, restant, etudiant_id, echeance, updateValues } = useFactureContext();
    const dateActuelle = new Date()

    const {id}=useParams()
    const {nomForm}=useParams()
    let found = false

    console.log(nomForm, id)

    async function getFactures() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/facture/etudiant/${id}/formation/${nomForm}`);
            setfact(response.data);
            console.log(response.data)
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function getEtudiant() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/edit-student/${id}`);
            setetud(response.data);
            console.log(etud)
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit = async (data) => {

        const formData = new FormData();
    
        formData.append('RefPaiement', data.RefPaiement);
        formData.append('formation_id', data.formation_id);
        formData.append('Etudiant_id', data.Etudiant_id);
        formData.append('MontantPaiement', data.MontantPaiement);
        formData.append('MoyenPaiement', data.MoyenPaiement);
        formData.append('MotifPaiement', data.MotifPaiement);
        formData.append('ProchainPaiement', data.ProchainPaiement);
    
        axios.post(`${import.meta.env.VITE_URL}/create-paiement`,{
        'RefPaiement':data.RefPaiement,
        'formation_id':data.formation_id,
        'Etudiant_id':data.Etudiant_id,
        'MontantPaiement':data.MontantPaiement,
        'MoyenPaiement':data.MoyenPaiement,
        'MotifPaiement':data.MotifPaiement,
        'ProchainPaiement':data.ProchainPaiement
        })
        .then(function (response) {
        console.log(response.data);
        // JSON.stringify(response.data)
        setShow1(false)
    
        swal({
        title: "Paiement Créée Avec Succès !!!",
        text: "You clicked the button!",
        icon: "success",
        button: "OK",
        timer: 2000
        });
        // window.location.reload()
    
        GetPaiement()
    
        setallPaiement(response.data)
        })
        .catch(function(error) {
        console.log('error');
        })
    }

    async function GetPaiementFacture() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement/${id}`);
            setpaiementFacture(response.data);
            setload(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function GetEtudiantsAndFiliere() {
        try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/GetEtudiantsAndFiliere`);
        setleon(response.data);
        } catch (error) {
        console.error(error);
        }
     }

    // console.log(paiementFacture);

    useEffect(() => {
        if (!load===true){
            getFactures()
            GetPaiementFacture()
            getEtudiant()
            GetEtudiantsAndFiliere()
        }
    },[fresh])

    const createdDate = new Date(fact.created_at);
    const formatdate = createdDate.toLocaleDateString();


    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }

    }, [fresh])

    async function MettreDansLaCorbeille(id) {
        try {
        const response = await axios.delete(`${import.meta.env.VITE_URL}/delete-paiement/${id}/corbeille`);
        // getStudents()
        setTimeout(() => {
        //window.location.reload() //pour actualiser la page automatiquement
        }, 2000);
        // history('/etud/inscription')
    
        swal("Paiement mis dans la corbeille !!!",{
        icon:"success",
        });
        setallPaiement(response.data)
    
        console.log(response.data);
        console.log('Cet etudiant a ette mis dans la corbeille');
        } catch (error) {
        console.log(error);
        }
    }

    async function Archiver(id) {
        try {
        const response = await axios.put(`${import.meta.env.VITE_URL}/archive-paiement/${id}`);
        setallPaiement(response.data)
        // console.log(response.data);
        // getStudents()
        swal("Paiement Archivé avec succès !!!",{
        icon:"success",
        });
        setallPaiement(response.data)

        console.log(response.data);
        console.log(' Paiement Archive ');
        } catch (error) {
        console.log(error);
        }
    }

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleFact/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Voir Paiement(s) etudiant</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={`/fact/registre_facture/${nomForm}`}>Paiement par formation</NavLink></li>
                                    <li className="breadcrumb-item active">Voir Paiement(s) etudiant</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Paiement(s) etudiant</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <Row className='mt-3'>
                                                                    <Col className='col-md-6'>
                                                                        <Card className='border-0'>
                                                                            <Card.Body>
                                                                                <Card.Text>
                                                                                    Nom du centre : <span> High Tech Vocational Training Center</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Téléphone : <span> 690889086</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Mail : <span> infos@highteccentre.com</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Site web : <span> highteccentre.com</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Localisation : <span> Douala derrière le stade CICAM</span>
                                                                                </Card.Text>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                    <Col className='col-md-6'>
                                                                        <Card className='border-0'>
                                                                            <Card.Body>
                                                                                <Card.Text>
                                                                                    Noms et prenoms etudiant : <span> {etud.nomEtud + ' ' + etud.prenomEtud}</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Filière : <span> {nomForm}</span>
                                                                                </Card.Text>
                                                                                <Card.Text>
                                                                                    Matricule : <span> HTTVC0{etud.formation_id+id}</span>
                                                                                </Card.Text>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>

                                                                <Row className=''>
                                                                    <Col className='d-flex'>

                                                                        {['bottom'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Ajouter paiement</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Button variant="transparent" onClick={handleShow} className='mb-3 ms-3'><AiOutlinePlusCircle size={24} className='text-primary mt-4 mb-3 mx-3'/></Button>
                                                                            </OverlayTrigger>
                                                                        ))}


                                                                        <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

                                                                            <Modal.Header closeButton>
                                                                                <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Ajouter un Paiement</Modal.Title>
                                                                            </Modal.Header>

                                                                            <Modal.Body>

                                                                            <Form onSubmit={handleSubmit(onSubmit)}>

                                                                            <Form.Group className="mb-3" controlId="" >
                                                                            <Form.Label>Reference</Form.Label>
                                                                            <Form.Control type="text" {...register("RefPaiement", { required: true, min:0 })} />
                                                                            {errors.RefPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
                                                                            </Form.Group>

                                                                            <Form.Select aria-label="Default select example" {...register("formation_id", { required: true })} className='mb-3'controlId="fil" >
                                                                                <option>Choisir la filière</option>
                                                                                {
                                                                                leon.length!=0 && (
                                                                                leon.Fileres.map((element, index) => {
                                                                                    if(index === 1 && !found){
                                                                                        return (
                                                                                        <option key={index} value={element.id}>{nomForm}</option>
                                                                                        );
                                                                                        found = true
                                                                                    }
                                                                                
                                                                                })
                                                                                )
                                                                                }
                                                                                </Form.Select>
                                                                                {errors.formation_id?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}


                                                                                <Form.Select aria-label="Default select example" {...register("Etudiant_id", { required: true })} className='mb-3' controlId="fil" >
                                                                                <option>Choisir l'étudiant</option>
                                                                                {
                                                                                leon.length!=0 && (
                                                                                leon.etudiants.map((element, index) => {
                                                                                    if(index === 1 && !found){
                                                                                        return (
                                                                                        <option key={index} value={id}>{etud.nomEtud+' '+etud.prenomEtud}</option>
                                                                                        );
                                                                                        found = true
                                                                                    }
                                                                                })
                                                                                )
                                                                                }
                                                                                </Form.Select>
                                                                                {errors.Etudiant_id?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}


                                                                            <Form.Group className="mb-3" controlId="" >
                                                                            <Form.Label>Montant Du Paiement</Form.Label>
                                                                            <Form.Control type="number" {...register("MontantPaiement", { required: true, min:0 })} />
                                                                            {errors.MontantPaiement?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
                                                                            {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
                                                                            </Form.Group>


                                                                            <Form.Select aria-label="Default select example" {...register("MoyenPaiement", { required: true })} className='mb-3'controlId="" >
                                                                            <option>Moyen De Paiement</option>
                                                                            <option value="Orange Money">Orange Money</option>
                                                                            <option value="MTN Monney">MTN Money</option>
                                                                            <option value="Virement Bancaire">Virement Bancaire</option>
                                                                            <option value="Espèce">Espèce</option>
                                                                            </Form.Select>
                                                                            {errors.MoyenPaiement?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}

                                                                            <Form.Group className="mb-3" controlId="" >
                                                                            <Form.Label>Motif</Form.Label>
                                                                            <Form.Control type="text" {...register("MotifPaiement", { required: true, min:0 })} />
                                                                            {errors.MotifPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
                                                                            </Form.Group>

                                                                            <Form.Group className="mb-3" controlId="" >
                                                                            <Form.Label>Prochain Paiement</Form.Label>
                                                                            <Form.Control type="date" {...register("ProchainPaiement", { required: true,
                                                                            validate:(value) => new Date(value) > dateActuelle})} />
                                                                            {errors.ProchainPaiement?.type==='required' && <span className='text-danger'>La date du prochain paiement est Obligatoire</span>}
                                                                            {errors.ProchainPaiement?.type==='validate' && <span className='text-danger'>Cette date doit être supérieure à la date d'aujourd'hui </span>}
                                                                            </Form.Group>

                                                                            <Row className='text-center mt-5'>
                                                                            <Col className='col-md-6'>
                                                                            <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75' >Créer</Button>{' '}
                                                                            </Col>

                                                                            <Col className='col-md-6'>
                                                                            <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' >Annuler</Button>{' '}
                                                                            </Col>
                                                                            </Row>
                                                                            </Form>

                                                                            </Modal.Body>
                                                                        </Modal>

                                                                        {['bottom'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Télécharger paiement</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Button variant="transparent" className='mb-3 ms-3'>
                                                                                    <PDFDownloadLink document={<CreateFacturePdf fact={fact} paie={paiementFacture}/>} fileName='Facture'>
                                                                                        <AiOutlineDownload size={24} className='text-success mt-4 mb-3 mx-3'/>
                                                                                    </PDFDownloadLink>
                                                                                </Button>
                                                                            </OverlayTrigger>
                                                                        ))}
                                                                    <td>
                                                                        {['bottom'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Voir brouillon paiement</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Link variant="transparent" to={'/fact/paie_archiver'} className='btn btn-transparent'><FaFileSignature size={20} className='text-success mt-4 mb-3 mx-3' style={{ cursor:'pointer' }}/></Link>
                                                                            </OverlayTrigger>
                                                                        ))}
                                                                    </td>
                                                                    <td>
                                                                        {['bottom'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Voir corbeille paiement</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Link to={'/fact/paie_corbeille'}  className='btn btn-transparent'><FaTrashAlt size={20} className='text-danger mt-4 mb-3 mx-3' style={{ cursor:'pointer' }}/></Link>
                                                                            </OverlayTrigger>
                                                                        ))}
                                                                    </td>
                                                                    </Col>

                                                                    {
                                                                        fact.map((element,index) => {
                                                                            totals = element.total
                                                                            return(
                                                                                <></>
                                                                            )
                                                                            setfact([])
                                                                        })
                                                                    }

                                                                    <Table responsive>
                                                                        <thead style={{backgroundColor: '#1A3C30'}} className='text-white my-5 py-5'>
                                                                        <tr>
                                                                            <th>Date</th>
                                                                            <th>Motif</th>
                                                                            <th>Moyen Paiement</th>
                                                                            <th>Prix HT</th>
                                                                            <th>Taxe</th>
                                                                            <th>Paye</th>
                                                                            <th>Restant</th>
                                                                            <th>Total TTC</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {
                                                                            load ?
                                                                                <tr>
                                                                                    <td colSpan={15} align='center'>
                                                                                        <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
                                                                                    </td>
                                                                                </tr>
                                                                                :
                                                                                fact.map((element,index) => {

                                                                                    const createdDate = new Date(element.created_at);
                                                                                    const formatdate = createdDate.toLocaleDateString();
                                                                                    payes = payes + element.paye
                                                                                    restants = totals - payes

                                                                                    return(
                                                                                        <>
                                                                                            <tr>
                                                                                                <td>{formatdate}</td>
                                                                                                <td>{element.status}</td>
                                                                                                <td>Carte Bancaire</td>
                                                                                                <td>{element.total}</td>
                                                                                                <td>0</td>
                                                                                                <td>{element.paye}</td>
                                                                                                <td>{element.restant}</td>
                                                                                                <td>{element.total}</td>
                                                                                            </tr>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </Table>



                                                                </Row>

                                                                <Row>
                                                                    <Col className='col-md text-end'>
                                                                        <Table responsive>
                                                                            <tbody>
                                                                            {

                                                                                paiementFacture.map((element, index) => {
                                                                                    const datepaiementfacture = new Date(element.created_at)
                                                                                    const formatdatepaiementfacture = datepaiementfacture.toLocaleDateString();
                                                                                    payesP = payesP + element.MontantPaiement
                                                                                    restantsP = totals - payesP

                                                                                    return(

                                                                                        <>

                                                                                            <tr key={index} style={{ paddingInline:'-10px' }}>

                                                                                                <td>
                                                                                                    {['bottom'].map((placement) => (
                                                                                                        <OverlayTrigger
                                                                                                            key={placement}
                                                                                                            placement={placement}
                                                                                                            overlay={
                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                    <strong>Modifier paiement</strong>.
                                                                                                                </Tooltip>
                                                                                                            }
                                                                                                        >
                                                                                                            <Button variant="transparent" onClick={()=>handleMan(element)} className=''><FaEdit size={20} className='text-info mx-3' style={{ cursor:'pointer' }}/></Button>
                                                                                                        </OverlayTrigger>
                                                                                                    ))}

                                                                                                    Payé le: {formatdatepaiementfacture}</td>
                                                                                                <td>
                                                                                                    {['bottom'].map((placement) => (
                                                                                                        <OverlayTrigger
                                                                                                            key={placement}
                                                                                                            placement={placement}
                                                                                                            overlay={
                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                    <strong>Supprimer paiement</strong>.
                                                                                                                </Tooltip>
                                                                                                            }
                                                                                                        >
                                                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>MettreDansLaCorbeille(element.id)}><FaTrashAlt size={20} className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                        </OverlayTrigger>
                                                                                                    ))}
                                                                                                </td>
                                                                                                <td>
                                                                                                    {['bottom'].map((placement) => (
                                                                                                        <OverlayTrigger
                                                                                                            key={placement}
                                                                                                            placement={placement}
                                                                                                            overlay={
                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                    <strong>Brouillon paiement</strong>.
                                                                                                                </Tooltip>
                                                                                                            }
                                                                                                        >
                                                                                                            <a variant="transparent" className='btn mb-3 ms-3' onClick={()=>Archiver(element.id)}><FaFileSignature size={20}  className="text-success" style={{ cursor:'pointer' }} /></a>
                                                                                                        </OverlayTrigger>
                                                                                                    ))}
                                                                                                </td>
                                                                                                <td>Montant: {element.MontantPaiement} FCFA</td>
                                                                                                <td>prochain paiement: {element.ProchainPaiement}</td>
                                                                                            </tr>

                                                                                            <MyVerticallyCenteredModal
                                                                                                show={(idL===element.id) && modalShow}
                                                                                                onHide={() => setModalShow(false)}
                                                                                                data={params}
                                                                                                paiement={leon}
                                                                                            />
                                                                                        </>
                                                                                    )

                                                                                })

                                                                            }
                                                                            </tbody>
                                                                        </Table>
                                                                        <Row>
                                                                            <Col className='text-end'>
                                                                                {
                                                                                    fact.map((element,index) => {
                                                                                        totals = element.total
                                                                                        if(index === 0){
                                                                                            return(
                                                                                                <>
                                                                                                    <p className='fw-bold'>Coût total de la formation : <span>{totals} FCFA</span></p>
                                                                                                </>
                                                                                            )
                                                                                            setfact([])
                                                                                        }
                                                                                    })
                                                                                }
                                                                                {
                                                                                    paiementFacture.map((element,index) => {
                                                                                        paye = payes + payesP
                                                                                        restant = totals -paye
                                                                                        if (index === 0) {
                                                                                            updateValues(paye,restant,id, element.ProchainPaiement)
                                                                                            return (
                                                                                                <>
                                                                                                    <p className='fw-bold'>Montant total payé : <span>{paye >= totals ? totals : paye} FCFA</span></p>
                                                                                                    <p className='fw-bold'>Montant total restant : <span className='text-danger'>{restant <= 0 ? 0 : restant} FCFA</span></p>
                                                                                                    <p>Paye {paye} restant {restant} de {etudiant_id} pour {echeance}</p>
                                                                                                </>
                                                                                            );
                                                                                        }
                                                                                        return null
                                                                                    })
                                                                                }
                                                                            </Col>
                                                                        </Row>
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

export default VoirFacture;