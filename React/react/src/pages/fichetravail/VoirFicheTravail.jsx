import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";
import.meta.env.VITE_URL;
import axios from "axios";

const CreateFicheTravailPdf = ({ perso }) => {

    const createdDate = new Date(perso.created_at);
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
            marginTop:150
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
                    <Text style={styles.title}>Informations sur la fiche de travail du {formatdate}</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Description</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{perso.description}</Text>
                    </View>
                </View>
                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>INFORMATIONS SUR</Text>
                        <Text style={styles.bold}>LA FICHE DE TRAVAIL</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>Ce document est imprimé</Text>
                        <Text style={styles.bold}> pour chaque fiche de travail</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const VoirFicheTravail = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [perso, setperso] = useState([])

    const {id}=useParams()

    async function getFicheTravail() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/ficheTravail/${id}`);
            setperso(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
           getFicheTravail()
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
                            <h1>Voir Fiche de Travail</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/personnel/fiche_travail">Fiches de Travail</NavLink></li>
                                    <li className="breadcrumb-item active">Voir fiche de travail</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Informations sur la fiche de travail</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <h3 className="card-title">Fiche de travail du {formatdate} de Mr/Mme {perso.nomPerso+' '+perso.prenomPerso}</h3>
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
                                                                                                        Matricule : <span> HTTVCP0{perso.personnel_id}</span>
                                                                                                    </Card.Text>
                                                                                                </Card.Body>
                                                                                            </Card>
                                                                                        </div>
                                                                                        <div className="card mb-3 border-0">
                                                                                            <div className="row g-0">
                                                                                                <div className="col">
                                                                                                    <div className="card-body">
                                                                                                        <div className='card-title h2 text-center mb-3 fw-bold'>
                                                                                                            Informations
                                                                                                            {['right'].map((placement) => (
                                                                                                                <OverlayTrigger
                                                                                                                    key={placement}
                                                                                                                    placement={placement}
                                                                                                                    overlay={
                                                                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                                                                            <strong>Télécharger la fiche de travail</strong>.
                                                                                                                        </Tooltip>
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                                                                        <PDFDownloadLink document={<CreateFicheTravailPdf perso={perso}/>} fileName='ficheTravail'>
                                                                                                                            <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                                                                        </PDFDownloadLink>
                                                                                                                    </Button>
                                                                                                                </OverlayTrigger>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                        <ListGroup>
                                                                                                            <ListGroup.Item>
                                                                                                                <p><span className='fs-6 my-3'>Noms et prénoms du personnel </span><span className='fw-bold ms-3'>{perso.nomPerso+' '+perso.prenomPerso }</span></p>
                                                                                                                <p><span className='fs-6 my-3'>Date </span><span className='fw-bold ms-3'>{formatdate }</span></p>
                                                                                                                <p><span className='fs-6 my-3'>Description </span><span className='fw-bold ms-3'>{perso.description }</span></p>
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
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                Footer
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

export default VoirFicheTravail;