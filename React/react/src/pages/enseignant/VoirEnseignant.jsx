import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";
import axios from "axios";
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";
import.meta.env.VITE_URL;

const CreateRecrutementPdf = ({ ens }) => {
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
        boldHeader: {
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
                                <Text style={styles.bolds}>{ens.nomEns + ' ' + ens.prenomEns}</Text>
                            </Text>
                            <Text style={styles.info}>
                                Filière: <Text style={styles.bold}>{ens.nomForm}</Text>
                            </Text>
                            <Text style={styles.info}>
                                Cours: <Text style={styles.bold}>{ens.nomCours}</Text>
                            </Text>
                            <Text style={styles.info}>
                                <Text style={styles.bold}>{ens.villeEns}</Text>
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
                        <Text style={styles.info}>
                            Né le
                            <Text style={styles.bold}>  {ens.dateNaisEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Email
                            <Text style={styles.bold}>  {ens.emailEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Numéro CNI
                            <Text style={styles.bold}>  {ens.cniEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Genre
                            <Text style={styles.bold}>  {ens.genreEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Téléphone
                            <Text style={styles.bold}>  {ens.telEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Téléphone WhatstApp
                            <Text style={styles.bold}>  {ens.whatstappEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Niveau d'etude
                            <Text style={styles.bold}>  {ens.nivEtudeEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Dernier Diplome
                            <Text style={styles.bold}>  {ens.dernDiplEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            Type contrat
                            <Text style={styles.bold}>  {ens.typeContratEns}</Text>
                        </Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.info}>
                            salaire
                            <Text style={styles.bold}>  {ens.salaireEns}FCFA</Text>
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

const VoirEnseignant = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [ens, setens] = useState([])

    const {id}=useParams()

    async function getEnseignant() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/enseignant/${id}`);
            setens(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getEnseignant()
            setload(true)
        }
    },[fresh,load])

    const createdDate = new Date(ens.created_at);
    const formatdate = createdDate.toLocaleDateString();

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
                            <h1>Voir Enseignant</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/recrutement_enseignant">Recrutement</NavLink></li>
                                    <li className="breadcrumb-item active">Voir Enseignant</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Informations sur le recrutement de {ens.nomEns+' '+ens.prenomEns}</h3>
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
                                                                                Noms ensnnel : <span> {ens.nomEns+' '+ens.prenomEns}</span>
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                Filière : <span> {ens.nomForm}</span>
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                Cours : <span> {ens.nomCours}</span>
                                                                            </Card.Text>
                                                                            <Card.Text>
                                                                                Matricule : <span> HTTVCP0{ens.id}</span>
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
                                                                                                <PDFDownloadLink document={<CreateRecrutementPdf ens={ens}/>} fileName='recrutement_enseignant'>
                                                                                                    <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                                                </PDFDownloadLink>
                                                                                            </Button>
                                                                                        </OverlayTrigger>
                                                                                    ))}
                                                                                </div>
                                                                                <ListGroup>
                                                                                    <ListGroup.Item>
                                                                                        <p><span className='fs-6 my-3'>Noms et prénoms de l'enseignant </span><span className='fw-bold ms-3'>{ens.nomEns+' '+ens.prenomEns}</span></p>
                                                                                        <p><span className='fs-6 my-3'>Date de naissance </span><span className='fw-bold ms-3'>{ens.dateNaisEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Email </span><span className='fw-bold ms-3'>{ens.emailEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Numero CNI </span><span className='fw-bold ms-3'>{ens.cniEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Ville </span><span className='fw-bold ms-3'>{ens.villeEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Pays </span><span className='fw-bold ms-3'>{ens.paysEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Numéro de téléphone </span><span className='fw-bold ms-3'>{ens.telEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Numéro WhatstApp </span><span className='fw-bold ms-3'>{ens.whatstappEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Genre </span><span className='fw-bold ms-3'>{ens.genreEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Niveau d'etude </span><span className='fw-bold ms-3'>{ens.nivEtudeEns}</span></p>
                                                                                        <p><span className='fs-6 my-3'>Dernier diplome </span><span className='fw-bold ms-3'>{ens.dernDiplEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Type de contrat </span><span className='fw-bold ms-3'>{ens.typeContratEns }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Salaire </span><span className='fw-bold ms-3'>{ens.salaireEns } FCFA</span></p>
                                                                                        <p><span className='fs-6 my-3'>Filère </span><span className='fw-bold ms-3'>{ens.nomForm }</span></p>
                                                                                        <p><span className='fs-6 my-3'>Cours </span><span className='fw-bold ms-3'>{ens.nomCours}</span></p>
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

export default VoirEnseignant;