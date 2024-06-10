import React, {useEffect, useState, useContext} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {Link, NavLink, useParams} from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import axios from "axios";
import {BsSearch} from "react-icons/bs";
import { HiMiniCheckBadge } from "react-icons/hi2";
import {FaEdit, FaEye, FaFilter, FaTrashAlt} from "react-icons/fa";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";
import ReactLoading from "react-loading";

const CreateAbscencePdf = ({ abs, nomForm, seRecords, paie, paieEcheance }) => {
    let i = 0

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
            marginBottom: 10,
            marginTop: 10,
        },
        info: {
            fontSize: 12,
            marginBottom: 5,
        },
        infos: {
            fontSize: 16,
            marginVertical:10
        },
        bold: {
            fontWeight: 'bold',
            fontSize:12
        },
        bolds: {
            fontSize:12,
        },
        boldSS: {
            color: '#0D6EFD'
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

                <View style={styles.infos}>

                    <Text style={styles.bold}> Récapitulatif des paiements de la formation</Text>
                    <Text style={styles.boldSS}> {nomForm}</Text>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Noms</Text>
                        <Text style={styles.tableCellHeader}>Total</Text>
                        <Text style={styles.tableCellHeader}>Payé</Text>
                        <Text style={styles.tableCellHeader}>Restant</Text>
                        <Text style={styles.tableCellHeader}>Echeance</Text>
                    </View>
                    {
                        Object.entries(seRecords).map(([nomEtudiant, etudiantData], index) => {
                            i += 1
                                return(
                                    <>
                                        <View style={styles.tableRow} key={index}>
                                            <Text style={styles.tableCell}>{nomEtudiant}</Text>
                                            <Text style={styles.tableCell}>{etudiantData.total}</Text>
                                            <Text style={styles.tableCell}>{paie.map(obj => Object.values(obj)[i-1]) >= etudiantData.total ? etudiantData.total : paie.map(obj => Object.values(obj)[i-1])}</Text>
                                            <Text style={styles.tableCell}>{etudiantData.restant <= 0 ? 0 : etudiantData.total - paie.map(obj => Object.values(obj)[i-1])}</Text>
                                            <Text style={styles.tableCell}>{etudiantData.restant <= 0 ? 'Terminer' : paieEcheance[index]}</Text>
                                        </View>
                                    </>
                                )
                            }
                        )}
                </View>

                <View style={styles.contents}>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>INFORMATIONS SUR</Text>
                        <Text style={styles.bold}>LES PAIEMENTS</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.bold}>Ce document est imprimé</Text>
                        <Text style={styles.bold}> pour chaque formation</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};


