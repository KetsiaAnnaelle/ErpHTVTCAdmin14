import React, {useEffect, useState, useRef} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import { Col, Container, Row} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";
import axios from "axios";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {AppBarComponent} from "@syncfusion/ej2-react-navigations";
import.meta.env.VITE_URL;
import LocalData from "./LocalData.jsx";


const Examen = () => {

    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const {nomForm}=useParams()
    const [form, setform] = useState([])
    let scheduleObj = useRef(null);

    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form/${nomForm}`);
            setform(response.data);
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
                <Col className='col-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Examen</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/choix_formation">Choisir Formation</NavLink></li>
                                    <li className="breadcrumb-item active">Examen</li>
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
                                                    Examen de la formation {form.nomForm}
                                                </h3>

                                            </div>
                                            <div className="card-body">
                                                <LocalData/>
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

export default Examen;