import React from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import { Col, Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";
import LocalData from "./LocalData.jsx";


const PlaningGlobal = () => {

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleForm/>
                </Col>
                <Col className='col-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Planing Global</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Planning Global</li>
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
                                                    Dresser votre planing
                                                </h3>

                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
                                                                <LocalData/>
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

export default PlaningGlobal;