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
import ReactLoading from "react-loading";

const CreateAbscencePdf = ({ abs, periods, lastSixDays, lastSixDaysFormatted, nomForm }) => {

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

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
                {
                    (periods.length>=1) ?
                        periods.map((period,index) => {
                            return(
                                <View style={styles.tableContainer}>
                                    <Text style={styles.title}>Period du: {period.label}</Text>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCellHeader}>Noms</Text>
                                        {lastSixDays.map((day, dayIndex) => (
                                            <Text style={styles.tableCellHeader} key={dayIndex}>{format(day, 'Edd')}</Text>
                                        )).reverse()}
                                        <Text style={styles.tableCellHeader}>TJ</Text>
                                        <Text style={styles.tableCellHeader}>TNJ</Text>
                                        <Text style={styles.tableCellHeader}>Total</Text>
                                    </View>
                                    {
                                        Object.values(
                                            abs
                                                .reduce((acc, etudiant) => {
                                                    const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                                    if (!acc.hasOwnProperty(studentName)) {
                                                        acc[studentName] = {
                                                            ...etudiant,
                                                            totalJustifie: Array(period.daysInPeriod.length).fill(0),
                                                            totalNonJustifie: Array(period.daysInPeriod.length).fill(0),
                                                        };
                                                    }

                                                    // Trouver l'index du jour dans daysInPeriod
                                                    const dayIndex = period.daysInPeriod.findIndex((day) =>
                                                        isSameDay(new Date(etudiant.dateAbs), day)
                                                    );

                                                    // Ajouter les heures d'absence pour le jour donné
                                                    if (dayIndex !== -1) {
                                                        acc[studentName].totalJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                        acc[studentName].totalNonJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Non Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                    }
                                                    console.log()
                                                    return acc;
                                                }, {})
                                        ).map((etudiant, etudiantIndex) => {
                                                console.log()

                                                return (
                                                    <>
                                                        <View style={styles.tableRow} key={etudiantIndex}>
                                                            <Text
                                                                style={styles.tableCell}>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</Text>

                                                            <React.Fragment key={index}>
                                                                {period.daysInPeriod.map((day, dayIndex) => {
                                                                    const dayFormatted = format(day, 'dd/MM/yyyy');
                                                                    const etudiantDateFormatted = etudiant.dateAbs
                                                                    // const isInCurrentPeriod = etudiantDateFormatted === dayFormatted;
                                                                    console.log(etudiantDateFormatted)
                                                                    return (
                                                                        <>{
                                                                            (etudiantDateFormatted === dayFormatted) ?
                                                                                <Text style={styles.tableCell}
                                                                                      key={dayIndex}>{etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex]}</Text>
                                                                                :
                                                                                <Text style={styles.tableCell}
                                                                                      key={dayIndex}>{etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex]}</Text>
                                                                        }</>
                                                                    );
                                                                }).reverse()}
                                                            </React.Fragment>
                                                            <Text
                                                                style={styles.tableCell}>{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                            <Text
                                                                style={styles.tableCell}>{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                            <Text
                                                                style={styles.tableCell}>{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Text>
                                                        </View>
                                                    </>
                                                )
                                            }
                                        )}
                                </View>
                            )
                        })
                        :
                        <View style={styles.tableContainer}>
                            <Text style={styles.title}>Informations sur l'absence</Text>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCellHeader}>Noms</Text>
                                {lastSixDays.map((day, dayIndex) => (
                                    <Text style={styles.tableCellHeader} key={dayIndex}>{format(day,'Edd')}</Text>
                                )).reverse()}
                                <Text style={styles.tableCellHeader}>TJ</Text>
                                <Text style={styles.tableCellHeader}>TNJ</Text>
                                <Text style={styles.tableCellHeader}>Total</Text>
                            </View>
                            {
                                Object.values(
                                    abs.reduce((acc, etudiant) => {
                                        const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                        if (!acc.hasOwnProperty(studentName)) {
                                            acc[studentName] = {
                                                ...etudiant,
                                                totalJustifie: Array(lastSixDays.length).fill(0),
                                                totalNonJustifie: Array(lastSixDays.length).fill(0)
                                            };
                                        }

                                        // Trouver l'index du jour dans lastSixDaysFormatted
                                        const dayIndex = lastSixDaysFormatted.findIndex((day) => etudiant.dateAbs === day);

                                        // Ajouter les heures d'absence pour le jour donné
                                        if (dayIndex !== -1) {
                                            acc[studentName].totalJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Justifiée') ? etudiant.nbreHeureAbs : 0;
                                            acc[studentName].totalNonJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Non Justifiée') ? etudiant.nbreHeureAbs : 0;
                                        }

                                        return acc;
                                    }, {})
                                ).map((etudiant, etudiantIndex) => {

                                        (etudiant.typeAbs === 'Absence Justifiée')
                                            ? totalJustifie = totalJustifie + etudiant.nbreHeureAbs
                                            : 0;

                                        (etudiant.typeAbs === 'Absence Non Justifiée')
                                            ? totalNonJustifie = totalNonJustifie + etudiant.nbreHeureAbs
                                            : 0;

                                        total = totalNonJustifie + totalJustifie


                                        return(
                                            <>
                                                <View style={styles.tableRow} key={etudiantIndex}>
                                                    <Text style={styles.tableCell}>{etudiant.nomEtud+' '+etudiant.prenomEtud}</Text>
                                                    {lastSixDaysFormatted.map((day, dayIndex) => {
                                                        return (
                                                            <Text style={styles.tableCell} key={dayIndex}>{etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex]}</Text>
                                                        )
                                                    }).reverse()}
                                                    <Text style={styles.tableCell}>{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                    <Text style={styles.tableCell}>{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                    <Text style={styles.tableCell}>{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Text>
                                                </View>
                                            </>
                                        )
                                    }
                                )}
                        </View>
                }

                {
                    (periods.length>=1) ?
                        <View style={styles.tableContainer}>
                            <Text style={styles.title}>Synthèse des absences</Text>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCellHeader}>Noms</Text>
                                <Text style={styles.tableCellHeader}>TJ</Text>
                                <Text style={styles.tableCellHeader}>TNJ</Text>
                                <Text style={styles.tableCellHeader}>Total</Text>
                            </View>
                            {
                                Object.values(
                                    abs.reduce((acc, etudiant) => {
                                        const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                        if (!acc.hasOwnProperty(studentName)) {
                                            acc[studentName] = {
                                                ...etudiant,
                                                totalJustifie: Array(periods.reduce((totalDays, p) => totalDays + p.daysInPeriod.length, 0)).fill(0),
                                                totalNonJustifie: Array(periods.reduce((totalDays, p) => totalDays + p.daysInPeriod.length, 0)).fill(0),
                                            };
                                        }

                                        // Trouver l'index du jour dans daysInPeriod pour chaque période
                                        periods.forEach((period) => {
                                            const dayIndex = period.daysInPeriod.findIndex((day) =>
                                                isSameDay(new Date(etudiant.dateAbs), day)
                                            );

                                            // Ajouter les heures d'absence pour le jour donné
                                            if (dayIndex !== -1) {
                                                if (etudiant.typeAbs === 'Absence Justifiée') {
                                                    acc[studentName].totalJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                } else if (etudiant.typeAbs === 'Absence Non Justifiée') {
                                                    acc[studentName].totalNonJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                }
                                            }
                                        });

                                        return acc;
                                    }, {})
                                ).map((etudiant, etudiantIndex) => {

                                    return(
                                        <>
                                            <View style={styles.tableRow} key={etudiantIndex}>
                                                <Text style={styles.tableCell}>{etudiant.nomEtud+' '+etudiant.prenomEtud}</Text>
                                                <Text style={styles.tableCell}>{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                <Text style={styles.tableCell}>{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                <Text style={styles.tableCell}>{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Text>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>
                        :
                        <View style={styles.tableContainer}>
                            <Text style={styles.title}>Synthèse des absences</Text>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCellHeader}>Noms</Text>
                                <Text style={styles.tableCellHeader}>TJ</Text>
                                <Text style={styles.tableCellHeader}>TNJ</Text>
                                <Text style={styles.tableCellHeader}>Total</Text>
                            </View>
                            {
                                Object.values(
                                    abs.reduce((acc, etudiant) => {
                                        const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                        if (!acc.hasOwnProperty(studentName)) {
                                            acc[studentName] = {
                                                ...etudiant,
                                                totalJustifie: Array(lastSixDays.length).fill(0),
                                                totalNonJustifie: Array(lastSixDays.length).fill(0)
                                            };
                                        }

                                        // Trouver l'index du jour dans lastSixDaysFormatted
                                        const dayIndex = lastSixDaysFormatted.findIndex((day) => etudiant.dateAbs === day);

                                        // Ajouter les heures d'absence pour le jour donné
                                        if (dayIndex !== -1) {
                                            acc[studentName].totalJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Justifiée') ? etudiant.nbreHeureAbs : 0;
                                            acc[studentName].totalNonJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Non Justifiée') ? etudiant.nbreHeureAbs : 0;
                                        }

                                        return acc;
                                    }, {})
                                ).map((etudiant, etudiantIndex) => {

                                        (etudiant.typeAbs === 'Absence Justifiée')
                                            ? totalJustifie = totalJustifie + etudiant.nbreHeureAbs
                                            : 0;

                                        (etudiant.typeAbs === 'Absence Non Justifiée')
                                            ? totalNonJustifie = totalNonJustifie + etudiant.nbreHeureAbs
                                            : 0;

                                        total = totalNonJustifie + totalJustifie


                                        return(
                                            <>
                                                <View style={styles.tableRow} key={etudiantIndex}>
                                                    <Text style={styles.tableCell}>{etudiant.nomEtud+' '+etudiant.prenomEtud}</Text>
                                                    <Text style={styles.tableCell}>{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                    <Text style={styles.tableCell}>{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Text>
                                                    <Text style={styles.tableCell}>{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Text>
                                                </View>
                                            </>
                                        )
                                    }
                                )}
                        </View>
                }

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


const FicheAbsence = () => {

    const currentDate = new Date();
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const {nomForm}=useParams()
    localStorage.setItem('nomForm', nomForm)
    const [form, setform] = useState([])
    const [abs, setabs] = useState([])

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

    const lastSixDays = Array.from({ length: 6 }, (_, index) => {
        const day = addDays(startOfDay(currentDate), -index);
        return isSunday(day) ? addDays(day, -1) : day;
    });

    const lastSixDaysFormatted = lastSixDays.map(day => format(day, 'yyyy-MM-dd'));

    let totalJustifie = 0;
    let totalNonJustifie = 0;
    let total = 0;

    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form/${nomForm}`);
            setform(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAbsences() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/abscence/formation/${nomForm}/etudiant`);
            setabs(response.data);
            setSeRecords(response.data)
            console.log(response.data)
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getFormations()
            getAbsences()
        }
    },[fresh])


    // Fonction pour créer les périodes en intervalles de 6 jours (sauf le dimanche)
    const createPeriods = (startDate) => {

        const daysDifference = differenceInDays(new Date(endDate), new Date(startDate));

        const intPart = Math.floor(Math.abs(daysDifference / 6));
        const decimalPart = Math.abs(daysDifference / 6)-intPart

        const roundedDifference = decimalPart >= 0.5
            ? Math.ceil(daysDifference / 6)
            : Math.floor(daysDifference / 6);

        localStorage.setItem('nbreSemaine', roundedDifference);

        console.log(decimalPart);
        console.log(roundedDifference);

        const nbreSemaine = localStorage.getItem('nbreSemaine')
        console.log(nbreSemaine)

        const periods = [];

        for (let i = 0; i < parseInt(nbreSemaine); i++) {
            let periodStartDate = i === 0 ? startDate : addDays(periods[i - 1].periodEndDate, 1);
            let periodEndDate = addDays(periodStartDate, 6);

            // Vérifier si le dernier jour de la période est un dimanche
            if (isSunday(periodEndDate)) {
                const daysInPeriod = Array.from({ length: 6 }, (_, index) => addDays(periodStartDate,  index))
                    .filter(day => !isSunday(day))
                    .reverse();
                periods.push({
                    periodStartDate: periodStartDate,
                    periodEndDate: periodEndDate,
                    label: `${format(periodStartDate, 'dd/MM/yyyy')} - ${format(periodEndDate, 'dd/MM/yyyy')}`,
                    daysInPeriod: daysInPeriod, // Ajout des jours dans la période (en excluant les dimanches)
                });
            }
            else if (isSunday(periodStartDate)) {
                periodStartDate = addDays(periodStartDate, 1); // Incrémenter d'un jour jusqu'à ce que ce ne soit pas un dimanche
                const daysInPeriod = Array.from({ length: 6 }, (_, index) => addDays(periodStartDate,  index))
                    .filter(day => !isSunday(day))
                    .reverse();
                periods.push({
                    periodStartDate: periodStartDate,
                    periodEndDate: periodEndDate,
                    label: `${format(periodStartDate, 'dd/MM/yyyy')} - ${format(periodEndDate, 'dd/MM/yyyy')}`,
                    daysInPeriod: daysInPeriod, // Ajout des jours dans la période (en excluant les dimanches)
                });
            }
            else if (isSunday(periodStartDate) && isSunday(periodEndDate)) {
                periodStartDate = addDays(periodStartDate, 1);
                const daysInPeriod = Array.from({ length: 7 }, (_, index) => addDays(periodStartDate,  index))
                    .filter(day => !isSunday(day))
                    .reverse();
                periods.push({
                    periodStartDate: periodStartDate,
                    periodEndDate: periodEndDate,
                    label: `${format(periodStartDate, 'dd/MM/yyyy')} - ${format(periodEndDate, 'dd/MM/yyyy')}`,
                    daysInPeriod: daysInPeriod, // Ajout des jours dans la période (en excluant les dimanches)
                });
            }
            else{
                const daysInPeriod = Array.from({ length: 7 }, (_, index) => addDays(periodStartDate, index === 0 && isSunday(periodStartDate) ? 0 : index))
                    .filter(day => !isSunday(day))
                    .reverse();

                periods.push({
                    periodStartDate: periodStartDate,
                    periodEndDate: periodEndDate,
                    label: `${format(periodStartDate, 'dd/MM/yyyy')} - ${format(periodEndDate, 'dd/MM/yyyy')}`,
                    daysInPeriod: daysInPeriod, // Ajout des jours dans la période (en excluant les dimanches)
                });
            }
        }

        return periods;
    };


    console.log(periods)

    useEffect(() => {
        if (startDate && endDate) {
            const selectedStartDate = new Date(startDate);
            const selectedPeriods = createPeriods(selectedStartDate);
            setSelectedPeriod(selectedPeriods[0]);
            setPeriods(selectedPeriods);
            filterAbsByPeriod(selectedPeriods[0]);
        }
    }, [startDate, endDate]);

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const filterAbsByPeriod = (period) => {
        const filteredRecords = abs.filter((record) => {
            const recordDate = record.dateAbs;
            return recordDate >= period.periodStartDate && recordDate <= period.periodEndDate;
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
        setStartDate('');
        setEndDate('');
        setPeriods(periods[0])

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
                            <h1>Fiche d'absence</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/choix_formation_fiche_absence">Choisir Formation</NavLink></li>
                                    <li className="breadcrumb-item active">Fiche d'absence</li>
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
                                                    Fiche d'absence de la formation <span className='fw-bold'>{form.nomForm}</span>
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
                                                                            <strong>Télécharger fiche absence</strong>.
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                        <PDFDownloadLink document={<CreateAbscencePdf abs={abs} periods={periods} lastSixDaysFormatted={lastSixDaysFormatted} lastSixDays={lastSixDays} nomForm={nomForm}/>} fileName='fiche_absence'>
                                                                            <AiOutlineDownload size={32} className='text-primary mt-4 mb-3 mx-3'/>
                                                                        </PDFDownloadLink>
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            ))}
                                                        </Col>
                                                        <Col className='col-md-5 mt-4'>
                                                            <p>
                                                                Periode du : <span className='fw-bold'>{startDate}</span> au <span className='fw-bold'>{endDate}</span>
                                                            </p>
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
                                                               (periods.length >= 1) ?
                                                                   periods.map((period, index) => (
                                                                       <div key={index} className="mb-4">
                                                                           <h4>Période : {period.label}</h4>
                                                                           <Table responsive className='table table-borderless datatable'>
                                                                               <thead style={{backgroundColor: '#1A3C30' , height:'50px'}} className='text-white fs-6 items-center'>
                                                                               <tr>
                                                                                   <th></th>
                                                                                   <th>Noms</th>
                                                                                   {period.daysInPeriod.map((day, dayIndex) => (
                                                                                       <th key={dayIndex}>
                                                                                           {format(day, 'Edd')}
                                                                                       </th>
                                                                                   )).reverse()}
                                                                                   <th>TJ</th>
                                                                                   <th>TNJ</th>
                                                                                   <th>Total</th>
                                                                               </tr>
                                                                               </thead>
                                                                               <tbody>
                                                                               {
                                                                                   Object.values(
                                                                                       abs
                                                                                           .filter((etudiant) =>
                                                                                               keys.some((key) => {
                                                                                                   const value = etudiant[key];
                                                                                                   if (typeof value === 'string') {
                                                                                                       return value.toLowerCase().includes(searchQuery);
                                                                                                   }
                                                                                                   return false;
                                                                                               })
                                                                                           )
                                                                                           .reduce((acc, etudiant) => {
                                                                                               const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                                                                               if (!acc.hasOwnProperty(studentName)) {
                                                                                                   acc[studentName] = {
                                                                                                       ...etudiant,
                                                                                                       totalJustifie: Array(period.daysInPeriod.length).fill(0),
                                                                                                       totalNonJustifie: Array(period.daysInPeriod.length).fill(0),
                                                                                                   };
                                                                                               }

                                                                                               // Trouver l'index du jour dans daysInPeriod
                                                                                               const dayIndex = period.daysInPeriod.findIndex((day) =>
                                                                                                   isSameDay(new Date(etudiant.dateAbs), day)
                                                                                               );

                                                                                               // Ajouter les heures d'absence pour le jour donné
                                                                                               if (dayIndex !== -1) {
                                                                                                   if (etudiant.typeAbs === 'Absence Justifiée') {
                                                                                                       acc[studentName].totalJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                                                                   } else if (etudiant.typeAbs === 'Absence Non Justifiée') {
                                                                                                       acc[studentName].totalNonJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                                                                   }
                                                                                               }

                                                                                               return acc;
                                                                                           }, {})
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
                                                                                                                   <strong>Voir abscence</strong>.
                                                                                                               </Tooltip>
                                                                                                           }
                                                                                                       >
                                                                                                           <Button variant="transparent"
                                                                                                                   className='mb-3 ms-3'>
                                                                                                               <Link
                                                                                                                   to={`/abs/detail_abscence_etudiant/${etudiant.etudiant_id}`}>
                                                                                                                   <FaEye className="text-warning"
                                                                                                                          style={{cursor: 'pointer'}}/>
                                                                                                               </Link>
                                                                                                           </Button>
                                                                                                       </OverlayTrigger>
                                                                                                   ))}
                                                                                               </td>
                                                                                               <td>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</td>
                                                                                               <React.Fragment key={index}>
                                                                                                   {period.daysInPeriod.map((day, dayIndex) => {
                                                                                                       const dayFormatted = format(day, 'dd/MM/yyyy');
                                                                                                       const etudiantDateFormatted = etudiant.dateAbs
                                                                                                       const isInCurrentPeriod = etudiantDateFormatted === dayFormatted;

                                                                                                       return (
                                                                                                           <td key={dayIndex}>
                                                                                                               {isInCurrentPeriod ?
                                                                                                                   (etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex])
                                                                                                                   : (etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex])}
                                                                                                           </td>
                                                                                                       );
                                                                                                   }).reverse()}
                                                                                               </React.Fragment>

                                                                                               <td><Button variant="outline-success">{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                               <td><Button variant="outline-warning">{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                               <td><Button variant="outline-danger">{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                           </tr>
                                                                                       )
                                                                                   })}
                                                                               </tbody>

                                                                           </Table>
                                                                       </div>
                                                                   ))
                                                                   :
                                                                   <Table responsive className='table table-borderless datatable'>
                                                                       <thead style={{backgroundColor: '#1A3C30' , height:'50px'}} className='text-white fs-6 items-center'>
                                                                       <tr>
                                                                           <th></th>
                                                                           <th>Noms</th>
                                                                           {lastSixDays.map((day, dayIndex) => (
                                                                               <th key={dayIndex}>
                                                                                   {format(day, 'Edd')}
                                                                               </th>
                                                                           )).reverse()}
                                                                           <th>TJ</th>
                                                                           <th>TNJ</th>
                                                                           <th>Total</th>
                                                                       </tr>
                                                                       </thead>
                                                                       <tbody>
                                                                       {
                                                                           Object.values(
                                                                               abs.filter((etudiant) =>
                                                                                   keys.some((key) => {
                                                                                       const value = etudiant[key];
                                                                                       if (typeof value === 'string') {
                                                                                           return value.toLowerCase().includes(searchQuery);
                                                                                       }
                                                                                       return false;
                                                                                   })
                                                                               ).reduce((acc, etudiant) => {
                                                                                   const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                                                                   if (!acc.hasOwnProperty(studentName)) {
                                                                                       acc[studentName] = {
                                                                                           ...etudiant,
                                                                                           totalJustifie: Array(lastSixDays.length).fill(0),
                                                                                           totalNonJustifie: Array(lastSixDays.length).fill(0)
                                                                                       };
                                                                                   }

                                                                                   // Trouver l'index du jour dans lastSixDaysFormatted
                                                                                   const dayIndex = lastSixDaysFormatted.findIndex((day) => etudiant.dateAbs === day);

                                                                                   // Ajouter les heures d'absence pour le jour donné
                                                                                   if (dayIndex !== -1) {
                                                                                       acc[studentName].totalJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                                                       acc[studentName].totalNonJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Non Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                                                   }

                                                                                   return acc;
                                                                               }, {})
                                                                           ).map((etudiant, etudiantIndex) => {

                                                                               (etudiant.typeAbs === 'Absence Justifiée')
                                                                                   ? totalJustifie = totalJustifie + etudiant.nbreHeureAbs
                                                                                   : 0;

                                                                               (etudiant.typeAbs === 'Absence Non Justifiée')
                                                                                   ? totalNonJustifie = totalNonJustifie + etudiant.nbreHeureAbs
                                                                                   : 0;

                                                                               total = totalNonJustifie + totalJustifie

                                                                               return(
                                                                                   <tr key={etudiantIndex}>
                                                                                       <td>
                                                                                           {['bottom'].map((placement) => (
                                                                                               <OverlayTrigger
                                                                                                   key={placement}
                                                                                                   placement={placement}
                                                                                                   overlay={
                                                                                                       <Tooltip id={`tooltip-${placement}`}>
                                                                                                           <strong>Voir abscence</strong>.
                                                                                                       </Tooltip>
                                                                                                   }
                                                                                               >
                                                                                                   <Button variant="transparent"
                                                                                                           className='mb-3 ms-3'>
                                                                                                       <Link
                                                                                                           to={`/abs/detail_abscence_etudiant/${etudiant.etudiant_id}`}>
                                                                                                           <FaEye className="text-warning"
                                                                                                                  style={{cursor: 'pointer'}}/>
                                                                                                       </Link>
                                                                                                   </Button>
                                                                                               </OverlayTrigger>
                                                                                           ))}
                                                                                       </td>
                                                                                       <td>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</td>
                                                                                       {lastSixDaysFormatted.map((day, dayIndex) => {
                                                                                           return (
                                                                                               <td key={dayIndex}>
                                                                                                   {etudiant.totalJustifie[dayIndex] + etudiant.totalNonJustifie[dayIndex]}
                                                                                               </td>
                                                                                           )
                                                                                       }).reverse()}
                                                                                       <td><Button variant="outline-success">{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                       <td><Button variant="outline-warning">{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                       <td><Button variant="outline-danger">{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                   </tr>
                                                                               )
                                                                           })}
                                                                       </tbody>

                                                                   </Table>
                                                           }{
                                                               (periods.length >= 1) ?
                                                                   periods.map((period,index) => {
                                                                       if(index===0){
                                                                           return(
                                                                               <div key={index} className="mb-4 col-md-8">
                                                                                   <h4>Synthèse des absences</h4>
                                                                                   <Table responsive className='table table-borderless datatable'>
                                                                                       <thead style={{
                                                                                           backgroundColor: '#1A3C30',
                                                                                           height: '50px'
                                                                                       }} className='text-white fs-6 items-center'>
                                                                                       <tr>
                                                                                           <th></th>
                                                                                           <th>Noms</th>
                                                                                           <th>TJ</th>
                                                                                           <th>TNJ</th>
                                                                                           <th>Total</th>
                                                                                       </tr>
                                                                                       </thead>
                                                                                       <tbody>
                                                                                       {Object.values(
                                                                                           abs.filter((etudiant) =>
                                                                                               keys.some((key) => {
                                                                                                   const value = etudiant[key];
                                                                                                   if (typeof value === 'string') {
                                                                                                       return value.toLowerCase().includes(searchQuery);
                                                                                                   }
                                                                                                   return false;
                                                                                               })
                                                                                           ).reduce((acc, etudiant) => {
                                                                                               const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                                                                               if (!acc.hasOwnProperty(studentName)) {
                                                                                                   acc[studentName] = {
                                                                                                       ...etudiant,
                                                                                                       totalJustifie: Array(periods.reduce((totalDays, p) => totalDays + p.daysInPeriod.length, 0)).fill(0),
                                                                                                       totalNonJustifie: Array(periods.reduce((totalDays, p) => totalDays + p.daysInPeriod.length, 0)).fill(0),
                                                                                                   };
                                                                                               }

                                                                                               // Trouver l'index du jour dans daysInPeriod pour chaque période
                                                                                               periods.forEach((period) => {
                                                                                                   const dayIndex = period.daysInPeriod.findIndex((day) =>
                                                                                                       isSameDay(new Date(etudiant.dateAbs), day)
                                                                                                   );

                                                                                                   // Ajouter les heures d'absence pour le jour donné
                                                                                                   if (dayIndex !== -1) {
                                                                                                       if (etudiant.typeAbs === 'Absence Justifiée') {
                                                                                                           acc[studentName].totalJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                                                                       } else if (etudiant.typeAbs === 'Absence Non Justifiée') {
                                                                                                           acc[studentName].totalNonJustifie[dayIndex] += etudiant.nbreHeureAbs;
                                                                                                       }
                                                                                                   }
                                                                                               });

                                                                                               return acc;
                                                                                           }, {})
                                                                                       ).map((etudiant, etudiantIndex) => (
                                                                                           <tr key={etudiantIndex}>
                                                                                               <td>
                                                                                                   {['bottom'].map((placement) => (
                                                                                                       <OverlayTrigger
                                                                                                           key={placement}
                                                                                                           placement={placement}
                                                                                                           overlay={
                                                                                                               <Tooltip
                                                                                                                   id={`tooltip-${placement}`}>
                                                                                                                   <strong>Voir
                                                                                                                       abscence</strong>.
                                                                                                               </Tooltip>
                                                                                                           }
                                                                                                       >
                                                                                                           <Button variant="transparent"
                                                                                                                   className='mb-3 ms-3'>
                                                                                                               <Link
                                                                                                                   to={`/abs/detail_abscence_etudiant/${etudiant.etudiant_id}`}>
                                                                                                                   <FaEye
                                                                                                                       className="text-warning"
                                                                                                                       style={{cursor: 'pointer'}}/>
                                                                                                               </Link>
                                                                                                           </Button>
                                                                                                       </OverlayTrigger>
                                                                                                   ))}
                                                                                               </td>
                                                                                               <td>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</td>
                                                                                               <td><Button variant="outline-success">{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                               <td><Button variant="outline-warning">{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                               <td><Button variant="outline-danger">{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Button>{' '}</td>
                                                                                           </tr>
                                                                                       ))}
                                                                                       </tbody>
                                                                                   </Table>

                                                                               </div>
                                                                           )
                                                                       }
                                                                   })
                                                                   :
                                                                   <>
                                                                       <div className="mb-4 col-md-8">
                                                                           <h4>Synthèse des absences</h4>
                                                                           <Table responsive className='table table-borderless datatable'>
                                                                               <thead style={{backgroundColor: '#1A3C30', height:'50px'}} className='text-white fs-6 items-center'>
                                                                               <tr>
                                                                                   <th></th>
                                                                                   <th>Noms</th>
                                                                                   <th>TJ</th>
                                                                                   <th>TNJ</th>
                                                                                   <th>Total</th>
                                                                               </tr>
                                                                               </thead>
                                                                               <tbody>
                                                                               { Object.values(
                                                                                   abs.filter((etudiant) =>
                                                                                       keys.some((key) => {
                                                                                           const value = etudiant[key];
                                                                                           if (typeof value === 'string') {
                                                                                               return value.toLowerCase().includes(searchQuery);
                                                                                           }
                                                                                           return false;
                                                                                       })
                                                                                   ).reduce((acc, etudiant) => {
                                                                                       const studentName = etudiant.nomEtud + ' ' + etudiant.prenomEtud;

                                                                                       if (!acc.hasOwnProperty(studentName)) {
                                                                                           acc[studentName] = {
                                                                                               ...etudiant,
                                                                                               totalJustifie: Array(lastSixDays.length).fill(0),
                                                                                               totalNonJustifie: Array(lastSixDays.length).fill(0)
                                                                                           };
                                                                                       }

                                                                                       // Trouver l'index du jour dans lastSixDaysFormatted
                                                                                       const dayIndex = lastSixDaysFormatted.findIndex((day) => etudiant.dateAbs === day);

                                                                                       // Ajouter les heures d'absence pour le jour donné
                                                                                       if (dayIndex !== -1) {
                                                                                           acc[studentName].totalJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                                                           acc[studentName].totalNonJustifie[dayIndex] += (etudiant.typeAbs === 'Absence Non Justifiée') ? etudiant.nbreHeureAbs : 0;
                                                                                       }

                                                                                       return acc;
                                                                                   }, {})
                                                                               ).map((etudiant, etudiantIndex) => {

                                                                                   (etudiant.typeAbs === 'Absence Justifiée')
                                                                                       ? totalJustifie = totalJustifie + etudiant.nbreHeureAbs
                                                                                       : 0;

                                                                                   (etudiant.typeAbs === 'Absence Non Justifiée')
                                                                                       ? totalNonJustifie = totalNonJustifie + etudiant.nbreHeureAbs
                                                                                       : 0;

                                                                                   total = totalNonJustifie + totalJustifie
                                                                                   return (
                                                                                       <>
                                                                                           <tr key={etudiantIndex}>
                                                                                               <td>
                                                                                                   {['bottom'].map((placement) => (
                                                                                                       <OverlayTrigger
                                                                                                           key={placement}
                                                                                                           placement={placement}
                                                                                                           overlay={
                                                                                                               <Tooltip
                                                                                                                   id={`tooltip-${placement}`}>
                                                                                                                   <strong>Voir
                                                                                                                       abscence</strong>.
                                                                                                               </Tooltip>
                                                                                                           }
                                                                                                       >
                                                                                                           <Button variant="transparent"
                                                                                                                   className='mb-3 ms-3'>
                                                                                                               <Link
                                                                                                                   to={`/abs/detail_abscence_etudiant/${etudiant.etudiant_id}`}>
                                                                                                                   <FaEye
                                                                                                                       className="text-warning"
                                                                                                                       style={{cursor: 'pointer'}}/>
                                                                                                               </Link>
                                                                                                           </Button>
                                                                                                       </OverlayTrigger>
                                                                                                   ))}
                                                                                               </td>
                                                                                               <td>{etudiant.nomEtud + ' ' + etudiant.prenomEtud}</td>
                                                                                               <td><Button
                                                                                                   variant="outline-success">{etudiant.totalJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}
                                                                                               </td>
                                                                                               <td><Button
                                                                                                   variant="outline-warning">{etudiant.totalNonJustifie.reduce((acc, total) => acc + total, 0)}</Button>{' '}
                                                                                               </td>
                                                                                               <td><Button
                                                                                                   variant="outline-danger">{etudiant.totalJustifie.concat(etudiant.totalNonJustifie).reduce((acc, total) => acc + total, 0)}</Button>{' '}
                                                                                               </td>
                                                                                           </tr>
                                                                                       </>
                                                                                   )
                                                                               })}
                                                                               </tbody>
                                                                           </Table>
                                                                       </div>
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

export default FicheAbsence;