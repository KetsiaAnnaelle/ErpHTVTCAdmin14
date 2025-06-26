import React, {useEffect, useState, useRef} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {Link, NavLink, useParams} from "react-router-dom";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import axios from "axios";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaFilter, FaTrashAlt} from "react-icons/fa";
import { startOfDay, addDays, isSunday, format, subDays, differenceInDays, parseISO } from 'date-fns';
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";


const CreateStagePdf = ({ abs, nomForm }) => {

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
            marginBottom: 10,
            marginTop: 10,
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
            marginTop: 10,
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

    let total = 0
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
                                Filière: <Text style={styles.bold}>{nomForm}</Text>
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
                                <Text style={styles.tableCellHeader}>Nom Entreprise</Text>
                            </View>
                            {
                                    abs.map((element, index) => {

                                        total += 1

                                        return(
                                            <>
                                                <View style={styles.tableRow} key={index}>
                                                    <Text style={styles.tableCell}>{element.nomEtud+' '+element.prenomEtud}</Text>
                                                    <Text style={styles.tableCell}>{element.nomEntrSta}</Text>
                                                </View>
                                            </>
                                        )
                                    })
                            }
                        <Text style={styles.title}>Total de stage: {total}</Text>
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

const StageFilière = () => {

    const currentDate = new Date();
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const {nomForm}=useParams()
    localStorage.setItem('nomForm', nomForm)
    const [form, setform] = useState([])
    const [abs, setabs] = useState([])
    const [records, setRecords] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['nomEntrSta', 'projetSta', 'statutProjSta', 'dateDebSta'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [seRecords, setSeRecords] = useState([]);

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);

    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
    });

    const lastSixDays = Array.from({ length: 6 }, (_, index) => {
        const day = addDays(startOfDay(currentDate), -index);
        return isSunday(day) ? addDays(day, -1) : day;
    });

    async function getStages() {
        try {
            setload(true);
            const response = await axios.get(`${import.meta.env.VITE_URL}/stage/formation/${nomForm}/etudiant`);
            setabs(response.data);
            setRecords(response.data);
            setload(false);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Attendre un certain temps avant de réessayer (par exemple, 5 secondes)
                await new Promise(resolve => setTimeout(resolve, 5000));
                // Réessayer la requête
                getStages();
            } else {
                console.error(error);
            }
        }
    }
    

    useEffect(() => {
        if (!load===true){
            getStages()
        }
    },[fresh])

    const filterStage = () => {
        const filteredRecords = abs.filter((record) => {
            const recordDate = new Date(record.dateDebSta);
    
            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));
    
            return dateFilter;
        });
    
        setRecords(filteredRecords);
    };

    useEffect(() => {
            filterStage();
    }, [startDate, endDate]);

    const handleShowFilter = () => {
        // Initialisation de startDate et endDate avec les valeurs actuelles
        setStartDate(startDate);
        setEndDate(endDate);
    
        // Sauvegarde des valeurs actuelles des filtres dans initialFilters
        setInitialFilters({
            startDate,
            endDate,
        });
    
        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate(initialFilters.startDate);
        setEndDate(initialFilters.endDate);
        setRecords(abs)
    };

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Liste des stages</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/choix_formation_stage">Choisir Formation</NavLink></li>
                                    <li className="breadcrumb-item active">Liste des stages</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    Liste des stages de la filière <span className='fw-bold'>{form.nomForm}</span>
                                                </h3>

                                            </div>
                                            <div className="card-body">
                                                <Form className=''>
                                                    <Row className='d-flex justify-content-center mb-3'>
                                                        <Col className='col-md-3 mt-4'>
                                                            <Form.Group className="mb-3 ms-3" controlId="module" style={{ position: 'relative', marginLeft:'-30px' }}>
                                                                <Form.Control size="lg" type="text" placeholder="Rechercher" onChange={(e) => setSearchQuery(e.target.value)} />
                                                                <BsSearch className='fs-5' style={{ position: 'absolute', top: '15px', left: '88%' }}/>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col className='col-md-2 mt-4'>
                                                            {['right'].map((placement) => (
                                                                <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                            <strong>Filtrer les stages</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3 border-0' onClick={handleShowFilter} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaFilter className="text-primary" size={24} style={{ cursor:'pointer' }}/></Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                        <Col className='col-md-2'>
                                                            {['right'].map((placement) => (
                                                                <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                            <strong>Télécharger fiche stage</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                        <PDFDownloadLink document={<CreateStagePdf abs={abs} nomForm={nomForm} />} fileName='fiche_absence'>
                                                                            <AiOutlineDownload size={32} className='text-primary mt-4 mb-3 mx-3'/>
                                                                        </PDFDownloadLink>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                        <Col className='col-md-3 mt-4'>
                                                            <p>Période : <span className='fw-bold'> {startDate} - {endDate}</span></p>
                                                        </Col>
                                                    </Row>
                                                </Form>

                                                <Row className='d-flex justify-content-center'>

                                                    <Modal
                                                        show={showFilter}
                                                        onHide={handleCloseFilter}
                                                        backdrop="static"
                                                        keyboard={false}
                                                    >
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Filtre</Modal.Title>
                                                        </Modal.Header>

                                                        <Modal.Body>
                                                            <Form>
                                                                <Row className='d-flex justify-content-center'>

                                                                    <Col className='col-md-4'>
                                                                        <Form.Group className="mb-3" controlId="dateDeb">
                                                                            <span>Periode de</span>
                                                                            <Form.Control size="lg" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col className='col-md-4'>
                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                            <span>à</span>
                                                                            <Form.Control size="lg" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Modal.Body>

                                                        <Modal.Footer>
                                                            <Button variant="primary" onClick={resetFilters}>Réinitialiser</Button>
                                                            <Button variant="secondary" onClick={handleCloseFilter}>
                                                                Annuler
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>

                                                </Row>

                                                <Table responsive className='table table-borderless datatable'>
                                                            <thead style={{backgroundColor: '#1A3C30' , height:'50px'}} className='text-white fs-6 items-center'>
                                                            <tr>
                                                                <th></th>
                                                                <th>Noms</th>
                                                                <th>Nom Entreprise</th>
                                                                <th>Date</th>
                                                                <th>Projet</th>
                                                                <th>Statut</th>
                                                                <th>Rapport</th>
                                                                <th>Note</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                records.filter((etudiant) =>
                                                                        keys.some((key) => {
                                                                            const value = etudiant[key];
                                                                            if (typeof value === 'string') {
                                                                                return value.toLowerCase().includes(searchQuery);
                                                                            }
                                                                            // if (typeof value === 'int') {
                                                                            //     return value.toLowerCase().includes(searchQuery);
                                                                            // }
                                                                        })
                                                                    ).map((etudiant, etudiantIndex) => {
                                                                    return(
                                                                        <tr key={etudiantIndex}>
                                                                            <td>
                                                                                {['bottom'].map((placement) => (
                                                                                    <OverlayTrigger
                                                                                        key={placement}
                                                                                        placement={placement}
                                                                                        overlay={
                                                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                                                <strong>Voir stage</strong>.
                                                                                            </Tooltip>
                                                                                        }
                                                                                    >
                                                                                        <Button variant="transparent"
                                                                                                className='mb-3 ms-3'>
                                                                                            <Link
                                                                                                to={`/abs/detail_stage_etudiant/${etudiant.etudiant_id}`}>
                                                                                                <FaEye className="text-warning"
                                                                                                       style={{cursor: 'pointer'}}/>
                                                                                            </Link>
                                                                                        </Button>
                                                                                    </OverlayTrigger>
                                                                                ))}
                                                                            </td>
                                                                            <td>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</td>
                                                                           <td>{etudiant.nomEntrSta}</td>
                                                                           <td>{etudiant.dateDebSta}</td>
                                                                            <td>{etudiant.projetSta}</td>
                                                                            <td>{etudiant.statutProjSta}</td>
                                                                            <td>{etudiant.rapSta}</td>
                                                                            <td>{etudiant.noteSta}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>

                                                        </Table>

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

export default StageFilière;