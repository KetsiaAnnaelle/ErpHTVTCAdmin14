import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import HeaderGeneral from '../../../component/HeaderGeneral.jsx';
import BarreLateraleDepense from '../../../component/BarreLateraleDepense.jsx';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Transaction from '../Transaction.jsx';
import Catégorie from '../Catégorie/Catégorie.jsx';
import.meta.env.VITE_URL;


const Sortie = () => {

    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);

    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();

    // //Pour montrer la modal la filiere
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

   


    const [exchangeRates, setExchangeRates] = useState(null);

    const [allcat, setallcat] = useState([])
    const [allbudget, setallbudget] = useState([])

    useEffect(() => {
        const fetchExchangeRates = async () => {
        try {
            const apiKey = '08df3687a84550da694ba143';
            const response = await axios.get(
            `https://open.er-api.com/v6/latest/${apiKey}`
            );

            if (response.data && response.data.rates) {
                setExchangeRates(response.data.rates);
            } else {
            console.error('Invalid response structure:', response);
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des taux de change :', error);
        }

        };

        fetchExchangeRates();
    }, []);


    async function GetCategories() {
        try {
            // setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/categorieDepense`);
            setallcat(response.data);
            // JSON.stringify(response.data)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const dateActuelle = new Date().toISOString().split('T')[0];

    async function GetBudgets() {
        try {
            // setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/budget`);
            setallbudget(response.data);
            // JSON.stringify(response.data)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const AddBudget = async(data) =>{

        const fData = new FormData()
        fData.append('nomBudget',data.nomBudget)
        fData.append('montant',data.montant)
        fData.append('devise',data.devise)
        fData.append('categorie_id',data.categorie_id)
        fData.append('dateDepart',data.dateDepart)

        axios.post(`${import.meta.env.VITE_URL}/budget`,fData)
            .then(function (response) {
                console.log(response.data);
                setShow(false)
                swal({
                    title: "Budget Ajouté Avec Succès !!!",
                    icon: "success",
                    button: "OK",
                });
                
               reset()

                GetBudgets()

                allbudget(response.data)
                
                // getStudents();
            })
            .catch(function(error)  {

                console.error(error)

                //gestion des erreurs de validation

             /*   if (error.response && error.response.status ===422) {
                    const errors = error.response.data.errors;

                    setvalidationErrors(errors)

                } else {

                    console.error('Erreur non geres : ',error.message);
                }*/
            })
    }

    useEffect(() => {
        GetCategories()
        GetBudgets()
    }, [])

    // console.log(exchangeRates);



    //les boutons repeter


    const [repeatOption, setRepeatOption] = useState('');
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    const handleRepeatAction = async () => {
        try {
            // Envoyer la demande à l'API Laravel
            const response = await axios.post(`${import.meta.env.VITE_URL}/boutonsRepeter`, {
                repeatOption: repeatOption,
            });

            // Gérer la réponse réussie si nécessaire
            console.log(response.data.message);

            // Désactiver les autres boutons après avoir cliqué sur l'un d'eux
            setButtonDisabled(true);

        } catch (error) {
            // Gérer les erreurs de l'API
            console.error('Erreur lors de la répétition de l\'action', error);
        }
    };



    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleDepense/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Sorties</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Sorties</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Listes des Sorties</h3>
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
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Supprimer plusieurs Sorties</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleSupprimeSelected(selectedRecords)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Restaurer plusieurs Sorties</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                <div className="col-xl">
                                                                    <div className="card w-100">
                                                                        <div className="card-body pt-3">
                                                                        {/* <!-- Bordered Tabs --> */}
                                                                            <ul className="nav nav-tabs nav-tabs-bordered">

                                                                                {/* <li className="nav-item">
                                                                                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                                                                                </li> */}

                                                                                {/* <li className="nav-item">
                                                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#categorie">Categories</button>
                                                                                </li> */}

                                                                                <li className="nav-item">
                                                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#budget">BUGDET</button>
                                                                                </li>

                                                                                {/* <li className="nav-item">
                                                                                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#transaction">Transactions</button>
                                                                                </li> */}

                                                                                

                                                                            </ul>

                                                                            <div className="tab-content pt-2">

                                                                                <div className="tab-pane fade profile-edit pt-3" id="budget">

                                                                                    <div className="container">
                                                                                        <div className="row">
                                                                                            <div className="col-md-6">
                                                                                            {
                                                                                                allbudget.map((element,index)=>{
                                                                                                    return(
                                                                                                        <>
                                                                                                            <Link class="card" to= {`/details-Budget/${element.id}`}>
                                                                                                                <div class="card-body">
                                                                                                                    <h5 class="card-title">{element.nomBudget}</h5>
                                                                                                                    <h6 class="card-subtitle mb-2 fs-3 fw-bold text-muted-success">{element.montant} {element.devise} restant</h6>
                                                                                                                    <p class="card-text">De {element.montant} {element.devise}</p>
                                                                                                                    <Button variant="info" size="lg" className='mb-3 w-100' onClick={handleShow} style={{ cursor:'pointer' }}>0.0%</Button>
                                                                                                                </div>
                                                                                                            </Link>

                                                                                                            {/* <MyVerticallyCenteredModal
                                                                                                                show={(idL===element.id) && modalShow}
                                                                                                                onHide={() => setModalShow(false)}
                                                                                                                data={params}
                                                                                                                categorie={allcat}
                                                                                                            /> */}

                                                                                                        </>






                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                            </div>

                                                                                            <div className="col-md-6">
                                                                                                <div className="card">

                                                                                                    <div className="card-body">
                                                                                                        <div className="row">
                                                                                                            <div className="col-md-10 text-center">

                                                                                                                <p className='card-text fs-5 mt-3'>Prenez le contrôle de vos dépenses et économisez plus d'argent avec les budgets</p>
                                                                                                                {/* <button className="btn btn-info" >Creer un nouveau budget</button> */}
                                                                                                                <Button variant="info" size="lg" className='mb-3' onClick={handleShow} style={{ cursor:'pointer' }}>Creer un nouveau budget</Button>
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                             
                                                                                        
                                                                                        

                                                                                        <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

                                                                                            <Modal.Header closeButton>
                                                                                                <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-center'>Ajouter un Nouveau Budget</Modal.Title>
                                                                                            </Modal.Header>

                                                                                            <Modal.Body>


                                                                                                <Form onSubmit={handleSubmit(AddBudget)}>
                                                                                                    <>
                                                                                                        <div className="container">

                                                                                                            <div className="row mb-3">
                                                                                                                <p className='fw-bold fs-5'>Informations Générales</p>

                                                                                                                <div className="col-md-4">

                                                                                                                    <Form.Group className="mb-3" controlId="" >
                                                                                                                        <Form.Label>Nom du Budget</Form.Label>
                                                                                                                        <Form.Control type="text" {...register("nomBudget", { required: true })}  />
                                                                                                                        {errors.nomBudget?.type==='required' && <span className='text-danger'>Le Nom du Budget est Obligatoire</span>}
                                                                                                                    </Form.Group>

                                                                                                                    
                                                                                                                </div>


                                                                                                                <div className="col-md-4">

                                                                                                                    <Form.Group className="mb-3" controlId="" >
                                                                                                                        <Form.Label>Montant </Form.Label>
                                                                                                                        <Form.Control type="number" {...register("montant", { required: true, min:0 })}  />
                                                                                                                        {errors.montant?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
                                                                                                                        {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
                                                                                                                    </Form.Group>
                                                                                                                </div>


                                                                                                                <div className="col-md-4">
                                                                                                                    <Form.Label>Devise </Form.Label>
                                                                                                                    <Form.Select aria-label="Default select example" {...register("devise", { required: true })} className='mb-3' controlId="">
                                                                                                                        {/* <option>Devise</option> */}
                                                                                                                        <option value="USD">USD</option>
                                                                                                                        <option value="Fcfa">Fcfa</option>
                                                                                                                        <option value="Euro">Euro</option>
                                                                                                                        <option value="Yuan">Yuan</option>
                                                                                                                    </Form.Select>
                                                                                                                    {errors.devise?.type==='required' && <span className='text-danger'>La devise est Obligatoire</span>}


                                                                                                                </div>


                                                                                                            </div>

                                                                                                            <div className="row mb-3">
                                                                                                                <p className='fw-bold fs-5'>Filtrer Budget</p>
                                                                                                            

                                                                                                                {/* <div className="col-md-4">
                                                                                                                    <label htmlFor="">Portefeuilles</label>
                                                                                                                    <input type="text" id='nom' className='form-control'/>
                                                                                                                </div> */}

                                                                                                                <div className="col-md-6">
                                                                                                                    <Form.Label>Budgétiser pour </Form.Label>
                                                                                                                    
                                                                                                                    <Form.Select aria-label="Default select example" {...register("categorie_id", { required: true })} className='mb-3' controlId="fil" multiple>
                                                                                                                        <option>Choisir la categorie</option>
                                                                                                                        {
                                                                                                                            
                                                                                                                            allcat.map((element, index) => {
                                                                                                                                return (
                                                                                                                                    <option key={index} value={element.id} >{element.nomCat}</option>
                                                                                                                                );
                                                                                                                            })
                                                                                                                            
                                                                                                                        }
                                                                                                                    </Form.Select>
                                                                                                                    {errors.categorie_id?.type==='required' && <span className='text-danger'>Le choix de la categorie est Obligatoire</span>}

                                                                                                                </div>




                                                                                                            </div>

                                                                                                            {/* <div className="row mb-3 bouton">
                                                                                                                <p className='fw-bold fs-5'>Périodes Budgetaires</p> 

                                                                                                                <span className="text-sm">Répéter</span>

                                                                                                                <div className="row">
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-secondary" onClick={() => {setRepeatOption('once'); setButtonDisabled(true);}} disabled={isButtonDisabled | repeatOption !== 'once'} style={{borderRadius:'30px'}}>Une fois</button>
                                                                                                                    </div>
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-secondary" onClick={() => {setRepeatOption('daily'); setButtonDisabled(true);}} disabled={isButtonDisabled || repeatOption !== 'daily'} style={{ backgroundColor: repeatOption === 'daily' ? 'green' : '', borderRadius:'30px' }}>Tous les jours</button>

                                                                                                                    </div>
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-secondary" onClick={() => {setRepeatOption('weekly'); setButtonDisabled(true);}} disabled={isButtonDisabled | repeatOption !== 'weekly'} style={{borderRadius:'30px'}}>Hebdomadaire</button>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                <div className="row mt-3">
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-secondary" onClick={() => {setRepeatOption('biweekly'); setButtonDisabled(true);}} disabled={isButtonDisabled | repeatOption !== 'biweekly'} style={{borderRadius:'30px'}}>Toutes les deux semaines</button>
                                                                                                                    </div>
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-success" onClick={() => {setRepeatOption('monthly'); setButtonDisabled(true);}} disabled={isButtonDisabled | repeatOption !== 'monthly'} style={{borderRadius:'30px'}}>Mensuel</button>
                                                                                                                    </div>
                                                                                                                    <div className="col-md-4">
                                                                                                                        <button className="btn btn-secondary" onClick={() => {setRepeatOption('yearly'); setButtonDisabled(true);}} disabled={isButtonDisabled | repeatOption !== 'yearly'} style={{borderRadius:'30px'}} >Annuel</button>
                                                                                                                    </div>

                                                                                                                </div> 

                                                                                                                <div>
                                                                                                                    <button className='btn btn-primary mt-3' onClick={handleRepeatAction} disabled={isButtonDisabled}>
                                                                                                                        Répéter l'action
                                                                                                                    </button>
                                                                                                                </div>

                                                                                                            </div>*/} 

                                                                                                                <div className="row mt-4">
                                                                                                                    <Form.Label>Date de départ</Form.Label>
                                                                                                                    <Controller name='dateDepart' control={control} defaultValue={dateActuelle} render={({field}) => <input {...field} className='form-control' type="date" readOnly/>} />
                                                                                                                </div>

                                                                                                            <div className="row d-flex justify-content-center">
                                                                                                                {/* <div className="col-md-6"> */}
                                                                                                                <Button variant="warning" className='w-25 me-2' type='submit'>Créer un Budget</Button>
                                                                                                                <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
                                                                                                                {/* </div> */}
                                                                                                            </div>


                                                                                                        </div>
                                                                                                    </>

                                                                                                    {/* <Modal.Footer className='d-flex justify-content-center'>

                                                                                                    </Modal.Footer> */}
                                                                                                </Form>

                                                                                            </Modal.Body>

                                                                                        </Modal>
                                                                                

                                                                                {/* <!-- Profile Edit htmlForm --> */}
                                                                               
                                                                                {/* <!-- End Profile Edit htmlForm --> */}

                                                                                </div>

                                                                            </div>{/* <!-- End Bordered Tabs --> */}
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

export default Sortie;