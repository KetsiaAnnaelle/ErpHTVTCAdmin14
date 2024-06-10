import React, {useEffect, useState} from 'react';
import {Breadcrumb, Col, Container, Row, Card, Button, Table,OverlayTrigger, Tooltip, Modal, Form} from "react-bootstrap";
import {Link, useNavigate, useParams, NavLink} from "react-router-dom";
import axios from "axios";
import {AiOutlineDownload, AiOutlinePlusCircle, AiFillSave} from 'react-icons/ai';
import {FaEdit} from "react-icons/fa";
import {PiNewspaperThin} from "react-icons/pi";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {useForm, Controller} from "react-hook-form";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";

const CreatePaiementPersoPdf = ({ fact, paie }) => {

 const createdDate = new Date(fact.created_at);
 const formatdate = createdDate.toLocaleDateString();

 let payes = fact.MontantPaiementPerso

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

 console.log(paie)
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
 <Text style={styles.bolds}>{fact.nomPerso + ' ' + fact.prenomPerso}</Text>
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
 <Text style={styles.colors}>Prochain Paiement :</Text>
 <Text>{fact.ProchainPaiementPerso}</Text>
 </Text>
 </View>
 </View>
 </View>

 <View style={styles.tableContainer}>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>Description</Text>
 <Text style={styles.tableCellHeader}>Quantité</Text>
 <Text style={styles.tableCellHeader}>Prix Unitaire</Text>
 <Text style={styles.tableCellHeader}>Montant</Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCell}>{fact.MotifPaiementPerso}</Text>
 <Text style={styles.tableCell}>1,00</Text>
 <Text style={styles.tableCell}>{fact.MontantPaiementPerso}</Text>
 <Text style={styles.tableCell}>{fact.MontantPaiementPerso} FCFA</Text>
 </View>
 <View style={styles.contentEnd}>
 <View style={styles.info}>
 <Text style={styles.bolds}>Payé le {formatdate}</Text>
 <Text style={styles.bold}> {fact.MontantPaiementPerso} FCFA</Text>
 </View>
 {paie.map((element, index) => {
 const createdDateNew = new Date(element.created_at);
 const formatdateNewPaie = createdDateNew.toLocaleDateString();
 return(
 <>
 <View style={styles.contentEnd}>
 <View style={styles.info}>
 <Text style={styles.bolds}>Payé le {formatdateNewPaie} </Text>
 <Text style={styles.bolds}> {element.montantPerso}FCFA </Text>
 </View>
 </View>
 </>
 )
 }
 )}
 </View>
 </View>
 <Text style={styles.bold}>Merci d'utiliser la communication suivante pour votre paiement : <Text>FAC/2024/000{fact.id}</Text></Text>


 <View style={styles.contents}>
 <View style={styles.padding}>
 <Text style={styles.bold}>RECU DE PAIEMENT</Text>
 <Text style={styles.bold}>D'UN PERSONNEL </Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.bold}>AGREMENT MINEFOP</Text>
 <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
 <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.colorss}>Ce document est imprimé</Text>
 <Text style={styles.colorss}> pour chaque paiement</Text>
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

 const [modalShow, setModalShow] = React.useState(false);


 const history= useNavigate()
 const updatePaiementFacture = async (data) => {

 await axios.put(`${import.meta.env.VITE_URL}/update-newPaiementPerso/${props.data.id}`,{

 'montantPerso': data.MontantPaiementPerso,
 })
 .then(function (response) {
 setfres(!fres)
 swal({
 title: "Modification Reussi !!!",
 text: "You clicked the button!",
 icon: "success",
 button: "OK",
 timer: 2000
 });
 reset()
 console.log('Modifié');

 window.location.reload()


 })
 .catch(function (error) {
 console.log('error');
 });
 }

 const [fres, setfres] = useState(false);

 useEffect(() => {
 props.onHide()
 }, [fres])



 return (
 <Modal
 {...props}
 size="md"
 aria-labelledby="contained-modal-title-vcenter"
 centered
 // onHide={() => setModalShow(false)}
 >
 {/* <Modal
 // show={showFilter}
 // onHide={handleCloseFilter}
 // backdrop="static"
 // keyboard={false}
 > */}
 <Modal.Header closeButton>
 <Modal.Title>Modifier un Paiement</Modal.Title>
 </Modal.Header>

 <Form onSubmit={handleSubmit(updatePaiementFacture)}>
 <Modal.Body>
 <Form.Group className="mb-3" controlId="" >
 <Form.Label>Montant Du Paiement</Form.Label>
 <Form.Control type="number" {...register("MontantPaiementPerso", { required: true, min:0 })} defaultValue={props.data.montantPerso}/>
 {errors.MontantPaiementPerso?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
 {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
 </Form.Group>
 </Modal.Body>

 <Modal.Footer>
 <Row className='mt-5'>
 <Col className='col-md-6'>
 <Button type='submit' variant="primary" size="lg" className='mb-3 w-100'>Modifier</Button>{' '}
 </Col>

 <Col className='col-md-6'>
 <Button type="reset" onClick={() =>setModalShow(false)} variant="warning" size="lg" className='mb-3 w-100'>Annuler</Button>{' '}
 </Col>
 </Row>
 </Modal.Footer>
 </Form>
 {/* </Modal> */}
 </Modal>
 );
}

const VoirPaiementPerso = () => {

 const { register, handleSubmit,reset, formState: { errors } } = useForm();

 const [fresh, setfresh] = useState(false)
 const [load, setload] = useState(false)
 const [fact, setfact] = useState([])

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


 const {id}=useParams()
 const history=useNavigate()

 let payes = fact.MontantPaiementEns

 async function getFactures() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/paiementPerso/${id}`);
 setfact(response.data);
 } catch (error) {
 console.error(error);
 }
 }

 // console.log(fact);

 const onSubmit = async (data) => {

 const formData = new FormData();


 formData.append('MontantPaiementEns', data.MontantPaiementEns);

 axios.post(`${import.meta.env.VITE_URL}/create-newPaiementPerso/${id}`,{

 'montantPerso':data.MontantPaiementPerso,
 })
 .then(function (response) {
 console.log(response.data);
 // JSON.stringify(response.data)
 setShow(false)

 swal({
 title: "Paiement Créée Avec Succès !!!",
 text: "You clicked the button!",
 icon: "success",
 button: "OK",
 timer: 2000
 });

 reset('')
 window.location.reload()
 })
 .catch(function(error) {
 console.log(error);
 })
 }

 async function GetPaiementFacture() {
 try {
 setload(true)
 const response = await axios.get(`${import.meta.env.VITE_URL}/newPaiementPerso/${id}`);
 setpaiementFacture(response.data);
 console.log(response.data)
 setload(false)
 } catch (error) {
 console.log(error);
 }
 }

 // console.log(paiementFacture);

 useEffect(() => {
 if (!load===true){
 getFactures()
 GetPaiementFacture()
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

 return (
 <Container fluid>
 <HeaderGeneral/>
 <Row>
 <Col>
 <BarreLateralePerso/>
 </Col>
 <Col className='col-lg-12'>
 <main id="main" className="main">

 <div className="pagetitle">
 <h1>Voir Paiement Personnel</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/fact">Paiement</NavLink></li>
 <li className="breadcrumb-item active">Voir Paiement Personnel</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Paiement du {formatdate}</h3>
 </div>
 <div className="card-body">
 <div className="row">
 <div className="col-12">
 <div className="card">
 <div className="card-body">
 <Row className='mt-3'>
 <Col className='col-md-4'>
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
 <Col className='col-md-4'>
 <Card className='border-0'>
 <Card.Body>
 <Card.Text>
 Noms et prenoms personnel : <span> {fact.nomPerso + ' ' + fact.prenomPerso}</span>
 </Card.Text>
 <Card.Text>
 Matricule : <span> HTTVC0{fact.id}</span>
 </Card.Text>
 <Card.Text>
 Date Recrutement : <span> {formatdate}</span>
 </Card.Text>
 </Card.Body>
 </Card>
 </Col>
 <Col className='col-md-4'>
 <Card className='border-0'>
 <Card.Body>
 <Card.Text>
 Reference Reçu : <span> FAC/2024/000{fact.id}</span>
 </Card.Text>
 <Card.Text>
 Date du jour : <span> {formatdate}</span>
 </Card.Text>
 <Card.Text>
 Prochain paiement : <span> {fact.ProchainPaiementPerso}</span>
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
 <Form.Label>Montant Du Paiement</Form.Label>
 <Form.Control type="number" {...register("MontantPaiementPerso", { required: true, min:0 })} />
 {errors.MontantPaiementPerso?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
 {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
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
 <PDFDownloadLink document={<CreatePaiementPersoPdf fact={fact} paie={paiementFacture}/>} fileName='Facture_Paiement_personnel'>
 <AiOutlineDownload size={24} className='text-success mt-4 mb-3 mx-3'/>
 </PDFDownloadLink>
 </Button>
 </OverlayTrigger>
 ))}
 </Col>

 <Table responsive>
 <thead style={{backgroundColor: '#1A3C30'}} className='text-white my-5 py-5'>
 <tr>
 <th>Date</th>
 <th>Reference</th>
 <th>Moyen Paiement</th>
 <th>Motif</th>
 <th>Prix HT</th>
 <th>Taxe</th>
 <th>Total TTC</th>
 </tr>
 </thead>
 <tbody>
 <>
 <tr>
 <td>{formatdate}</td>
 <td>{fact.RefPaiementPerso}</td>
 <td>{fact.MoyenPaiementPerso}</td>
 <td>{fact.MotifPaiementPerso}</td>
 <td>{fact.MontantPaiementPerso}</td>
 <td>0</td>
 <td>{fact.MontantPaiementPerso}</td>
 </tr>
 </>
 </tbody>
 </Table>



 </Row>

 <Row>
 <Col className='col-md text-end'>
 <Table responsive>
 <tbody>
 <tr style={{ paddingInline:'-10px' }}>

 <td>
 Payé le: {formatdate} </td>
 <td>Montant: {fact.MontantPaiementPerso} FCFA</td>
 </tr>
 {

 paiementFacture.map((element, index) => {
 const datepaiementfacture = new Date(element.created_at)
 const formatdatepaiementfacture = datepaiementfacture.toLocaleDateString();
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
 <Button variant="transparent" onClick={()=>handleMan(element)} className=''><FaEdit size={24} className='text-info mx-3' style={{ cursor:'pointer' }}/></Button>
 </OverlayTrigger>
 ))}

 Payé le: {formatdatepaiementfacture}</td>
 <td>Montant: {element.montantPerso} FCFA</td>
 </tr>

 <MyVerticallyCenteredModal
 show={(idL===element.id) && modalShow}
 onHide={() => setModalShow(false)}
 data={params}
 // paiement={leon}
 />
 </>
 )

 })

 }
 </tbody>
 </Table>
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

export default VoirPaiementPerso;