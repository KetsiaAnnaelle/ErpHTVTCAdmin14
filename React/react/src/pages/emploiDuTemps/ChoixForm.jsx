import React, {useEffect, useState} from 'react';
import { Card, Col, Container, Row} from "react-bootstrap";
import {Link, NavLink} from "react-router-dom";
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";
import { BiSolidBookAlt} from "react-icons/bi";
import axios from "axios";
import ReactLoading from "react-loading";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import.meta.env.VITE_URL;

const ChoixForm = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)

    const [form, setform] = useState([])
    const [records, setRecords] = useState(form)
    const [selectedFormation, setSelectedFormation] = useState('');

    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
            setform(response.data);
            setRecords(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getFormations()
        }
    },[fresh])

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleForm/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Choisissez une formation</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/form">Formations</NavLink></li>
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
                                                <h3 className="card-title">Choisissez une formation pour créer son emploi du temps</h3>
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
                                                                                <tr>
                                                                                    <td colSpan={9} align='center'>
                                                                                        <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
                                                                                    </td>
                                                                                </tr>
                                                                                :
                                                                                records.map((element,index) => {
                                                                                    return(
                                                                                        <>
                                                                                            <Col className='col-md-3 col-lg-2 mb-3'>
                                                                                            <Link to={`/emploiTemps/${element.nomForm}`} className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
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

export default ChoixForm;