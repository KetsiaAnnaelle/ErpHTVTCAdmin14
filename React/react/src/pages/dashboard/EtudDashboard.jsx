import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink, useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {Col, Container, Row, Card} from "react-bootstrap";
import { FaUserGraduate,FaFemale,FaMale,FaFlag   } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend, ArcElement, Colors,
} from 'chart.js';
import { Bar,Pie,Line } from 'react-chartjs-2';
import axios from "axios";

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

import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import randomColor from "randomcolor";
import { BiSolidBookAlt } from "react-icons/bi";
import.meta.env.VITE_URL;

const EtudDashboard = () => {

    const [etud, setetud] = useState([])
    const [abs, setabs] = useState([])
    const [form, setform] = useState([])
    const [topetud, settopetud] = useState([])
    const [nbreEtudByFil, setnbreEtudByFil] = useState([])
    const [absByFil, setabsByFil] = useState([])
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)

    let total = 0
    
    let totalheureAbs = 0
    
    async function getEtudiants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`)
            setetud(response.data);
            // console.log(etud)
        } catch (error) {
            console.error(error);
        }
    }
    
    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getFormation`);
            setform(response.data);
        } catch (error) {
            console.error(`Erreur : ${error}`);
        }
    }
    
    async function getEtudiantsParFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getEtudByForm`);
            // console.log(response.data);
            setnbreEtudByFil(response.data);

            // console.log(formation_id);
        } catch (error) {
            console.log("une erreur s'est produite")
        }
    }

    async function getAbsences() {
        try {
            const dataSet1 = []
            const labelSet = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/abscences`)
            setabs(response.data);
            
        } catch (error) {
            console.error(error);
        }

    }

    async function getAbsencesParFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getAbscByForm`);
            // console.log(response.data);
            setabsByFil(response.data);

            // console.log(formation_id);
        } catch (error) {
            console.log("une erreur s'est produite")
        }
    }

    async function TopEtudiants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/top_Students`);
            settopetud(response.data)
            console.log(response.data);
            console.log(topetud.meilleurs_etudiants.map(ele => (ele.nomForm)));
        } catch (error) {
            console.error(error)
        }
    }

    // console.log(topetud);

    // console.log(absByFil);

    //ETUDIANTSss

    const [etudPerMonth, setetudPerMonth] = useState([]);

    // const monthNames = Array.from({length:12}, (_, 1) => format(new Date(), 'MMMM'))

    const EtudianInscritPerMonth = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/etudiant_Inscrit_Par_Mois`);
            // const result = await response.json();
            // setetudPerMonth(result.studentsPerMonth);
            const etuds = response.data.studentsPerMonth;
            // console.log(etuds);
            setetudPerMonth(etuds);
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getEtudiantsParFiliere()
    }, [])


    const options = {
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

    const Barlabels = etudPerMonth.map(result => months[result.month - 1])    
    // console.log(labels);
    const Barvalues = etudPerMonth.map(result => result.count)
    // console.log(values);
    
    const Bardata = {
        labels: Barlabels,
        datasets: [
            {

                label: ["Nombre d'Etudiants Inscrits par Mois"],
                data: Barvalues,
                backgroundColor: 'rgba(63, 82, 235, 0)',
                borderColor:'blue',
                borderWidth:1
            }
        ],
    };

    const generateRandomColor = (count) =>{
        return randomColor ({count, luminosity:"bright"})
    }

    const [effFormPercent, seteffFormPercent] = useState([]);
    const EffectifsFiliereEnPourcentage = async () => {

        try {
            const pielabels = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/effectif_filiere_enPourcentage`);
            seteffFormPercent(response.data.effectifFiliereParPercentage);
            for (const val of form){
                pielabels.push(val.filiere)
            }
            // console.log(response.data);
        } catch (error) {
            console.log('erreur');
        }
    };

    const Pielabels = effFormPercent.map(result => `${result.filiere} (${result.percentage.toFixed(2)}%)`)
    // console.log(Pielabels);

    const Pievalues = effFormPercent.map(result => result.percentage )


    const Colors = generateRandomColor(Pielabels.length)

    const dataPie = {
        datasets: [{
            data: Pievalues,
            backgroundColor: Colors
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: Pielabels,
    };

    const optionsPieChart = {
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


    //ABSENCE

    const [absFormPercent, setabsFormPercent] = useState([]);
    const AbsencesFiliereEnPourcentage = async () => {

        try {
            const pielabels = []
            const response = await axios.get(`${import.meta.env.VITE_URL}/absence_filiere_enPourcentage`);
            setabsFormPercent(response.data.absenceFiliereParPercentage);
            for (const val of form){
                pielabels.push(val.filiere)
            }
        } catch (error) {
            console.log('erreur');
        }
    };


    const PieAbslabels = absFormPercent.map(result => `${result.filiere} (${result.percentage.toFixed(2)}%)`)
    const ColorPieAbs = generateRandomColor(PieAbslabels.length)
    // console.log(labels);
    const PieAbsvalues = absFormPercent.map(result => result.percentage)
    // console.log(values);

    const dataAbsPie = {
        datasets: [{
            data: PieAbsvalues,
            backgroundColor: ColorPieAbs
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: PieAbslabels,
        
    };


   
    // LineChart Absence

    const optionsLineChart = {
        scales: {
            y: {
              beginAtZero: true
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


    const [absPerMonth, setabsPerMonth] = useState([]);
    const absencePerMonth = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/absence_Par_Mois`);
        setabsPerMonth(response.data.absencesPerMonth);
        // console.log(response.data.studentsPerMonth);
        // console.log(absPerMonth);
        } catch (error) {
            console.log('Erreur jf' + error);
        }
    };

    const Linelabels = absPerMonth.map(result => months[result.month - 1])
    // const Pielabels = {labels: effFormPercent.map(result => `${result.filiere} (${result.percentage.toFixed(2)}%)`)}
    // console.log(labels);
    const Linevalues = absPerMonth.map(result => result.count)

    const dataLineChart ={
        labels: Linelabels,
        datasets: [{
          data: Linevalues,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
    }

  

    useEffect(() => {
        if (!load===true){
            getEtudiants()
            getFormations()
            getAbsences()
            EffectifsFiliereEnPourcentage()
            getAbsencesParFiliere()
            AbsencesFiliereEnPourcentage()
            absencePerMonth()
            EtudianInscritPerMonth()
            getEtudiantsParFiliere()
            TopEtudiants()
            // NbreFiliere()
        }
    },[fresh])
    


    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col className='d-md-none d-lg-block'>
                    <BarreLateraleEtud/>
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
                            <div className="row mt-5">

                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-md-8 text-md-center col-xl-8">
                                            <p className="display-7 text-primary fs-4 fw-bold" style={{ boxShadow:'2px 2px 2px blue', width:'50%'}}>ETUDIANTS</p>
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-xxl-3 col-md-6">
                                            <div className="container">

                                                <div className="row">

                                                    {/* Total Etudiant */}
                                                    <div className="col-md-12">

                                                        <div className="card info-card sales-card">

                                                            <div className="card-body">
                                                                <h5 className="card-title">Total Etudiants</h5>

                                                                <div className="d-flex align-items-center">
                                                                    <div
                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                        {/* <i className="FaUserGraduate"></i> */}
                                                                        <FaUserGraduate />
                                                                    </div>
                                                                    <div className="ps-3">
                                                                        {etud.map((element, index) => {
                                                                            total=total+1;
                                                                        })}
                                                                        <h6>{total} </h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Francophone et Anglophone */}

                                                <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="card info-card sales-card">

                                                                <div className="card-body">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <h5 className="card-title mx-1">Franco.</h5>

                                                                                <div className="d-flex align-items-center">
                                                                                <div
                                                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                    {/* <i className="FaUserGraduate"></i> */}
                                                                                    <FaFlag/>
                                                                                </div>
                                                                                    
                                                                                    <div className="ps-3">
                                                                                       <h6> {etud.filter(et => et.section == 'Francophone').length }</h6>
                                                                                    </div>
                                                                                </div> 

                                                                            </div> 

                                                                            <div className="col-md-6">
                                                                                <h5 className="card-title">Anglo.</h5>

                                                                                <div className="d-flex align-items-center">
                                                                                <div
                                                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                    {/* <i className="FaUserGraduate"></i> */}
                                                                                    <FaFlag className="text-danger"/>
                                                                                </div>
                                                                                    <div className="ps-3">
                                                                                       <h6> {etud.filter(et => et.section == 'Anglophone').length }</h6>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    
                                                                </div>

                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>

                                        </div>
                                        
                                        {/* Effectifs filles et Garcons */}

                                        <div className="col-xxl-3 col-md-6">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <div className="card info-card sales-card">

                                                            <div className="card-body">
                                                                <h5 className="card-title">Effectifs Filles</h5>

                                                                <div className="d-flex align-items-center">
                                                                    <div
                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                        {/* <i className="bi bi-cart"></i> */}
                                                                        <FaFemale />
                                                                    </div>
                                                                    <div className="ps-3">
                                                                        <h6> {etud.filter(et => et.sexe == 'Feminin').length }</h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="card info-card revenue-card">

                                                            <div className="card-body">
                                                                <h5 className="card-title">Effectifs Garçon </h5>

                                                                <div className="d-flex align-items-center">
                                                                    <div
                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                        {/* <i className="bi bi-currency-dollar"></i> */}
                                                                        <FaMale  />
                                                                    </div>
                                                                    <div className="ps-3">
                                                                        <h6> {etud.filter(et => et.sexe == 'Masculin').length }</h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Total etudiants inscrits */}

                                        <div className="col-md-12 col-xxl-6">

                                            <div className="card info-card customers-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Nombres d'étudiants inscrits par Mois <span></span></h5>
                                                    <div>
                                                        <Bar data={Bardata} options={options} style={{ height:'50%' }}>Dashboard Etudiant </Bar>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                                
                                    </div>

                                    <div className="row">

                                        {/* etudiants par filieres */}

                                        <div className="col-xxl-4 col-md-12">
                                            <div className="card info-card sales-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Etudiants Par Filière</h5>

                                                    <div className="d-flex align-items-center">
                                                        {/* <div
                                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-cart"></i>
                                                        </div> */}
                                                        <div className="ps-3">
                                                            {nbreEtudByFil.map((element, index) => {
                                                                return(
                                                                    <p className="fw-bold text-primary" key={index}>{element.nomForm} : <span className="text-danger fw-bold">{element.nombre}</span>  </p>
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
                                                <h5 class="card-title">Pourcentage des etudiants par Filiere</h5>

                                                {/* <!-- Pie Chart --> */}

                                                <Pie data={dataPie} options={optionsPieChart}/>
                                                {/* <!-- End Pie Chart --> */}

                                                </div>
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
                                            <p className="display-7 text-primary fs-4 fw-bold" style={{ boxShadow:'2px 2px 2px blue', width:'50%'}}>ABSENCES</p>
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-xxl-6 col-md-6">
                                            <div className="container">

                                                <div className="row">

                                                    {/* Total Etudiantt */}
                                                    <div className="col-md-12">

                                                        <div className="card info-card sales-card">

                                                            <div className="card-body">
                                                                <h5 className="card-title">Total Absences</h5>

                                                                <div className="d-flex align-items-center">
                                                                    <div
                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                        <i className="bi bi-cart"></i>
                                                                    </div>
                                                                        

                                                                    <div className="ps-3">
                                                                        {abs.map((element) => {
                                                                            totalheureAbs=totalheureAbs+element.nbreHeureAbs
                                                                        })}
                                                                         <h6>{totalheureAbs} </h6>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Francophone et Anglophone */}

                                                <div className="row">
                                                        <div className="col-xxl-12 col-md-12">
                                                            <div className="card info-card sales-card">

                                                                <div className="card-body">
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col-md-6 col-lg-6">
                                                                                <h5 className="card-title">Total Francophone</h5>

                                                                                <div className="d-flex align-items-center">
                                                                                    
                                                                                    <div
                                                                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                        <FaFlag/>
                                                                                    </div>

                                                                                    <div className="ps-3">
                                                                                        <h6>{abs.filter(et => et.section == 'Francophone' && et.nbreHeureAbs!==0).length } </h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div> 

                                                                            <div className="col-md-6 col-lg-6">
                                                                                <h5 className="card-title">Total Anglophone</h5>

                                                                                <div className="d-flex align-items-center">

                                                                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                                        <FaFlag className="text-danger"/>
                                                                                    </div>

                                                                                    <div className="ps-3">
                                                                                        <h6> {abs.filter(et => et.section == 'Anglophone' && et.nbreHeureAbs !==0).length }</h6> 
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    
                                                                </div>

                                                            </div>
                                                        </div>
                                                    
                                                </div>
                                            </div>

                                        </div>

                                        {/* Total ABSENCES inscrits */}

                                        <div className="col-md-12 col-xxl-6">

                                            <div className="card info-card customers-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Progression des Absences Par Mois <span></span></h5>
                                                    <div>
                                                        <Line data={dataLineChart} options={optionsLineChart}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                                
                                    </div>

                                    <div className="row">

                                        {/* ABSENCES par filieres */}

                                        <div className="col-xxl-4 col-md-12">
                                            <div className="card info-card sales-card">

                                                <div className="card-body">
                                                    <h5 className="card-title">Absence Par Filière</h5>

                                                    <div className="d-flex align-items-center">
                                                        <div className="ps-3">
                                                            {absByFil.map((element, index) => {
                                                        
                                                                return(
                                                                    <p className="fw-bold text-primary" key={index}><BiSolidBookAlt size={30} style={{color: 'purple'}} />{element.nomForm} : <span className="text-danger fw-bold">{element.nombre}</span>  </p>
                                                                    // <p className="fw-bold text-primary" key={index}><BiSolidBookAlt size={30} style={{color: `${ColorIconsFormations}`}} />{element.nomForm} : <span className="text-danger fw-bold">{element.nombre}</span>  </p>
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
                                                <h5 className="card-title">Pourcentage des absences par Filière</h5>

                                                {/* <!-- Pie Chart --> */}
                                                <div id="pieChart"></div>

                                                <Pie data={dataAbsPie}/>
                                                {/* <!-- End Pie Chart --> */}

                                                </div>
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
                                            <p className="display-7 text-primary fs-4 fw-bold" style={{ boxShadow:'2px 2px 2px blue', width:'50%'}}>CONDUITES</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Top 5 des meilleurs étudiants</h5>
                                                    <div className="d-flex align-items-center">
                                                         <div className="ps-3">
                                                            {topetud.meilleurs_etudiants && topetud.meilleurs_etudiants.map((element,index) => {
                                                                return(
                                                                    <div key={index}>
                                                                        <p className="text-primary fw-bold"> <BiSolidBookAlt size={30} style={{color: 'purple'}} /> Filière: {element.nomForm}</p>
                                                                        <p className="text-primary">{element.nomEtud}: {element.notecond}</p>
                                                                    </div>
                                                                )
                                                            })} 
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="card info-card sales-card">
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-6">
                                                                <h5 className="card-title">Top 5 des faibles étudiants</h5>

                                                                <div className="d-flex align-items-center">
                                                                
                                                                    <div className="ps-3">
                                                                        {topetud.faibles_etudiants && topetud.faibles_etudiants.map((element,index) => {
                                                                            return(
                                                                               <div key={index}>
                                                                                    <p className="text-primary fw-bold"> <BiSolidBookAlt size={30} style={{color: 'purple'}} /> Filière: {element.nomForm}</p>
                                                                                    <p className="text-primary">{element.nomEtud}: {element.notecond}</p>
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




export default EtudDashboard;