import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink, redirect} from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import randomColor from "randomcolor";
import { Bar,Pie,Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend, ArcElement,
} from 'chart.js';
import.meta.env.VITE_URL;
import axios from "axios";
import { BiSolidBookAlt } from "react-icons/bi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    // label
);

// import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement);

const DashboardFact = () => {

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
          
        } catch (error) {
            console.error(error);
        }

    } 

    const [allpaie, setallpaie] = useState([])
    async function getPaiements() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement`)
            setallpaie(response.data);
          
        } catch (error) {
            console.error(error);
        }

    }     

    const [PaiePerMonth, setPaiePerMonth] = useState([]);

    // const monthNames = Array.from({length:12}, (_, 1) => format(new Date(), 'MMMM'))

    const PaymentsInscritPerMonth = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/paiement_Inscrit_Par_Mois`);
            // const result = await response.json();
            // setetudPerMonth(result.studentsPerMonth);
            const payments = response.data.PaymentsPerMonth;
            // console.log(etuds);
            setPaiePerMonth(payments);
        } catch (error) {
            console.error(error)
        }
    };

    const BarOptions = {
        indexAxis: 'x',
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
        
        animations:{
            tension: {
                duration: false,
                // easing: 'linear',
                loop: false
            }
           
        }
    };

    const months = [
        'Jan',
        'Fev',
        'Mars',
        'Avril',
        'Juin',
        'Juil',
        'Août',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
    ]

    const Barlabels = PaiePerMonth.map(result => months[result.month - 1])    
    // console.log(labels);
    const Barvalues = PaiePerMonth.map(result => result.count)
    // console.log(values);
    
    const Bardata = {
        labels: Barlabels,
        datasets: [
            {

                label: ["Chiffre d'affaire par Mois"],
                data: Barvalues,
                backgroundColor: 'rgba(63, 82, 235, 0)',
                borderColor:'blue',
                borderWidth:1
            }
        ],
    };


    // scolarite de chaque filiere
    const [ScolariteByFil, setScolariteByFil] = useState([])
    async function getScolariteParFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getScolariteByForm`);
            // console.log(response.data);
            setScolariteByFil(response.data);

            // console.log(formation_id);
        } catch (error) {
            console.log("une erreur s'est produite")
        }
    }

    //revenu filiere

    const generateRandomColor = (count) =>{
        return randomColor ({count, luminosity:"bright"})
    }

    const [revenuFil, setrevenuFil] = useState([]);
    const RevenuFiliere = async () => {

        try {
            const pielabels = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/revenu_filiere`);
            setrevenuFil(response.data.revenu);
            for (const val of form){
                pielabels.push(val.filiere)
            }
        } catch (error) {
            console.log('erreur');
        }
    };

    const PieRevenulabels = revenuFil.map(result => `${result.filiere}`)
    const ColorPieRevenu = generateRandomColor(PieRevenulabels.length)
    // console.log(labels);
    const PieRevenuvalues = revenuFil.map(result => result.revenu)
    // console.log(values);

    const dataRevenuPie = {
        datasets: [{
            data: PieRevenuvalues,
            backgroundColor: ColorPieRevenu
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: PieRevenulabels,
        
    };

    const optionsPieChartRevenu = {
        plugins: {
            legend: {
                display: true,
                // labels: Pielabels.map(element => element)
                    // color: 'rgb(255, 99, 132)'
            }
        },
        animations:{
            tension: {
                duration: false,
                // easing: 'linear',
                loop: false
            }
           
        }
    }

    useEffect(() => {
        if (!load===true){
            // getRembourssement()
            getFactures()
            getPaiements()
            PaymentsInscritPerMonth()
            getScolariteParFiliere()
            RevenuFiliere()
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
                                        <div className="row mt-5">
                                            <div className="col-md-8 text-md-center col-xl-8">
                                                <p className="display-7 text-primary fs-4 fw-bold" style={{ boxShadow:'2px 2px 2px blue', width:'50%'}}>PAIEMENTS</p>
                                            </div>
                                        </div>

                                        <div className="row mt-4">

                                            <div className="col-xxl-6 col-md-6">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="card info-card sales-card">

                                                            <div className="card-body">
                                                                <div className="d-flex align-items-center">

                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Total Des Paiements</h5>

                                                                        <div className="d-flex align-items-center">
                                                                            <div
                                                                                className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                <i className="bi bi-currency-dollar"></i>
                                                                            </div>
                                                                            <div className="ps-3">
                                                                                {allpaie.map((element, index) => {
                                                                                    totalPaie=totalPaie+element.MontantPaiement;
                                                                                })}
                                                                            <h6>{totalPaie} FCFA</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className='col'>
                                                        <div className="card info-card revenue-card">

                                                            <div className="card-body">
                                                                <h5 className="card-title">Moyens de Paiement les plus utilisés </h5>

                                                                <div className="d-flex align-items-center">
                                                                    
                                                                    <div className="ps-3">
                                                                        
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                {allpaie.map((element, index) => {
                                                                                    return(
                                                                                        allpaie.length==1?

                                                                                        <div className="col">
                                                                                            <div class="card" style={{ boxShadow:'2px 2px 2px blue'}}>
                                                                                                <div class="card-body">
                                                                                                    {/* <div
                                                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                                        <i className="bi bi-currency-dollar"></i>
                                                                                                    </div> */}
                                                                                                    <h5 class="card-title fs-2 text-primary fw-bold">{element.MoyenPaiement}</h5>
                                                                                                    <h6 class="card-text">{element.MontantPaiement} FCFA</h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        
                                                                                        :
                                                                                        <div key={index} className="col-md-6">
                                                                                            <div class="card" style={{ boxShadow:'2px 2px 2px blue'}}>
                                                                                                <div class="card-body">
                                                                                                    <h5 class="card-title fs-2 text-primary fw-bold">{element.MoyenPaiement}</h5>
                                                                                                    <h6 class="card-text">{element.MontantPaiement} FCFA</h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 col-xxl-6">

                                                <div className="card info-card customers-card">

                                                    <div className="card-body">
                                                        <h5 className="card-title">Evolution des Paiements inscrits par Mois <span></span></h5>
                                                        <div>
                                                            <Bar data={Bardata} options={BarOptions} style={{ height:'50%' }}>Dashboard Etudiant </Bar>
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
                                                        {allpaie.map((element, index) => {
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

                        <section className="section dashboard mt-5">
                            <div className="row mt-5">

                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-md-8 text-md-center col-xl-8">
                                            <p className="display-7 text-primary fs-4 fw-bold" style={{ boxShadow:'2px 2px 2px blue', width:'50%'}}>FACTURATION</p>
                                        </div>
                                    </div>

                                    <div className="row mt-5">

                                        {/* Frais de Scolarite par filieres */}

                                        <div className="col-xxl-4 col-md-12">
                                            <div className="card info-card sales-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Frais de Scolarite de chaque Filière</h5>

                                                    <div className="d-flex align-items-center">
                                                        <div className="ps-3">
                                                            {ScolariteByFil.map((element, index) => {
                                                        
                                                                return(
                                                                    <p className="fw-bold text-primary" key={index}><BiSolidBookAlt size={30} style={{color: 'purple'}} /> {element.nomForm} : <span className="text-danger fw-bold">{element.total} FCFA</span></p>
                                                                )
                                                            })}
                                                        </div>
                                                    </div> 
                                                </div>

                                            </div>
                                        </div>
                                        
                                        <div className="col-md-12 col-xxl-8">
                                            <div className="card">
                                                <div className="card-body" style={{ height:'47%', width:'47%' }}>
                                                <h5 className="card-title">Revenu de chaque Filiere</h5>

                                                {/* <!-- Pie Chart --> */}
                                                <div id="pieChart"></div>

                                                <Pie data={dataRevenuPie} options={optionsPieChartRevenu}/>

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

export default DashboardFact;