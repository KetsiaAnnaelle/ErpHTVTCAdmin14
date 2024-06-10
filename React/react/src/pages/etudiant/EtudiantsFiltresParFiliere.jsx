import React, { useEffect, useState } from 'react';
import HeaderGeneral from '../../component/HeaderGeneral';
import BarreLateraleEtud from '../../component/BarreLateraleEtud';
import { Col, Row, Container, Form, Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import ReactLoading from "react-loading";
import { BsSearch } from 'react-icons/bs';
import { BiSolidBookAlt } from 'react-icons/bi';
import axios from 'axios';
import.meta.env.VITE_URL;


const EtudiantsFiltresParFiliere = (data) => {

    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [EtudByFiliere, setEtudByFiliere] = useState([])

    async function getFormations() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
            // setform(response.data);
            setEtudByFiliere(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    // console.log(EtudByFiliere);

    useEffect(() => {
        if (!load===true){
            getFormations()
        }
    },[fresh])
    
    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col className='d-md-none d-lg-block'>
                    <BarreLateraleEtud />
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Liste Des Etudiants Par Filière</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/inscription">Etudiants</NavLink></li>
                                    <li className="breadcrumb-item active">Liste Des Etudiants Par Filière</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des etudiants dans la corbeille</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
                                                                <Form className='d-flex justify-content-center my-3'>
                                                                    <Form.Group className="mb-3" controlId="module" style={{ position: 'relative', marginLeft:'-30px' }}>
                                                                        <Form.Control size="lg" type="text" placeholder="Rechercher" onChange={(e) => setSearchQuery(e.target.value)} />
                                                                        <BsSearch className='fs-5' style={{ position: 'absolute', top: '15px', left: '88%' }}/>
                                                                    </Form.Group>
                                                                </Form>

                                                                <div className="row">
                                                        <div className="col-12">
                                                            <div className="card">
                                                                <div className="card-body table-responsive p-0">
                                                                    <Container fluid>
                                                                        <Row className='d-flex justify-content-center mt-5' >

                                                                            {
                                                                                load ?
                                                                                    <tr>
                                                                                        <div align='center'>
                                                                                            <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
                                                                                        </div>
                                                                                    </tr>
                                                                                    :
                                                                                EtudByFiliere.map((element,index) => {
                                                                                        return(
                                                                                            <>
                                                                                                <Col className='col-md-3 col-lg-2 mb-3'>
                                                                                                <Link to={`/etud/detailslisteEtud/${element.nomForm}`} className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                                                                                                    <Card className='border-0'>
                                                                                                        <center><BiSolidBookAlt size={70} style={{color: "#8f3393"}} /></center>
                                                                                                        <Card.Body>
                                                                                                            <center className='text-dark'>Formations {element.nomForm}</center>
                                                                                                        </Card.Body>
                                                                                                    </Card>
                                                                                                </Link>
                                                                                            </Col>
                                                                                            </>
                                                                                        )
                                                                                    })
                                                                            }
                                                                        </Row>
                                                                    </Container>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="card-footer">
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{allstud.length}</p>
                                            </div> */}
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

export default EtudiantsFiltresParFiliere;