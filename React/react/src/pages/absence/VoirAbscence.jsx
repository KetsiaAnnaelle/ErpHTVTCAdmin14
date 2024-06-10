import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Container, Row, Col, ListGroup, Card, Button, OverlayTrigger, Tooltip, Nav, Breadcrumb} from "react-bootstrap";
import axios from "axios";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {AiOutlineDownload} from 'react-icons/ai';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";

const CreateAbscencePdf = ({ absc }) => {
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
            marginTop:350
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

    console.log(absc)
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
                    <Text style={styles.title}>Informations sur l'absence</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Filière</Text>
                        <Text style={styles.tableCellHeader}>Cours</Text>
                        <Text style={styles.tableCellHeader}>Date</Text>
                        <Text style={styles.tableCellHeader}>Type</Text>
                        <Text style={styles.tableCellHeader}>Heures</Text>
                        <Text style={styles.tableCellHeader}>Motif</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>{absc.nomForm}</Text>
                        <Text style={styles.tableCell}>{absc.nomCours}</Text>
                        <Text style={styles.tableCell}>{absc.dateAbs}</Text>
                        <Text style={styles.tableCell}>{absc.typeAbs}</Text>
                        <Text style={styles.tableCell}>{absc.nbreHeureAbs}</Text>
                        <Text style={styles.tableCell}>{absc.motifAbs}</Text>
                    </View>
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

const VoirAbscence = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [absc, setabsc] = useState([])

    const {id}=useParams()

    async function getAbscence() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/abscence/${id}`);
            setabsc(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getAbscence()
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
                                <h1>Voir Absence</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><NavLink to="/etud/abscence">Absences</NavLink></li>
                                        <li className="breadcrumb-item active">Voir Absence</li>
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
                                                            Informations sur l'absence du {absc.dateAbs}
                                                            {['right'].map((placement) => (
                                                                <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                            <strong>Télécharger absence</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                        <PDFDownloadLink document={<CreateAbscencePdf absc={absc}/>} fileName='absence'>
                                                                            <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                        </PDFDownloadLink>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </div>
                                                        <ListGroup>
                                                            <ListGroup.Item>
                                                                <p><span className='fs-6 my-3'>Noms et prénoms de l'etudiant </span><span className='fw-bold ms-3'>{absc.nomEtud+' '+absc.prenomEtud }</span></p>
                                                                <p><span className='fs-6 my-3'>Nom du cours </span><span className='fw-bold ms-3'>{absc.nomCours }</span></p>
                                                                <p><span className='fs-6 my-3'>Nom de la filière </span><span className='fw-bold ms-3'>{absc.nomForm }</span></p>
                                                                <p><span className='fs-6 my-3'>Date de l'absence </span><span className='fw-bold ms-3'>{absc.dateAbs }</span></p>
                                                                <p><span className='fs-6 my-3'>Type d'absence </span><span className='fw-bold ms-3'>{absc.typeAbs} </span></p>
                                                                <p><span className='fs-6 my-3'>Nombre d'heures d'absence </span><span className='fw-bold ms-3'>{absc.nbreHeureAbs }</span></p>
                                                                <p><span className='fs-6 my-3'>Motif de l'absence </span><span className='fw-bold ms-3'>{absc.motifAbs }</span></p>
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

export default VoirAbscence;