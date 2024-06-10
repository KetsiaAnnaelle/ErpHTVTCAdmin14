import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaTrashAlt,FaMoneyCheckAlt,FaCoins } from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import HeaderGeneral from '../../component/HeaderGeneral.jsx';
import BarreLateraleDepense from '../../component/BarreLateraleDepense.jsx';
import.meta.env.VITE_URL;
import Accordion from 'react-bootstrap/Accordion';

const Transaction = () => {

    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [alltransac, setalltransac] = useState([])

    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();

    const dateActuelle = new Date().toISOString().split('T')[0];


    async function GetTransaction() {
        try {
            // setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/transaction`);
            setalltransac(response.data);
            // JSON.stringify(response.data)
            // console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const AddTransaction = async(data) =>{
        
        // const montantValue = formData.negativeInput || 0;
        const fData = new FormData()
        fData.append('montant',data.montant)
        fData.append('devise',data.devise)
        fData.append('categorie_id',data.categorie_id)
        fData.append('date',data.date)

        axios.post(`${import.meta.env.VITE_URL}/transaction`,fData)
            .then(function (response) {
                console.log(response.data);
            //     setShow(false)
                swal({
                    title: "Transaction Ajoutée Avec Succès !!!",
                    icon: "success",
                    button: "OK",
                });
                
               reset()

                GetTransaction()

                alltransac(response.data)
                
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

    console.log(alltransac);


    const handleInputChange = (e) => {
        let newValue = parseFloat(e.target.value);
    
        // Si la nouvelle valeur est positive, la rendre négative
        if (!isNaN(newValue) && newValue > 0) {
          newValue = -newValue;
    
          // Utiliser setValue pour mettre à jour la valeur du champ contrôlé
          setValue('negativeInput', newValue);
        }
    };


    const [allcat, setallcat] = useState([])
    async function GetCategories() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/categorieDepense`);
            setallcat(response.data);
            // setnewallcat(response.data);
            // JSON.stringify(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(allcat);

    useEffect(() => {
        GetCategories()
        GetTransaction()
    }, [])


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

                                                                        <div className="tab-content pt-2">
                                                                            <div class="col-lg-3 col-md-6 mb-3">
                                                                                <Button variant="info" size="lg" className='mb-3' onClick={handleShow} style={{ cursor:'pointer' }}>Ajouter une Transaction</Button>
                                                                            </div>

                                                                            <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                                                
                                                                                    <Modal show={show} size="xl" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

                                                                                        <Modal.Header closeButton>
                                                                                            <Modal.Title id="contained-modal-title-vcenter" className='fw-4 text-center'>Ajouter une Transaction</Modal.Title>
                                                                                        </Modal.Header>

                                                                                        <Modal.Body>


                                                                                            <Form onSubmit={handleSubmit(AddTransaction)}>

                                                                                                <div className="container">
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-3">
                                                                                                        <Form.Label>Categorie</Form.Label>
                                                                                                            <Form.Select aria-label="Default select example" size='lg' className='mb-5'  {...register("categorie_id", { required: true })}>
                                                                                                                <option>Selectionner la categorie</option>
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

                                                                                                        <div className="col-md-3">
                                                                                                            <Form.Label>Date</Form.Label>
                                                                                                            <Controller name='date' control={control} defaultValue={dateActuelle} render={({field}) => <input {...field} className='form-control' type="date" readOnly/>} />
                                                                                                                
                                                                                                        </div>

                                                                                                        <div className="col-md-3">

                                                    
                                                                                                            <label htmlFor="negativeInput">Montant </label>
                                                                                                            <Controller
                                                                                                                name="negativeInput"
                                                                                                                control={control}
                                                                                                                defaultValue={0}
                                                                                                                rules={{ required:'Le montant est requis' }}
                                                                                                                render={({ field }) => (
                                                                                                                <input
                                                                                                                    type="number"
                                                                                                                    className='form-control'
                                                                                                                    {...field}
                                                                                                                    onChange={(e) => {
                                                                                                                    field.onChange(e);
                                                                                                                    handleInputChange(e);
                                                                                                                    }}
                                                                                                                />
                                                                                                                )}
                                                                                                            />
                                                                                                        </div>


                                                                                                        <div className="col-md-3">
                                                                                                            <Form.Label>Devise </Form.Label>
                                                                                                            <Form.Select aria-label="Default select example" {...register("devise", { required: true })} className='mb-3' controlId="" >
                                                                                                                {/* <option>Devise</option> */}
                                                                                                                <option value="USD">USD</option>
                                                                                                                <option value="Fcfa">Fcfa</option>
                                                                                                                <option value="Euro">Euro</option>
                                                                                                                <option value="Yuan">Yuan</option>
                                                                                                            </Form.Select>
                                                                                                            {errors.devise?.type==='required' && <span className='text-danger'>La devise est Obligatoire</span>}

                                                                                                        </div>

                                                                                                        <div className="row d-flex justify-content-center">
                                                                                                            {/* <div className="col-md-6"> */}
                                                                                                            <Button variant="warning" className='w-25 me-2' type='submit'>Ajouter Transaction </Button>
                                                                                                            <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
                                                                                                            {/* </div> */}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>

                                                                                                

                                                                                                {/* <Modal.Footer className='d-flex justify-content-center'>

                                                                                                </Modal.Footer> */}
                                                                                            </Form>

                                                                                        </Modal.Body>

                                                                                    </Modal>


                                                                            

                                                                            {/* <!-- Profile Edit htmlForm --> */}
                                                                           
                                                                            {/* <!-- End Profile Edit htmlForm --> */}

                                                                            </div>


                                                                        </div>{/* <!-- End Bordered Tabs --> */}


                                                                        <section className="container">
                                                                            <div className="row d-flex justify-content-between bg-light py-3 px-3" style={{ borderRadius:'10px' }}>
                                                                            {
                                                                                alltransac.length===0?
                                                                                
                                                                                <>

                                                                                    <div className="col-md-3">

                                                                                        <div class="card text-center">
                                                                                            <div class="card-body">
                                                                                                <h5 class="card-title fs-3 fw-bold"> Balance Actuelle du Portefeuille</h5>
                                                                                                <p className='text-danger fw-bold fs-4'> 0.0 EURO</p>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="col-md-3">

                                                                                        <div class="card text-center">
                                                                                            <div class="card-body">
                                                                                                <h5 class="card-title fs-3 fw-bold">Total sur la periode </h5>
                                                                                                <p className='text-danger fw-bold fs-4'> 0.0 EURO</p>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="col-md-3">

                                                                                        <div class="card text-center">
                                                                                            <div class="card-body">
                                                                                                <h5 class="card-title fs-3 fw-bold">Total des depenses de la periode</h5>
                                                                                                <p className='text-danger fw-bold fs-4'> 0.0 EURO</p>
                                                                                            </div>  
                                                                                        </div>

                                                                                    </div>

                                                                                    <div className="col-md-3">

                                                                                        <div class="card text-center">
                                                                                            <div class="card-body">
                                                                                                <h5 class="card-title fs-3 fw-bold">Total des Revenus de la Periode</h5>
                                                                                                <p className='text-danger fw-bold fs-4'> 0.0 EURO</p>
                                                                                            </div>  
                                                                                        </div>

                                                                                    </div>

                                                                                </>
                                                                                :
                                                                                
                                                                                alltransac.map((element,index)=>{
                                                                                    return(
                                                                                        <div key={index} className='container'>

                                                                                            <div className="row">
                                                                                                <div className="col-md-3">

                                                                                                    <div className="card text-center">
                                                                                                        <div className="card-body">
                                                                                                            <h5 className="card-title fs-3 fw-bold"> Balance Actuelle du Portefeuille</h5>
                                                                                                            <p className='text-danger fw-bold fs-4'> {element.montant} {element.devise}</p>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>

                                                                                                <div className="col-md-3">

                                                                                                    <div className="card text-center">
                                                                                                        <div className="card-body">
                                                                                                            <h5 className="card-title fs-3 fw-bold">Total sur la periode </h5>
                                                                                                            <p className='text-danger fw-bold fs-4'>{element.montant} {element.devise}</p>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                </div>

                                                                                                <div className="col-md-3">

                                                                                                    <div class="card text-center">
                                                                                                        <div className="card-body">
                                                                                                            <h5 className="card-title fs-3 fw-bold">Total des depenses de la periode</h5>
                                                                                                            <p className='text-danger fw-bold fs-4'> {element.montant} {element.devise}</p>
                                                                                                        </div>  
                                                                                                    </div>

                                                                                                </div>

                                                                                                <div className="col-md-3">

                                                                                                    <div className="card text-center">
                                                                                                        <div className="card-body">
                                                                                                            <h5 className="card-title fs-3 fw-bold">Total des Revenus de la Periode</h5>
                                                                                                            <p className='text-success fw-bold fs-4'>+ {element.montant} {element.devise}</p>
                                                                                                        </div>  
                                                                                                    </div>

                                                                                                </div>
                                                                                            </div>



                                                                                        </div>
                                                                                    )
                                                                                })

                                                                            }
                                                                            </div>
                                                                        </section>


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

export default Transaction;