const RegistreFact = () => {

    const currentDate = new Date();
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const {nomForm}=useParams()
    const [form, setform] = useState([])
    const [abs, setabs] = useState([])
    const [paie, setpaie] = useState([])
    const [echean, setecheance] = useState([])
    const [paieEcheance, setpaieEcheance] = useState([])

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['nomEtud'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [seRecords, setSeRecords] = useState([]);


    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);

    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
    });

    let payer = 0
    let res = 0

    async function getFacture() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/facture/formation/${nomForm}/etudiant`);
            setabs(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    async function getPaiementEtud() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement-etudiant-montant/${nomForm}`);
            setpaie(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    // console.log(paie.map(obj => Object.values(obj)[0]));
    
    let i = 0

    async function getPaiementEcheance() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement/form/${nomForm}/etud`);
            setpaieEcheance(response.data);
            console.log(response.data);
            setload(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getFacture()
            getPaiementEcheance()
            getPaiementEtud()
        }
    },[fresh])

    useEffect(() => {
        if (startDate && endDate) {
            filterAbsByPeriod();
        }
    }, [startDate, endDate]);

    const filterAbsByPeriod = () => {
        const filteredRecords = abs.filter((record) => {
            const recordDate = new Date(record.dateAbs);
            return recordDate >= startDate && recordDate <= endDate;
        });
        setSeRecords(filteredRecords);
    };

    const handleShowFilter = () => {
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
        setSeRecords(abs)
    };

    const groupByNomEtudiant = (abs) => {
        return abs.reduce((result, etudiant) => {
            const key = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

            if (!result[key]) {
                result[key] = {
                    total: 0,
                    paye: 0,
                    restant: 0,
                    echeance: '',
                    etudiant_id: '',
                    nomForm: '',
                    nomEtud: '',
                    prenomEtud: '',
                };
            }

            // Mettez à jour les montants
            result[key].total = etudiant.total;
            result[key].paye += etudiant.paye;
            result[key].restant = result[key].total - result[key].paye;
            result[key].echeance = etudiant.echeance
            result[key].etudiant_id = etudiant.etudiant_id
            result[key].nomForm = etudiant.nomForm
            result[key].nomEtud = etudiant.nomEtud
            result[key].prenomEtud = etudiant.prenomEtud

            // Vous pouvez également mettre à jour d'autres propriétés ici

            return result;
        }, {});
    };

    useEffect(() => {
        const groupedAbs = groupByNomEtudiant(abs);
        setSeRecords(groupedAbs);
    }, [abs]);

    console.log(paie);


    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleFact/>
                </Col>
                <Col className='col-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Paiement par formation</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/fact/choix_formation_facture">Choisir Formation</NavLink></li>
                                    <li className="breadcrumb-item active">Paiement par formation</li>
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
                                                    Récapitulatif des paiements de la formation <span className='fw-bold'>{nomForm}</span>
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
                                                                            <strong>Télécharger une liste de factures</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                        <PDFDownloadLink document={<CreateAbscencePdf abs={abs} nomForm={nomForm} seRecords={seRecords} paie={paie} paieEcheance={paieEcheance}/>} fileName='registe_facture'>
                                                                            <AiOutlineDownload size={32} className='text-primary mt-4 mb-3 mx-3'/>
                                                                        </PDFDownloadLink>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            ))}
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
                                                                        <Form.Group className="mb-3" controlId="dateDeb">
                                                                            <span>Periode de</span>
                                                                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col className='col-md-3'>
                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                            <span>à</span>
                                                                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
                                                            {
                                                                <>
                                                                    <Table responsive className='table table-borderless datatable'>
                                                                        <thead style={{backgroundColor: '#1A3C30', height:'50px'}} className='text-white fs-6 items-center'>
                                                                            <tr>
                                                                                <th></th>
                                                                                <th>Noms</th>
                                                                                <th>Total</th>
                                                                                <th>Payé</th>
                                                                                <th>Restant</th>
                                                                                <th>Echeance</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {/* {Object.entries(seRecords).map(([nomEtudiant, etudiantData], index) => {
                                                                            if(paieEcheance.length != 0 && (paieEcheance.length - 1) === index){
                                                                                paieEcheance.map((item) => {
                                                                                    setecheance(item.ProchainPaiement)
                                                                                })
                                                                            }
                                                                            return (
                                                                                <>
                                                                                    
                                                                                </>
                                                                            )
                                                                        })} */}
                                                                        
                                                                        {Object.entries(seRecords).map(([nomEtudiant, etudiantData], index) => {
                                                                    
                                                                            i += 1

                                                                            // const createdDate = new Date(etudiantData.created_at);
                                                                            // const formatdate = createdDate.toISOString();
                                                                            // const EcheanceDate = new Date(etudiantData.echeance);
                                                                            // const EcheanceDateFormat = EcheanceDate.toISOString();

                                                                            // function joursRestantsAvantDate(datePaiementActuel, dateEcheance) {
                                                                            //     // Convertir les chaînes de date en objets Date
                                                                            //     const datePaiement = new Date(datePaiementActuel);
                                                                            //     const echeance = new Date(dateEcheance);
                                                                                
                                                                            //     // Calculer la différence en millisecondes entre la date de paiement et la date d'échéance
                                                                            //     const differenceEnMs = echeance - datePaiement;
                                                                        
                                                                            //     let joursInitial
                                                                                
                                                                            //     // Obtenir la date d'aujourd'hui
                                                                            //     const aujourdHui = new Date();
                                                                            //     const differenceDatePaieVsToday = datePaiement- aujourdHui
                                                                                
                                                                            //     // Calculer la différence en millisecondes entre aujourd'hui et la date d'échéance
                                                                            //     const differenceJusqueEcheance = echeance - aujourdHui;
                                                                            //     console.log(echeance);
                                                                        
                                                                            //     if (differenceDatePaieVsToday == 0) {
                                                                            //         // Obtenir le nombre initial de jours entre la date de paiement et la date d'échéance
                                                                            //         joursInitial = Math.ceil(Math.abs(differenceEnMs) / (1000 * 60 * 60 * 24));
                                                                            //     }else if (differenceDatePaieVsToday <0) {
                                                                            //         // Obtenir le nombre initial de jours entre la date d'aujourd'hui et la date d'échéance
                                                                            //         joursInitial = Math.ceil(Math.abs(differenceJusqueEcheance) / (1000 * 60 * 60 * 24));
                                                                                    
                                                                            //     }
                                                                                
                                                                            //     // Comparer les années, mois et jours pour voir si la date d'échéance est aujourd'hui
                                                                            //     if (echeance.getFullYear() === aujourdHui.getFullYear() &&
                                                                            //         echeance.getMonth() === aujourdHui.getMonth() &&
                                                                            //         echeance.getDate() === aujourdHui.getDate()) {
                                                                            //         return (<span style={{ color: 'orange' }}>Aujourd'hui</span>);
                                                                            //     }
                                                                            //     // Si la date d'échéance est déjà passée
                                                                            
                                                                        
                                                                            //     // Comparer les années, mois et jours pour voir si la date d'échéance est hier
                                                                            //     if (echeance.getFullYear() === aujourdHui.getFullYear() &&
                                                                            //         echeance.getMonth() === aujourdHui.getMonth() &&
                                                                            //         echeance.getDate() === aujourdHui.getDate() - 1) {
                                                                            //         return (<span style={{ color: 'blue' }}>Hier</span>);
                                                                            //     } 
                                                                                
                                                                            //     if (differenceJusqueEcheance < 0) {
                                                                            //         // Calculer le nombre de jours passés
                                                                            //         const joursPasse = Math.ceil(Math.abs(differenceJusqueEcheance) / (1000 * 60 * 60 * 24));
                                                                                    
                                                                            //         return (<span style={{ color: 'red' }}>Il y a {joursPasse} jours</span>);
                                                                            //     } 
                                                                        
                                                                            //     else {
                                                                            //         // Initialiser le nombre de jours restants
                                                                            //         let joursRestants = joursInitial;
                                                                                    
                                                                            //         // Tant que la date d'aujourd'hui est inférieure à la date d'échéance
                                                                            //         while (aujourdHui < echeance) {
                                                                            //             // Diminuer le nombre de jours restants
                                                                            //             joursRestants
                                                                                        
                                                                            //             // Avancer d'un jour
                                                                            //             aujourdHui.setDate(aujourdHui.getDate() + 1);
                                                                            //         }
                                                                            
                                                                            //         return (<span style={{ color: 'green' }}> Il reste {joursInitial} jours </span>);
                                                                            //     }
                                                                            // }

                                                                            return (
                                                                                <>
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            {['bottom'].map((placement) => (
                                                                                                <OverlayTrigger
                                                                                                    key={placement}
                                                                                                    placement={placement}
                                                                                                    overlay={
                                                                                                        <Tooltip
                                                                                                            id={`tooltip-${placement}`}>
                                                                                                            <strong>Voir facture</strong>.
                                                                                                        </Tooltip>
                                                                                                    }
                                                                                                >
                                                                                                    <Button variant="transparent"
                                                                                                            className='mb-3 ms-3'>
                                                                                                        <Link
                                                                                                            to={`/fact/detail_paiement/${etudiantData.etudiant_id}/formation/${etudiantData.nomForm}`}>
                                                                                                            <FaEye
                                                                                                                className="text-warning"
                                                                                                                style={{cursor: 'pointer'}}/>
                                                                                                        </Link>
                                                                                                    </Button>
                                                                                                </OverlayTrigger>
                                                                                            ))}
                                                                                        </td>
                                                                                        <td>{etudiantData.nomEtud+' '+etudiantData.prenomEtud}</td>
                                                                                        <td><Button variant="outline-success">{etudiantData.total}</Button>{' '}</td>
                                                                                        <td>
                                                                                            {paie.map(obj => Object.values(obj)[i-1]) >= etudiantData.total ? 
                                                                                            <Button variant="outline-warning">{etudiantData.total}</Button> : 
                                                                                            <Button variant="outline-warning">{paie.map(obj => Object.values(obj)[i-1])}</Button>}
                                                                                        </td>
                                                                                        <td>
                                                                                            {etudiantData.total - paie.map(obj => Object.values(obj)[i-1]) <= 0 ? <Button variant="outline-danger">0</Button> : 
                                                                                            <Button variant="outline-danger">{etudiantData.total - paie.map(obj => Object.values(obj)[i-1])}</Button>}
                                                                                        </td>
                                                                                        <td>
                                                                                            {etudiantData.total - paie.map(obj => Object.values(obj)[i-1]) <= 0 ? 'Terminer' : 
                                                                                            <Button variant="outline-danger">{paieEcheance[index]}</Button>}
                                                                                            {/* <td className="fw-bold">{joursRestantsAvantDate(formatdate, EcheanceDateFormat)}</td> */}
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            )
                                                                        })}
                                                                        </tbody>
                                                                    </Table>
                                                                </>
                                                        }
                                                        </>
                                                }


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

export default RegistreFact;