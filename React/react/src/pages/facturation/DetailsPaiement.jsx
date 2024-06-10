import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Container, Row, Col, Table, Card, Button, OverlayTrigger, Tooltip, Nav, Breadcrumb} from "react-bootstrap";
import axios from "axios";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {AiOutlineDownload} from 'react-icons/ai';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import ReactLoading from 'react-loading';

const CreateStagePdf = ({ absc, etud }) => {
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
                            {
                                etud && etud.length > 0 && (
                                    <>
                                        <Text style={styles.info}>
                                            <Text style={styles.bolds}>{etud[0].nomEtud + ' ' + etud[0].prenomEtud}</Text>
                                        </Text>
                                        <Text style={styles.info}>
                                            Filière: <Text style={styles.bold}>{etud[0].nomForm}</Text>
                                        </Text>
                                        <Text style={styles.info}>
                                            <Text style={styles.bold}>Douala</Text>
                                        </Text>
                                        <Text style={styles.info}>
                                            <Text style={styles.bold}>Cameroun</Text>
                                        </Text>
                                    </>
                                )
                            }
                        </View>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <Text style={styles.title}>Informations sur le(s) paiements</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Date</Text>
                        <Text style={styles.tableCellHeader}>Montant</Text>
                        <Text style={styles.tableCellHeader}>Moyen</Text>
                        <Text style={styles.tableCellHeader}>Prochain</Text>
                    </View>
                    {absc.map((element, index) => {

                            return(
                                <>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{element.created_at.split(' ')[0]}</Text>
                                        <Text style={styles.tableCell}>{element.MontantPaiement}</Text>
                                        <Text style={styles.tableCell}>{element.MoyenPaiement}</Text>
                                        <Text style={styles.tableCell}>{element.ProchainPaiement}</Text>
                                    </View>
                                </>
                            )
                        }
                    )}
                </View>

                
                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>INFORMATIONS SUR</Text>
                        <Text style={styles.bold}>LE(S) PAIEMENTS</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>Ce document est imprimé</Text>
                        <Text style={styles.bold}> pour chaque paiement</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const DetailsPaiement = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [absc, setabsc] = useState([])
    const [etud, setetud] = useState([])

    const {id}=useParams()
    const nomForm = absc.nomForm
    localStorage.setItem('nomForm',nomForm)
    localStorage.getItem('nomForm')

    const [found, setfound] = useState(false)
    let total = 0

    async function getPaiement() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement/${id}`);
            setabsc(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function getEtudiant() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/edit-student/${id}`);
            setetud(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    console.log(etud.nomForm);

    useEffect(() => {
        if (!load===true){
            getPaiement()
            getEtudiant()
        }
    },[fresh])

    return (
        <>
            <Container fluid>
                <HeaderGeneral />
                <Row>
                    <Col>
                        <BarreLateraleFact />
                    </Col>
                    <Col className='col-lg-12'>
                        <main id="main" className="main">

                            <div className="pagetitle">
                                <h1>Voir details paiement</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><NavLink to={`/fact/registre_facture/${nomForm}`}>Paiement par formation</NavLink></li>
                                        <li className="breadcrumb-item active">Voir details paiement</li>
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
                                                            Noms etudiant : <span>{etud.nomEtud + ' ' + etud.prenomEtud}</span>
                                                        </Card.Text>

                                                        <Card.Text>
                                                            Filière : <span>{etud.formation_id && etud.formation.nomForm}</span>
                                                        </Card.Text>

                                                        <Card.Text>
                                                            Matricule : <span>HTTVC0{etud.id}</span>
                                                        </Card.Text>
                                                        
                                                    </Card.Body>
                                                </Card>

                                                    
                                                
                                            </div>
                                            <div className="card mb-3 border-0">
                                                <div className="row g-0">
                                                    <div className="col">
                                                        <div className="card-body">
                                                            <div className='card-title h2 text-center mb-3 fw-bold'>
                                                                Informations sur le(s) paiement(s) 
                                                                {['right'].map((placement) => (
                                                                    <OverlayTrigger
                                                                        key={placement}
                                                                        placement={placement}
                                                                        overlay={
                                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                                <strong>Télécharger paement</strong>.
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <Button variant="transparent" className='mb-3 ms-3'>
                                                                            <PDFDownloadLink document={<CreateStagePdf absc={absc} total={total} etud={etud} />} fileName='stage'>
                                                                                <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                            </PDFDownloadLink>
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                ))}
                                                            </div>
                                                            <Table responsive className='table table-borderless datatable'>
                                                                <thead style={{backgroundColor: '#1A3C30' , height:'50px'}} className='text-white fs-6 items-center'>
                                                                <tr>
                                                                <th>Date Du Paiement</th>
                                                                <th>Reference</th>
                                                                <th>Filière</th>
                                                                <th>Etudiant</th>
                                                                <th>Montant</th>
                                                                <th>Moyen de Paiement</th>
                                                                <th>Motif</th>
                                                                <th>Prochain Paiement</th>
                                                                </tr>
                                                                </thead>
                                                                {
                                                                    absc.length === 0 
                                                                    ?
                                                                     <tbody>
                                                                         <tr>
                                                                             <td colSpan={15} align='center'>
                                                                                 <p className='text-danger fw-bold mt-5'>Pas de Paiement</p>
                                                                             </td>
                                                                         </tr>
                                                                     </tbody>
                                                                     :
                                                                     <tbody>

                                                                {
                                                                load ?
                                                                    <tr>
                                                                        <td colSpan={15} align='center'>
                                                                        <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
                                                                        </td>
                                                                    </tr>
                                                                :
                                                                absc.map((element,index) => {
                                                                    total = total + element.MontantPaiement
                                                                return(
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td>{element.created_at.split(' ')[0]}</td>
                                                                            <td>{element.RefPaiement}</td>

                                                                            <td key={index}>{element.nomForm}</td>
                                                                            <td key={index}>{element.nomEtud+' '+element.prenomEtud}</td>
                                                                            <td key={index}>{element.MontantPaiement} FCFA</td>
                                                                            <td>{element.MoyenPaiement}</td>
                                                                            <td>{element.MotifPaiement}</td>
                                                                            <td>{element.ProchainPaiement}</td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                                })


                                                                }
                                                                </tbody>
                                                                }
                                                            </Table>
                                                            {
                                                                absc.length === 0 
                                                              ?
                                                              <p></p>
                                                              :
                                                              <p className='mt-3 fs-5'>Total : <span className='fw-bold'>{total} </span>FCFA</p>
                                                            }
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

export default DetailsPaiement;