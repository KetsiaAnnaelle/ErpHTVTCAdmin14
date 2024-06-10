import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Card, Col, Container, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import {Document, Image, Page, PDFDownloadLink, StyleSheet, Text, View} from "@react-pdf/renderer";
import {AiOutlineDownload} from "react-icons/ai";
import.meta.env.VITE_URL;
import axios from "axios";
import BarreLateraleEtud from '../../component/BarreLateraleEtud.jsx';


const CreateFicheFiliererPdf = ({nom_formation, form }) => {

    // console.log(form);
    // const createdDate = new Date(form.created_at);
    // const formatdate = createdDate.toLocaleDateString();

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
        contentEnd:{
            marginTop:'20',
            flexDirection:'column',
            justifyContent:'flex-end'
        }
    });

    // let nomForme = ''

    // console.log(nom_formation);

    return (
        

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.container}>
                    <Image src="/assets/img/logo.png" style={styles.logo} />
                    <View>
                        <View style={styles.marge}>
                            <Text style={styles.info}>
                                <Text style={styles.bolds}>HIGH TECH VOCATIONAL TRAINING CENTER A24</Text>
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
                                Filière: <Text style={styles.bold}>{nom_formation}</Text>
                            </Text>

                            <Text style={styles.info}>
                               Nombre d'étudiants: <Text style={styles.bolds}>{form.length}</Text>
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
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Nom</Text>
                        {/* <Text style={styles.tableCellHeader}>Prenom</Text> */}
                        <Text style={styles.tableCellHeader}>Sexe</Text>
                        {/* <Text style={styles.tableCellHeader}>Niveau</Text> */}
                        <Text style={styles.tableCellHeader}>Section</Text>
                        {/* <Text style={styles.tableCellHeader}>Ville</Text> */}
                        <Text style={styles.tableCellHeader}>Tel Etudiant</Text>
                        <Text style={styles.tableCellHeader}>Nom Tuteur</Text>
                        <Text style={styles.tableCellHeader}>Tel Tuteur</Text>
                    </View>
                    {
                        form.map((element,index) => {

                                // nomForme =element.nomForm
                                // console.log(nomForme);
                        
                            return(
                                <>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{element.nomEtud}</Text>
                                        {/* <Text style={styles.tableCell}>{element.prenomEtud}</Text> */}
                                        <Text style={styles.tableCell}>{element.sexe}</Text>
                                        {/* <Text style={styles.tableCell}>{element.niveau}</Text> */}
                                        <Text style={styles.tableCell}>{element.section}</Text>
                                        {/* <Text style={styles.tableCell}>{element.ville}</Text> */}
                                        <Text style={styles.tableCell}>{element.telEtud}</Text>
                                        <Text style={styles.tableCell}>{element.nomTuteur}</Text>
                                        <Text style={styles.tableCell}>{element.telTuteur}</Text>
                                    </View>
                                </>
                            )
                        })
                    }
                </View>
                        
                
                {/* <Text style={styles.bold}>Merci d'utiliser la communication suivante pour votre paiement : <Text>FAC/2024/000{fact.id}</Text></Text> */}


                <View style={styles.contents}>
                    {/* <View style={styles.padding}>
                        <Text style={styles.bold}>RECU DE PAIEMENT</Text>
                        <Text style={styles.bold}>DES FRAIS DE FORMATION </Text>
                    </View> */}
                    <View style={styles.padding}>
                        <Text style={styles.bold}>AGREMENT MINEFOP</Text>
                        <Text style={styles.bold}>N°000095/MINEFOP/SG/DFOP/</Text>
                        <Text style={styles.bold}>SDGSF/CSACD/CBAC</Text>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.colorss}>Ce document est imprimé</Text>
                        <Text style={styles.colorss}> pour chaque Filière</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
};
export default CreateFicheFiliererPdf;

