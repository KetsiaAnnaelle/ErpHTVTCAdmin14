import React, {useEffect, useState} from 'react';
import { Card, Col, Container, Row} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import { BiSolidBookAlt } from "react-icons/bi";
import axios from "axios";
import ReactLoading from "react-loading";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";

const ChoixFormFicheAbsence = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)

    const [form, setform] = useState([])
    const [abs, setabs] = useState([])
    const [records, setRecords] = useState(form)
    const [selectedFormation, setSelectedFormation] = useState('');

    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
            setform(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAbsenceParFiliere() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/formation/nombre`);
            setabs(response.data);
            console.log(response.data)
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getFormations()
            getAbsenceParFiliere()
        }
    },[fresh])

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Choisissez une formation</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/abscence">Absence</NavLink></li>
                                    <li className="breadcrumb-item active">Choisir Formation</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Choisissez une formation pour créer une fiche d'absence</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
                                                                <Container fluid>
                                                                    <Row className='d-flex justify-content-center mt-5' >

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
                                                                                abs.map((element,index) => {
                                                                                    return(
                                                                                        <>
                                                                                            <Col className='col-md-3 col-lg-3 mb-3'>
                                                                                                <Link to={`/fiche_absence/${element.nomForm}`} className='text-center fw-1 text-dark' style={{ textDecoration:'none' }}>
                                                                                                    <Card className='border-0'>
                                                                                                        <center><BiSolidBookAlt size={48} style={{color: "#8f3393"}} /></center>
                                                                                                        <Card.Body>
                                                                                                            <center className='text-dark'>{element.nomForm}</center><br/>
                                                                                                            <center className='text-dark fw-bold'>{element.nombre} </center>
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

export default ChoixFormFicheAbsence;