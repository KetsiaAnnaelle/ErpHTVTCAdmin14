import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import.meta.env.VITE_URL;
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { Doughnut } from 'react-chartjs-2';
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";

ChartJS.register(ArcElement);

const DashboardForm = () => {

    const [form, setform] = useState([])
    const [cours, setcours] = useState([])
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    let totalForm = 0
    let totalCours = 0

    async function getFormations() {
        try {
            const dataSet3 = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`)
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


    const options = {
        indexAxis: 'x',
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const [data, setData] = useState({
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                data:['5','6','9','1','4','7','9'],
                backgroundColor: 'rgba(63, 82, 235, 0)',
                borderColor:'blue',
                borderWidth:1
            },
            {
                label: 'Dataset 2',
                data:['5','6','9','1','4','7','9'],
                backgroundColor: 'rgba(255, 9, 13, 0.5)',
                borderColor:'aqua',
                borderWidth:1
            },
        ],
    });

    if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
        window.location.replace('/')
    }
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
                            <h1>Dashboard</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section dashboard">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="col-xxl-4 col-md-6">
                                            <div className="card info-card sales-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Formation</h5>

                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-cart"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                            {form.map((element, index) => {
                                                                totalForm=totalForm+1;
                                                            })}
                                                            <h6>{totalForm}</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-xxl-4 col-md-6'>
                                            <div className="card info-card revenue-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Cours </h5>

                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-currency-dollar"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                            {form.map((element, index) => {
                                                                totalCours=totalCours+1;
                                                            })}
                                                            <h6>{totalCours}</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-8">

                                            <div className="card info-card customers-card">



                                                <div className="card-body">
                                                    <h5 className="card-title">Evolution des payements <span></span></h5>
                                                    <div>
                                                        <Bar data={data} options={options}>Dashboard facturation </Bar>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-12">
                                        <div className="card recent-sales overflow-auto">

                                            <div className="card-body">
                                                <h5 className="card-title">Nouvelles formations</h5>

                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Nom formation</th>
                                                        <th scope="col">Montant scolarité</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {form.map((element, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{element.nomForm}</td>
                                                                    <td className='text-success fw-bold '>{element.scolariteForm}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>

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

export default DashboardForm;