import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Card, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {AiOutlineDownload, AiOutlinePlusCircle} from "react-icons/ai";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {PiNewspaperThin} from "react-icons/pi";
import {FaEdit} from "react-icons/fa";
import {useForm} from "react-hook-form";
import axios from "axios";

const CreatePerformancePdf = ({ cond, newCond }) => {

 const createdDate = new Date(cond.dateCond);
 const formatdate = createdDate.toLocaleDateString();

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
 marginTop:'80'
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
 flexDirection:'row',
 justifyContent:'space-between',
 marginVertical:10
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
 flexDirection:'row',
 justifyContent:'space-around'
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
 <Text style={styles.bolds}>{cond.nomEtud + ' ' + cond.prenomEtud}</Text>
 </Text>
 <Text style={styles.info}>
 Filière: <Text style={styles.bold}>{cond.nomForm}</Text>
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

 <View style={styles.tableContainer}>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>Date</Text>
 <Text style={styles.tableCellHeader}>Description</Text>
 <Text style={styles.tableCellHeader}>Note</Text>
 <Text style={styles.tableCellHeader}>Avis formateur</Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCell}>{cond.dateCond}</Text>
 <Text style={styles.tableCell}>{cond.nomForm}</Text>
 <Text style={styles.tableCell}>{cond.notecond}</Text>
 <Text style={styles.tableCell}>{cond.avisFormcond}</Text>
 </View>
 {newCond.map((conduite, index) => {
 const createdDateNew = new Date(conduite.created_at);
 const formatdateNewCond = createdDateNew.toLocaleDateString();
 return(
 <View style={styles.contentEnd}>
 <View style={styles.info}>
 <Text style={styles.bolds}>Conduite du {formatdateNewCond} </Text>
 </View>
 <View style={styles.info}>
 <Text style={styles.colors}>Avis Formateur </Text>
 <Text>{conduite.avisFormCond}</Text>
 </View>
 <View style={styles.info}>
 <Text style={styles.colors}>Note </Text>
 <Text>{conduite.noteCond} /20</Text>
 </View>
 </View>)
 }
 )}
 </View>


 <View style={styles.contents}>
 <View style={styles.padding}>
 <Text style={styles.bold}>INFORMATION SUR</Text>
 <Text style={styles.bold}>LA CONDUITE </Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.bold}>AGREMENT MINEFOP</Text>
 <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
 <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.colorss}>Ce document est imprimé</Text>
 <Text style={styles.colorss}> pour chaque conduite</Text>
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
 const updateNewConduite = async (data) => {

 await axios.post(`${import.meta.env.VITE_URL}/update-newConduite/${props.data.id}`,{
 'noteCond': data.note,
 'avisFormCond': data.avisForm,
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
 <Modal.Header closeButton className='bg-secondary text-white'>
 <Modal.Title>Modifier une conduite</Modal.Title>
 </Modal.Header>

 <Form onSubmit={handleSubmit(updateNewConduite)}>
 <Modal.Body>
 <Form.Group className="mb-3" controlId="projet" >
 <Form.Label>Avis du formateur</Form.Label>
 <Form.Control as="textarea" rows={3} {...register("avisForm", { required: true, minLength:3 })} defaultValue={props.data.avisFormCond} />
 {errors.avisForm?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.avisForm?.type==='required' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
 </Form.Group>
 <Form.Group className="mb-3" controlId="note" >
 <Form.Label>Note de la conduite</Form.Label>
 <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })} defaultValue={props.data.noteCond}/>
 {errors.note?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.note?.type==='min' && <span className='text-danger'>La note doit être supérieure à 0</span>}
 {errors.note?.type==='max' && <span className='text-danger'>La note doit être inférieure ou égale à 20</span>}
 </Form.Group>
 </Modal.Body>

 <Modal.Footer>
 <Row className='mt-5'>
 <Col className='col-md-6'>
 <Button type='submit' variant="secondary" size="lg" className='mb-3 w-100'>Modifier</Button>{' '}
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

const VoirPerformanceEns = () => {

 const { register, handleSubmit,reset, formState: { errors } } = useForm();

 const [fresh, setfresh] = useState(false)
 const [load, setload] = useState(false)
 const [cond, setcond] = useState([])

 const [newCond, setnewCond] = useState([])


 const [show, setShow] = useState(false);
 const handleShow = () => setShow(true);
 const handleClose = () => setShow(false);


 const [params, setparams] = useState([])

 const [idL, setidL] = useState(0)
 const [modalShow, setModalShow] = React.useState(false);


 const {id}=useParams()
 const history=useNavigate()

 async function getPerformanceEns() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/performanceEns/${id}`);
 setcond(response.data);
 } catch (error) {
 console.error(error);
 }
 }


 const onSubmit = async (data) => {

 const formData = new FormData();
 formData.append('notePerfEns', data.note);
 formData.append('avisPerfEns', data.avisEns);

 axios.post(`${import.meta.env.VITE_URL}/create-newPerformanceEns/${id}`,formData)
 .then(function (response) {
 console.log(response.data);
 // JSON.stringify(response.data)
 setShow(false)

 swal({
 title: "Nouvelle performance Créée Avec Succès !!!",
 text: "You clicked the button!",
 icon: "success",
 button: "OK",
 timer: 2000
 });

 reset('')
 window.location.reload()
 })
 .catch(function(error) {
 console.log('error');
 })
 }


 async function GetNewPerfEns() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/get-newPerformanceEns/${id}`);
 setnewCond(response.data);
 console.log(response.data)

 } catch (error) {
 console.error(error);
 }
 }

 //console.log(newCond)

 useEffect(() => {
 if (!load===true){
 getPerformanceEns()
 GetNewPerfEns
 }
 },[fresh])

 const createdDate = new Date(cond.dateCond);
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
 <BarreLateraleEns/>
 </Col>
 <Col className='col-lg-12'>
 <main id="main" className="main">

 <div className="pagetitle">
 <h1>Voir Performance Enseignant</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/performance_enseignant">Performance</NavLink></li>
 <li className="breadcrumb-item active">Voir Performance Enseignant</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Informations sur la performance de l'enseignant</h3>
 </div>
 <div className="card-body">
 <div className="row">
 <div className="col-12">
 <div className="card">
 <div className="card-body">
 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Performance du {formatdate}</h3>
 </div>
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
 Noms et prenoms enseignant : <span> {cond.nomEns + ' ' + cond.prenomEns}</span>
 </Card.Text>
 <Card.Text>
 Filière : <span> {cond.nomForm}</span>
 </Card.Text>
 <Card.Text>
 Filière : <span> {cond.nomCours}</span>
 </Card.Text>
 <Card.Text>
 Matricule : <span> HTTVC0{cond.enseignant_id+cond.id}</span>
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
 <strong>Ajouter une performance</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" onClick={handleShow} className='mb-3 ms-3'><AiOutlinePlusCircle size={24} className='text-primary mt-4 mb-3 mx-3'/></Button>
 </OverlayTrigger>
 ))}


 <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

 <Modal.Header closeButton>
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Ajouter une performance</Modal.Title>
 </Modal.Header>

 <Modal.Body>

 <Form onSubmit={handleSubmit(onSubmit)}>

 <Form.Group className="mb-3" controlId="projet" >
 <Form.Label>Avis sur l'enseignant</Form.Label>
 <Form.Control as="textarea" rows={3} {...register("avisEns", { required: true, minLength:3 })} />
 {errors.avisEns?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.avisEns?.type==='required' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
 </Form.Group>
 <Form.Group className="mb-3" controlId="note" >
 <Form.Label>Note de la performance</Form.Label>
 <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })}/>
 {errors.note?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.note?.type==='min' && <span className='text-danger'>La note doit être supérieure à 0</span>}
 {errors.note?.type==='max' && <span className='text-danger'>La note doit être inférieure ou égale à 20</span>}
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
 <strong>Télécharger performance</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3'>
 <PDFDownloadLink document={<CreatePerformancePdf cond={cond} newCond={newCond} />} fileName='performance_enseignant'>
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
 <th>Enseignant</th>
 <th>Note</th>
 <th>Avis performance</th>
 </tr>
 </thead>
 <tbody>
 <>
 <tr>
 <td>{formatdate}</td>
 <td>{cond.nomEns+' '+cond.prenomEns}</td>
 <td>{cond.notePerfEns}</td>
 <td>{cond.avisPerfEns}</td>
 </tr>
 </>
 </tbody>
 </Table>



 </Row>

 <Row>
 <Col className='col-md text-end' >
 <Table responsive>
 <tbody>
 {

 newCond.map((element, index) => {
 const dateNewCond = new Date(element.created_at)
 const formatdateNewCond = dateNewCond.toLocaleDateString();

 return(

 <>

 <tr key={index} >

 <td>
 {['bottom'].map((placement) => (
 <OverlayTrigger
 key={placement}
 placement={placement}
 overlay={
 <Tooltip id={`tooltip-${placement}`}>
 <strong>Modifier Conduite</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" onClick={()=>handleMan(element)} className=''><FaEdit size={20} className='text-info mx-3' style={{ cursor:'pointer' }}/></Button>
 </OverlayTrigger>
 ))}

 Conduite du: {formatdateNewCond}</td>
 <td>Note: {element.noteCond}</td>
 <td>Avis: {element.avisFormCond}</td>
 </tr>

 <MyVerticallyCenteredModal
 show={(idL===element.id) && modalShow}
 onHide={() => setModalShow(false)}
 data={params}
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
 <div className="card-footer">

 </div>
 </div>

 </div>
 </div>

 </div>
 </section>
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

export default VoirPerformanceEns;