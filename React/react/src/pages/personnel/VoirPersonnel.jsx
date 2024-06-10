import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";
import axios from "axios";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";

const CreateRecrutementPdf = ({ perso }) => {
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
 marginTop:250
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
 marginTop: 15,
 },
 info: {
 fontSize: 12,
 marginBottom: 5,
 },
 bold: {
 fontWeight: 'bold',
 fontSize:12
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
 padding: 4,
 fontSize:'12',
 fontWeight:'bold'
 },
 tableCellHeader: {
 flex: 1,
 borderBottom: '2px solid #0D6EFD',
 padding: 4,
 fontWeight: 'bold',
 fontSize:'14',
 },
 });

 return (
 <Document>
 <Page size="A4" style={styles.page}>
 <View style={styles.container}>
 <Image src="/assets/img/logo.png" style={styles.logo} />
 <View>
 <View style={styles.marge}>
 <Text style={styles.info}>
 <Text style={styles.bold}>HIGH TECH VOCATIONAL TRAINING CENTER</Text>
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
 <Text style={styles.bolds}>{perso.nomPerso + ' ' + perso.prenomPerso}</Text>
 </Text>
 <Text style={styles.info}>
 Poste: <Text style={styles.bold}>{perso.postePerso}</Text>
 </Text>
 <Text style={styles.info}>
 <Text style={styles.bold}>{perso.adressePerso}</Text>
 </Text>
 <Text style={styles.info}>
 <Text style={styles.bold}>Cameroun</Text>
 </Text>
 </View>
 </View>
 </View>
 <View style={styles.tableContainer}>
 <Text style={styles.title}>Informations sur le recrutement</Text>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Né le
 <Text style={styles.tableCell}> {perso.dateNaissancePerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Adresse
 <Text style={styles.tableCell}> {perso.adressePerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Sexe
 <Text style={styles.tableCell}> {perso.sexePerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Téléphone
 <Text style={styles.tableCell}> {perso.telPerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Diplome
 <Text style={styles.tableCell}> {perso.diplomePerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Type Contrat
 <Text style={styles.tableCell}> {perso.typeContratPerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 salaire
 <Text style={styles.tableCell}> {perso.salairePerso}FCFA</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Date Debut Contrat
 <Text style={styles.tableCell}> {perso.debutContratPerso}</Text>
 </Text>
 </View>
 <View style={styles.tableRow}>
 <Text style={styles.tableCellHeader}>
 Date fin Contrat
 <Text style={styles.tableCell}> {perso.finContratPerso}</Text>
 </Text>
 </View>
 </View>
 <View style={styles.contents}>
 <View style={styles.padding}>
 <Text style={styles.bold}>INFORMATIONS SUR</Text>
 <Text style={styles.bold}>LE RECRUTEMENT</Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.bold}>AGREMENT MINEFOP</Text>
 <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
 <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
 </View>
 <View style={styles.padding}>
 <Text style={styles.bold}>Ce document est imprimé</Text>
 <Text style={styles.bold}> pour chaque recrutement</Text>
 </View>
 </View>
 </Page>
 </Document>
 );
};

const VoirPersonnel = () => {

 const [fresh, setfresh] = useState(false)
 const [load, setload] = useState(false)
 const [perso, setperso] = useState([])

 const {id}=useParams()

 async function getPersonnel() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/personnel/${id}`);
 setperso(response.data);
 } catch (error) {
 console.error(error);
 }
 }

 useEffect(() => {
 if (!load===true){
 getPersonnel()
 setload(true)
 }
 },[fresh,load])

 const createdDate = new Date(perso.created_at);
 const formatdate = createdDate.toLocaleDateString();

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
 <h1>Voir Personnel</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/recrutement_personnel">Recrutement</NavLink></li>
 <li className="breadcrumb-item active">Voir Personnel</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Informations sur le recrutement de {perso.nomPerso+' '+perso.prenomPerso}</h3>
 </div>
 <div className="card-body">
 <div className="row">
 <div className="col-12">
 <div className="card">
 <div className="card-body table-responsive p-0">
 <div className='d-flex justify-content-between'>
 <Card className='border-0 p-3'>
 <Card.Body>
 <Card.Text>
 Nom du centre : <span className='fw-bold'> High Tech Vocational Training Center</span>
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
 <Card className='border-0 p-3'>
 <Card.Body>
 <Card.Text>
 Noms Personnel : <span> {perso.nomPerso +' '+ perso.prenomPerso}</span>
 </Card.Text>
 <Card.Text>
 Poste : <span> {perso.postePerso}</span>
 </Card.Text>
 <Card.Text>
 Matricule : <span> HTTVCP0{perso.id}</span>
 </Card.Text>
 <Card.Text>
 Date Debut Contrat : <span>{perso.debutContratPerso}</span>
 </Card.Text>
 </Card.Body>
 </Card>
 </div>
 <div className="card mb-3 border-0">
 <div className="row g-0">
 <div className="col">
 <div className="card-body">
 <div className='card-title h2 text-center mb-3 fw-bold'>
 Informations sur le recrutement du {formatdate}
 {['right'].map((placement) => (
 <OverlayTrigger
 key={placement}
 placement={placement}
 overlay={
 <Tooltip id={`tooltip-${placement}`}>
 <strong>Télécharger recrutement</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3'>
 <PDFDownloadLink document={<CreateRecrutementPdf perso={perso}/>} fileName='recrutement'>
 <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
 </PDFDownloadLink>
 </Button>
 </OverlayTrigger>
 ))}
 </div>
 <ListGroup>
 <ListGroup.Item>
 <p><span className='fs-6 my-3'>Noms et prénoms du personnel </span><span className='fw-bold ms-3'>{perso.nomPerso+' '+perso.prenomPerso }</span></p>
 <p><span className='fs-6 my-3'>Date de naissance </span><span className='fw-bold ms-3'>{perso.dateNaissancePerso }</span></p>
 <p><span className='fs-6 my-3'>Adresse </span><span className='fw-bold ms-3'>{perso.adressePerso }</span></p>
 <p><span className='fs-6 my-3'>Numéro de téléphone </span><span className='fw-bold ms-3'>{perso.telPerso }</span></p>
 <p><span className='fs-6 my-3'>Poste </span><span className='fw-bold ms-3'>{perso.postePerso} </span></p>
 <p><span className='fs-6 my-3'>Email </span><span className='fw-bold ms-3'>{perso.emailPerso }</span></p>
 <p><span className='fs-6 my-3'>Diplome </span><span className='fw-bold ms-3'>{perso.diplomePerso }</span></p>
 <p><span className='fs-6 my-3'>Type de contrat </span><span className='fw-bold ms-3'>{perso.typeContratPerso }</span></p>
 <p><span className='fs-6 my-3'>sexe </span><span className='fw-bold ms-3'>{perso.sexePerso }</span></p>
 <p><span className='fs-6 my-3'>Salaire </span><span className='fw-bold ms-3'>{perso.salairePerso }FCFA</span></p>
 <p><span className='fs-6 my-3'>Date debut contrat </span><span className='fw-bold ms-3'>{perso.debutContratPerso} </span></p>
 <p><span className='fs-6 my-3'>Date fin contrat </span><span className='fw-bold ms-3'>{perso.finContratPerso }</span></p>
 </ListGroup.Item>
 </ListGroup>
 </div>
 </div>
 </div>
 </div>
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

export default VoirPersonnel;