const DetailsEtudiantsParFiliere = () => {

    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    const [form, setform] = useState([])

    const {nomform}=useParams()

    async function getEtudiantDeLaFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/students/${nomform}`);
            setform(response.data);         
            console.log(form.nomForm);
        } catch (error) {
            console.error(error);
        }
    }

    const nom_formation = nomform

    // console.log(filiere);

    // ella

    // console.log(form)
    useEffect(() => {
        if (!load===true){
            getEtudiantDeLaFiliere()
            setload(true)
        }
    },[fresh,load])  

    const createdDate = new Date(form.created_at);
    const formatdate = createdDate.toLocaleDateString();



    return (

       <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col className='d-md-none d-lg-block'>
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Voir Liste des Etudiants de la filière {nom_formation}</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/listeEtud">Liste de Etudiants</NavLink></li>
                                    <li className="breadcrumb-item active">Voir Liste</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Informations sur la fiche de cours</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
                                                                <div className="card">
                                                                    <div className="card-header">
                                                                        <h3 className="card-title">Liste des Etudiants de la Filière {nom_formation} : ({`${form.length} etudiant${form.length > 1 ? 's' : ''}`})</h3>
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
                                                                                                     <img src="../../../assets/img/logo.png" alt="" width='200' height='200'/>
                                                                                                </Card.Body>
                                                                                            </Card>

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
                                                                                        </div>
                                                                                        <div className="card mb-3 border-0">
                                                                                            <div className="row g-0">
                                                                                                <div className="col">
                                                                                                    <div className="card-body text-center">
                                                                                                        <div className='card-title h2 text-center mb-3 fw-bold'>
                                                                                                            Informations
                                                                                                            {['right'].map((placement) => (
                                                                                                                <OverlayTrigger
                                                                                                                    key={placement}
                                                                                                                    placement={placement}
                                                                                                                    overlay={
                                                                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                                                                            <strong>Télécharger la liste des etudiants de la filière {form.nomForm}</strong>.
                                                                                                                        </Tooltip>
                                                                                                                    }
                                                                                                                >
                                                                                                                    <Button variant="transparent" className='mb-3 ms-3'>
                                                                                                                        <PDFDownloadLink document={<CreateFicheFiliererPdf nom_formation = {nomform} form={form}/>} fileName='ficheCours'>
                                                                                                                            <AiOutlineDownload size={24} className='text-primary mt-4 mb-3 mx-3'/>
                                                                                                                        </PDFDownloadLink>
                                                                                                                    </Button>
                                                                                                                </OverlayTrigger>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                        <ListGroup>
                                                                                                            <ListGroup.Item>
                                                                                                                {/* <p><span className='fs-6 my-3'> et  de L'Etudiant: </span><span className='fw-bold ms-3'>{form.nomEtud+' '+form.prenomEtud }</span></p>
                                                                                                                <p><span className='fs-6 my-3'>:</span><span className='fw-bold ms-3'>{formatdate }</span></p>
                                                                                                                <p><span className='fs-6 my-3'>: </span><span className='fw-bold ms-3'>{form.section }</span></p> */}


                                                                                                                <table class="table">
                                                                                                                    <thead>
                                                                                                                        <tr>
                                                                                                                        <th scope="col">Nom</th>
                                                                                                                        <th scope="col">Prenom</th>
                                                                                                                        <th scope="col">Date de Naissance</th>
                                                                                                                        <th scope="col">Sexe</th>
                                                                                                                        <th scope="col">Numero de Telephone</th>
                                                                                                                        <th scope="col">Section</th>
                                                                                                                        <th scope="col">Niveau</th>
                                                                                                                        <th scope="col">Ville</th>
                                                                                                                        <th scope="col">Nom Du Tuteur</th>
                                                                                                                        <th scope="col">Numero de Telephone Du Tuteur</th>
                                                                                                                        </tr>
                                                                                                                    </thead>
                                                                                                                    <tbody>
                                                                                                                            {
                                                                                                                                form.length==0?
                                                                                                                                <tr>
                                                                                                                                    <td colSpan={10} align='center'>
                                                                                                                                        <p className='text-danger fw-bold fs-3 mt-4'>PAS D'ETUDIANTS</p>
                                                                                                                                    </td>
                                                                                                                                </tr>
                                                                                                                                :

                                                                                                                                form.map((element,index)=>{
                                                                                                                                    return(

                                                                                                                                        <tr key={index}>
                                                                                                                                            <th scope="row">{element.nomEtud}</th>
                                                                                                                                            <td>{element.prenomEtud}</td>
                                                                                                                                            <td>{element.birthday}</td>
                                                                                                                                            <td>{element.sexe}</td>
                                                                                                                                            <td>{element.telEtud}</td>
                                                                                                                                            <td>{element.section}</td>
                                                                                                                                            <td>{element.niveau}</td>
                                                                                                                                            <td>{element.ville}</td>
                                                                                                                                            <td>{element.nomTuteur}</td>
                                                                                                                                            <td>{element.telTuteur}</td>
                                                                                                                                        </tr>

                                                                                                                                    )
                                                                                                                                })
                                                                                                                             }
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </ListGroup.Item>
                                                                                                        </ListGroup>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        
                                                                                        <Row className='d-flex justify-content-center'>

                                                                                            <PDFDownloadLink document={<CreateFicheFiliererPdf form={form}/>} fileName='Details_Etudiant'>
                                                                                                {({load})=>
                                                                                                    load ?(<Button variant="success" className='mt-4 w-25 mb-3'>Télécharger en cours ...</Button>):(<Button variant="success" className='mt-4 w-25 mb-3'>Télécharger PDF</Button>)}
                                                                                            </PDFDownloadLink>

                                                                                        </Row>
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

// export default DetailsEtudiantsParFiliere;