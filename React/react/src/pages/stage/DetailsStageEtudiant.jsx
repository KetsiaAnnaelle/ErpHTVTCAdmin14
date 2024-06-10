import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Container, Row, Col, ListGroup, Card, Button, OverlayTrigger, Tooltip, Nav, Breadcrumb} from "react-bootstrap";
import axios from "axios";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {AiOutlineDownload} from 'react-icons/ai';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";

const CreateStagePdf = ({ absc }) => {
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
            padding: 8,
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
                                <Text style={styles.bolds}>{absc.nomEtud + ' ' + absc.prenomEtud}</Text>
                            </Text>
                            <Text style={styles.info}>
                                Filière: <Text style={styles.bold}>{absc.nomForm}</Text>
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
                    <Text style={styles.title}>Informations sur le stage</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Noms</Text>
                        <Text style={styles.tableCellHeader}>{absc.nomEtud+' '+absc.prenomEtud}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Nom de l'entreprise</Text>
                        <Text style={styles.tableCellHeader}>{absc.nomEntrSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Date de debut du stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.dateDebSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Date de fin du stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.dateFinSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Projet du stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.projetSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Statut du projet de stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.statutProjSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Lien du rapport de stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.rapSta}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Note du stage</Text>
                        <Text style={styles.tableCellHeader}>{absc.noteSta}</Text>
                    </View>
                </View>
                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>INFORMATIONS SUR</Text>
                        <Text style={styles.bold}>LE STAGE</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>Ce document est imprimé</Text>
                        <Text style={styles.bold}> pour chaque stage</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const DetailsStageEtudiant = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [absc, setabsc] = useState({})

    const {id}=useParams()
    const nomForm = absc.nomForm
    localStorage.setItem('nomForm',nomForm)
    localStorage.getItem('nomForm')

    async function getStage() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/stage/${id}`);
            setabsc(response.data);
            console.log(response.data)
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getStage()
            setload(true)
        }
    },[fresh,load])

    const createdDate = new Date(absc.created_at);
    const formatdate = createdDate.toLocaleDateString();

    return (
        <>
            <Container fluid>
                <HeaderGeneral />
                <Row>
                    <Col>
                        <BarreLateraleEtud />
                    </Col>
                    <Col className='col-lg-12'>
                        <main id="main" className="main">

                            <div className="pagetitle">
                                <h1>Voir details stage</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><NavLink to={`/stage_formation/${nomForm}`}>Stage par formation</NavLink></li>
                                        <li className="breadcrumb-item active">Voir details stage</li>
                                    </ol>
                                </nav>
                            </div>

                            <section className="section form">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="row">

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
                                                            Noms etudiant : <span> {absc.nomEtud +' '+ absc.prenomEtud}</span>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Filière : <span> {absc.nomForm}</span>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Matricule : <span> HTTVC0{absc.etudiant_id}</span>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            Date Inscription : <span>{formatdate}</span>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            <div className="card mb-3 border-0">
                                                <div className="row g-0">
                                                    <div className="col">
                                                        <div className="card-body">
                                                            <div className='card-title h2 text-center mb-3 fw-bold'>
                                                                Informations sur le stage
                                                                {['right'].map((placement) => (
                                                                    <OverlayTrigger
                                                                        key={placement}
                                                                        placement={placement}
                                                                        overlay={
                                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                                <strong>Télécharger stage</strong>.
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <Button variant="transparent" className='mb-3 ms-3'>
                                                                            <PDFDownloadLink document={<CreateStagePdf absc={absc}/>} fileName='stage'>
                                                                                <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                            </PDFDownloadLink>
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                ))}
                                                            </div>
                                                            <ListGroup>
                                                                <ListGroup.Item>
                                                                    <p><span className='fs-6 my-3'>Noms et prénoms de l'etudiant </span><span className='fw-bold ms-3'>{absc.nomEtud+' '+absc.prenomEtud }</span></p>
                                                                    <p><span className='fs-6 my-3'>Nom de l'entreprise </span><span className='fw-bold ms-3'>{absc.nomEntrSta }</span></p>
                                                                    <p><span className='fs-6 my-3'>Date de debut du stage </span><span className='fw-bold ms-3'>{absc.dateDebSta }</span></p>
                                                                    <p><span className='fs-6 my-3'>Date de fin du stage </span><span className='fw-bold ms-3'>{absc.dateFinSta }</span></p>
                                                                    <p><span className='fs-6 my-3'>Intitulé du projet de stage </span><span className='fw-bold ms-3'>{absc.projetSta} </span></p>
                                                                    <p><span className='fs-6 my-3'>Statut du projet de stage </span><span className='fw-bold ms-3'>{absc.statutProjSta }</span></p>
                                                                    <p><span className='fs-6 my-3'>Lien du rapport de stage </span><span className='fw-bold ms-3'>{absc.rapSta }</span></p>
                                                                    <p><span className='fs-6 my-3'>Note du stage </span><span className='fw-bold ms-3'>{absc.noteSta }</span></p>
                                                                </ListGroup.Item>
                                                            </ListGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </section>

                        </main>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default DetailsStageEtudiant;