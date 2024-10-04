import React, { useEffect, useState } from 'react';
import { Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import HeaderGeneral from '../../component/HeaderGeneral';
import BarreLateraleFact from '../../component/BarreLateraleFact';
import { Link, NavLink, useParams } from 'react-router-dom';
import { AiOutlineDownload } from 'react-icons/ai';
import axios from 'axios';

const BulletinEtudiant = () => {

    const [Etud_id, setEtud_id] = useState('')
    const [allnotes, setallnotes] = useState([])

      const etudiant_Id = Etud_id ? Etud_id.Etudiant_id : null;
    console.log(etudiant_Id);

    const {id}=useParams()

    async function getEtudiants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/details_note/${id}`);
            setEtud_id(response.data);
            // setallnotes(response.data.allnotes)
            console.log(response.data);
        } catch (error) {
            console.log(error);
            // console.log('echec');
        }
    }

    useEffect(() => {
        getEtudiants()
    },[])

    const genererPDF = (Etud_id) => {

        axios({
            url: `${import.meta.env.VITE_URL}/generate_bulletin/${Etud_id}`,
            method: 'GET',
            responseType: 'blob', // Indique le type de réponse attendu (blob pour les fichiers binaires)
        })
        // axios.get(`${import.meta.env.VITE_URL}/generer-pdf/${etudiantId}/${filiereId}`, {responseType: 'blob'})
        
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'bulletin.pdf');
            document.body.appendChild(link);
            link.click();
            // link.parentNode.removeChild(link); 
        })
        .catch(error => console.error('Erreur lors de la génération du bulletin :', error));
    };


    return (
        <Container fluid>
            <HeaderGeneral/>
        <Row>
            <Col className='d-md-none d-lg-block'>
                <BarreLateraleFact/>
            </Col>
            <Col className='col-lg-12'>
                <main id="main" className="main">

                    <div className="pagetitle">
                        <h1>Voir Facture</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to={`/note`}>Note</NavLink></li>
                                <li className="breadcrumb-item active">Voir Note</li>
                            </ol>
                        </nav>
                    </div>

                    <section className="section form">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="row">

                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Bulletin de l'élève</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <Row className='mt-3'>
                                                                <Col className='col-md-6'>
                                                                    <Card className='border-0'>
                                                                        <Card.Body>
                                                                            <Card.Text>
                                                                                Nom du centre : <span> High Tech Vocational Training Center</span>
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
                                                                </Col>
                                                                {/* <Col className='col-md-6'>
                                                                    <Card className='border-0'>
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
                                                                </Col> */}
                                                            </Row>


                                                            <Row className=''>
                                                                    <Col className='d-flex'>
                                                                        {['bottom'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Télécharger le bulletin</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <a href={`${import.meta.env.VITE_URL}/generate_bulletin/${etudiant_Id}`} variant="transparent" className='mb-3 ms-3'>
                                                                                    <AiOutlineDownload size={24} className='text-success mt-4 mb-3 mx-3'/>
                                                                                </a>
                                                                            </OverlayTrigger>
                                                                        ))}
                                                                    </Col>

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
                    </section>

                </main>

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                    className="bi bi-arrow-up-short"></i></a>
            </Col>
        </Row>

    </Container>
    );
};

export default BulletinEtudiant;