import React, {useEffect, useState, useRef} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {Link, NavLink, useParams} from "react-router-dom";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import axios from "axios";
import ReactLoading from "react-loading";
import {FaEdit, FaEye, FaFilter, FaTrashAlt} from "react-icons/fa";
import { Page, Text, View, Document, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import {AiOutlineDownload} from "react-icons/ai";

const CreateAbscencePdf = ({ absc,nomEtud, prenomEtud, nomForm }) => {
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

    let total = 0
    let totalJustifie = 0
    let totalNonJustifie = 0
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
                                <Text style={styles.bolds}>{nomEtud + ' ' + prenomEtud}</Text>
                            </Text>
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
                    <Text style={styles.title}>Informations sur l'absence</Text>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Date</Text>
                        <Text style={styles.tableCellHeader}>Cours</Text>
                        <Text style={styles.tableCellHeader}>Heure(s)</Text>
                        <Text style={styles.tableCellHeader}>Type</Text>
                        <Text style={styles.tableCellHeader}>Motif</Text>
                    </View>
                    {absc.map((element, index) => {

                        if(element.typeAbs === 'Absence Justifiée')
                        {
                            totalJustifie = totalJustifie + element.nbreHeureAbs
                        }
                        if(element.typeAbs === 'Absence Non Justifiée')
                        {
                            totalNonJustifie = totalNonJustifie + element.nbreHeureAbs
                        }
                        total = totalJustifie + totalNonJustifie

                            return(
                                <>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{element.dateAbs}</Text>
                                        <Text style={styles.tableCell}>{element.nomCours}</Text>
                                        <Text style={styles.tableCell}>{element.nbreHeureAbs}</Text>
                                        <Text style={styles.tableCell}>{element.typeAbs}</Text>
                                        <Text style={styles.tableCell}>{element.motifAbs}</Text>
                                    </View>
                                </>
                            )
                        }
                    )}
                </View>
                <View>
                    <Text style={styles.info}>Total Justifié: {totalJustifie}</Text>
                    <Text style={styles.info}>Total Non Justifié: {totalNonJustifie}</Text>
                    <Text style={styles.info}>Total: {total}</Text>
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

const DetailsAbsenceEtudiant = () => {

    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const {id}=useParams()
    const nomForm = localStorage.getItem('nomForm')
    const [abs, setabs] = useState([])
    const [seRecords, setSeRecords] = useState([]);
    const [originalData, setOriginalData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['nomCours'];

    let total = 0
    let totalJustifie = 0
    let totalNonJustifie = 0

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);

    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
        selectedCours: 'Choissir le cours',
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCours, setSelectedCours] = useState('');

    const [nomEtudiant, setNomEtudiant] = useState('')
    const [prenomEtudiant, setPrenomEtudiant] = useState('')
    const [form, setform] = useState('')

    async function getAbsences() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/abscences/formation/${nomForm}/etudiant/${id}`);
            setabs(response.data);
            setSeRecords(response.data)
            console.log(response.data)
            setform(response.data[0].nomForm);
            setNomEtudiant(response.data[0].nomEtud);
            setPrenomEtudiant(response.data[0].prenomEtud);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getAbsences()
        }
    },[fresh])


    const filterAbsences = () => {

        const filteredRecords = seRecords.filter((record) => {
            const matchCours =
                selectedCours === '' || record.nomCours === selectedCours;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.dateAbs);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchCours && dateFilter;
        });

        setSeRecords(filteredRecords);
    };


    useEffect(() => {
        filterAbsences();
    }, [selectedCours, startDate, endDate]);

    const handleShowFilter = () => {
        // Sauvegarde des valeurs actuelles des filtres dans initialFilters
        setInitialFilters({
            startDate,
            endDate,
            selectedCours,
        });

        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate(initialFilters.startDate);
        setEndDate(initialFilters.endDate);
        setSelectedCours(initialFilters.selectedCours);
        setSeRecords(abs)
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
                            <h1>Details sur l'absence</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={`/fiche_absence/${nomForm}`}>Fiche d'absence</NavLink></li>
                                    <li className="breadcrumb-item active">Details sur l'absence d'un etudiant</li>
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
                                                    Details sur l'absence d'un etudiant
                                                </h3>

                                            </div>
                                            <div className="card-body">
                                                <Form className=''>
                                                    <Row className='d-flex justify-content-center mb-3'>
                                                        <Col className='col-md-3 mt-4'>
                                                            <p>Noms : <span className='fw-bold'>{abs.length > 0 ? abs[0].nomEtud + ' ' + abs[0].prenomEtud : ''}</span></p>
                                                        </Col>
                                                        <Col className='col-md-3 mt-4'>
                                                            <p>Filière : <span className='fw-bold'>{form}</span></p>
                                                        </Col>
                                                        <Col className='col-md-1 mt-4'>
                                                            {['right'].map((placement) => (
                                                                <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                            <strong>Filtrer les absences</strong>.
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
                                                                            <strong>Télécharger absence</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                        <PDFDownloadLink document={<CreateAbscencePdf absc={abs} nomEtud={nomEtudiant} prenomEtud={prenomEtudiant} nomForm={form}/>} fileName='absence'>
                                                                            <AiOutlineDownload size={32} className='text-primary mt-4 mb-3 mx-3'/>
                                                                        </PDFDownloadLink>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                        <Col className='col-md-2 mt-4'>
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

                                                                    <Col className='col-md-3'>
                                                                        <Form.Group className="mb-4" controlId="dateDeb">
                                                                            <span>Periode de</span>
                                                                            <Form.Control  type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col className='col-md-4'>
                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                            <span>à</span>
                                                                            <Form.Control  type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col className='col-md-4'>
                                                                        <span>Cours</span>
                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedCours} onChange={(e) => setSelectedCours(e.target.value)}>
                                                                            <option>Choisir le cours</option>
                                                                            {
                                                                                abs.length !== 0 && (
                                                                                    [...new Set(abs.map((element) => element.nomCours))].map((nom, index) => {
                                                                                        return (
                                                                                            <option key={index} value={nom}>{nom}</option>
                                                                                        );
                                                                                    })
                                                                                )
                                                                            }
                                                                        </Form.Select>
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

                                                {
                                                    load ?
                                                        <center>
                                                            <tr>
                                                                <td colSpan={15} align='center'>
                                                                    <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
                                                                </td>
                                                            </tr>
                                                        </center>
                                                        :
                                                        <>
                                                            <Table responsive className='table table-borderless datatable'>
                                                                <thead style={{backgroundColor: '#1A3C30' , height:'50px'}} className='text-white fs-6 items-center'>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <th>Cours</th>
                                                                    <th>Heure(s)</th>
                                                                    <th>Type</th>
                                                                    <th>Motif</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    seRecords.map((element,index) => {

                                                                        if(element.typeAbs === 'Absence Justifiée')
                                                                        {
                                                                            totalJustifie = totalJustifie + element.nbreHeureAbs
                                                                        }
                                                                        if(element.typeAbs === 'Absence Non Justifiée')
                                                                        {
                                                                            totalNonJustifie = totalNonJustifie + element.nbreHeureAbs
                                                                        }
                                                                        total = totalJustifie + totalNonJustifie

                                                                        return(
                                                                            <tr key={index}>
                                                                                <td>{element.dateAbs}</td>
                                                                                <td>{element.nomCours}</td>
                                                                                <td>{element.nbreHeureAbs}</td>
                                                                                <td>{element.typeAbs}</td>
                                                                                <td>{element.motifAbs}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                                </tbody>

                                                            </Table>
                                                            <div>
                                                                <p className=' fs-5'>Total Justifiè: <span className='text-success fw-bold'>{totalJustifie} </span>absence(s)</p>
                                                                <p className=' fs-5'>Total Non Justifiè: <span className='text-warning fw-bold'>{totalNonJustifie} </span>absence(s)</p>
                                                                <p className=' fs-5'>Total: <span className='text-primary fw-bold'>{total} </span>absence(s)</p>
                                                            </div>
                                                        </>
                                                }
                                                        </div>
                                            </div>
                                            <div className="card-footer">

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

export default DetailsAbsenceEtudiant;