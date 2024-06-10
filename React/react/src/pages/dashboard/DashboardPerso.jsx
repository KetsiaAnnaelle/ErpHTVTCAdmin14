import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
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
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";
import.meta.env.VITE_URL;
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";

ChartJS.register(ArcElement);

const DashboardPerso = () => {

    const [paie, setpaie] = useState([])
    const [ens, setens] = useState([])
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    let totalEns = 0
    let totalPaie = 0

    async function getPersonnels() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/personnels`)
            setens(response.data);
        } catch (error) {
            console.error(error);
        }

    } async function getPaiementPerso() {
        try {
            const dataSet2 = []
            const response1 = await axios.get(`${import.meta.env.VITE_URL}/paiementPersos`)
            setpaie(response1.data);
            for(const val of paie){
                dataSet2.push(val.MontantPaiementPerso)
            }

            setData({
                labels:['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Jullet','Août','Septembre','Octobre','Novembre','Decembre'],
                datasets: [
                    {
                        label: 'Paiement',
                        data:dataSet2,
                        backgroundColor: 'rgba(65, 84, 241)',
                        borderColor:'blue',
                        borderWidth:1
                    }
                ],
            })
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        if (!load===true){
            getPersonnels()
            getPaiementPerso()
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
                text: 'Evolution mensuelle des paiements',
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
            }
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
                    <BarreLateralePerso/>
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
                                                    <h5 className="card-title">Paiement</h5>

                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-cart"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                            {paie.map((element, index) => {
                                                                totalPaie=totalPaie+element.MontantPaiementPerso;
                                                            })}
                                                            <h6>{totalPaie} FCFA</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col-xxl-4 col-md-6'>
                                            <div className="card info-card revenue-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Nombre Personnels </h5>

                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-currency-dollar"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                            {ens.map((element, index) => {
                                                                totalEns=totalEns+1;
                                                            })}
                                                            <h6>{totalEns}</h6>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md">

                                            <div className="card info-card customers-card">



                                                <div className="card-body">
                                                    <h5 className="card-title">Evolution des paiements <span></span></h5>
                                                    <div>
                                                        <Bar data={data} options={options}>Dashboard Personnel </Bar>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="col-12">
                                        <div className="card recent-sales overflow-auto">

                                            <div className="card-body">
                                                <h5 className="card-title">Paiements recents</h5>

                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Reference</th>
                                                        <th scope="col">Personnel</th>
                                                        <th scope="col">Montant</th>
                                                        <th scope="col">Moyen de paiement</th>
                                                        <th scope="col">Motif</th>
                                                        <th scope="col">Prochain Paiement</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {paie.map((element, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{element.RefPaiementPerso}</td>
                                                                    <td>{element.nomPerso+' '+element.prenomPerso}</td>
                                                                    <td className='text-success fw-bold '>{element.MontantPaiementPerso}</td>
                                                                    <td>{element.MoyenPaiementPerso}</td>
                                                                    <td>{element.MotifPaiementPerso}</td>
                                                                    <td className='text-danger fw-bold'>{element.ProchainPaiementPerso}</td>
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

export default DashboardPerso;