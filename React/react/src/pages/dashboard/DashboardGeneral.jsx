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

ChartJS.register(ArcElement);

const DashboardGeneral = () => {

    const [remb, setremb] = useState([])
    const [paie, setpaie] = useState([])
    const [fact, setfact] = useState([])
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)
    let totalPaie = 0
    let totalRemb = 0

    async function getFactures() {
        try {
            const dataSet3 = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/factures`)
            setfact(response.data);
            /* for (const val of fact){
                 dataSet3.push(val.paye)
             }

             setdata1({
                 labels: ['Red', 'Blue'],
                 datasets: [
                     {
                         label: 'Paye en fonction du reste',
                         data: dataSet3,
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                         ],
                         borderColor: [
                             'rgba(255, 99, 132, 1)',
                             'rgba(54, 162, 235, 1)',
                         ],
                         borderWidth: 1,
                     },
                 ],
             })*/
        } catch (error) {
            console.error(error);
        }

    } async function getRembourssement() {
        try {
            const dataSet2 = []
            const response1 = await axios.get(`${import.meta.env.VITE_URL}/rembourssements`)
            setremb(response1.data);
            for(const val of remb){
                dataSet2.push(val.paye)
            }

            const dataSet1 = []
            //const labelSet = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement`)
            setpaie(response.data);
            for(const val of paie){
                dataSet1.push(val.MontantPaiement)
                //labelSet.push(val.created_at)
            }

            setData({
                labels:['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Jullet','Août','Septembre','Octobre','Novembre','Decembre'],
                datasets: [
                    {
                        label: 'Rembourssement',
                        data:dataSet2,
                        backgroundColor: 'rgba(65, 84, 241)',
                        borderColor:'blue',
                        borderWidth:1
                    },
                    {
                        label: 'Paiement',
                        data:dataSet1,
                        backgroundColor: 'rgba(46, 206, 172)',
                        borderColor:'aqua',
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
            getRembourssement()
            getFactures()
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

    /*const [data1,setdata1] =useState(
        {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
    )*/

    if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
        window.location.replace('/')
    }
    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleFact/>
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
                                                                totalPaie=totalPaie+element.MontantPaiement;
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
                                                    <h5 className="card-title">Rembourssement </h5>

                                                    <div className="d-flex align-items-center">
                                                        <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-currency-dollar"></i>
                                                        </div>
                                                        <div className="ps-3">
                                                            {remb.map((element, index) => {
                                                                totalRemb=totalRemb+element.paye;
                                                            })}
                                                            <h6>{totalRemb} FCFA</h6>
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
                                                <h5 className="card-title">Paiements recents</h5>

                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Reference</th>
                                                        <th scope="col">Filière</th>
                                                        <th scope="col">Etudiant</th>
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
                                                                    <td>{element.RefPaiement}</td>
                                                                    <td>{element.nomForm}</td>
                                                                    <td>{element.nomEtud+' '+element.prenomEtud}</td>
                                                                    <td className='text-success fw-bold '>{element.MontantPaiement}</td>
                                                                    <td>{element.MoyenPaiement}</td>
                                                                    <td>{element.MotifPaiement}</td>
                                                                    <td className='text-danger fw-bold'>{element.ProchainPaiement}</td>
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

export default DashboardGeneral;