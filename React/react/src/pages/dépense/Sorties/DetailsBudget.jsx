import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner, Breadcrumb } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { Link,useNavigate, useParams } from "react-router-dom";
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





// function MyVerticallyCenteredModal(props) {

//     const { register, handleSubmit,reset, formState: { errors } } = useForm();
//     // const [leon, setleon] = useState([]);
//     const dateActuelle = new Date()


//     const history= useNavigate()

    // UpdateBudget = async (data) => {

    //     await axios.put(`${import.meta.env.VITE_URL}/update-paiement/${allbudget.id}`,{
    //         'nomBudget': data.nomBudget,
    //         'montant': data.montant,
    //         'devise': data.devise,
    //         'categorie_id': data.categorie_id,
    //     })
    //     .then(function (response) {
    //         console.log(response.data);
    //         se
    //         swal({
    //             title: "Modification Reussi !!!",
    //             text: "You clicked the button!",
    //             icon: "success",
    //             button: "OK",
    //             timer: 2000
    //         });

    //         window.location.reload()
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }

    



//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
//                     Modifier un Budget
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>

//                 <Form onSubmit={handleSubmit(updateBudget)}>

//                     <div className="container">

//                         <div className="row mb-3">
//                             <p className='fw-bold fs-5'>Informations Générales</p>

//                             <div className="col-md-4">

//                                 <Form.Group className="mb-3" controlId="" >
//                                     <Form.Label>Nom du Budget</Form.Label>
//                                     <Form.Control type="text" {...register("nomBudget", { required: true })}  defaultValue={allbudget.nomBudget}/>
//                                     {errors.nomBudget?.type==='required' && <span className='text-danger'>Le Nom du Budget est Obligatoire</span>}
//                                 </Form.Group>
//                             </div>

//                             <div className="col-md-4">

//                                 <Form.Group className="mb-3" controlId="" >
//                                     <Form.Label>Montant </Form.Label>
//                                     <Form.Control type="number" {...register("montant", { required: true, min:0 })} defaultValue={allbudget.montant} />
//                                     {errors.montant?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
//                                     {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
//                                 </Form.Group>
//                             </div>

//                             <div className="col-md-4">
//                                 <Form.Label>Devise </Form.Label>
//                                 <Form.Select aria-label="Default select example" {...register("devise", { required: true })} className='mb-3' controlId="" defaultValue={allbudget.devise}>
//                                     {/* <option>Devise</option> */}
//                                     <option value="USD">USD</option>
//                                     <option value="Fcfa">Fcfa</option>
//                                     <option value="Euro">Euro</option>
//                                     <option value="Yuan">Yuan</option>
//                                 </Form.Select>
//                                 {errors.devise?.type==='required' && <span className='text-danger'>La devise est Obligatoire</span>}
//                             </div>
//                         </div>

//                         <div className="row mb-3">
//                             <p className='fw-bold fs-5'>Filtrer Budget</p>

//                             {/* <div className="col-md-4">
//                                 <label htmlFor="">Portefeuilles</label>
//                                 <input type="text" id='nom' className='form-control'/>
//                             </div> */}

//                             <div className="col-md-6">
//                                 <Form.Label>Budgétiser pour </Form.Label>
                                
//                                 <Form.Select aria-label="Default select example" {...register("categorie_id", { required: true })} className='mb-3' controlId="fil" defaultValue={allbudget.categorie_id}>
//                                     <option>Choisir la categorie</option>
//                                     {
                                        
//                                         props.categorie.lenght !=0 && props.categorie.map((element, index) => {
//                                             return (
//                                                 <>
//                                                     <option key={index} value={element.id} >{element.nomCat}</option>

//                                                 </>
//                                             );
//                                         })
                                        
//                                     }
//                                 </Form.Select>
//                                 {errors.categorie_id?.type==='required' && <span className='text-danger'>Le choix de la categorie est Obligatoire</span>}

//                             </div>
//                         </div>

//                         <div className="row mb-3 bouton">

//                             <div className="row mt-4">
//                                 <Form.Label>Date de départ</Form.Label>
//                                 <Controller name='dateDepart' control={control} defaultValue={dateActuelle} render={({field}) => <input {...field} className='form-control' type="date" readOnly/>} />
//                             </div>



//                         </div>

//                         <div className="row d-flex justify-content-center">
//                             {/* <div className="col-md-6"> */}
//                             <Button variant="warning" className='w-25 me-2' type='submit'>Modifier </Button>
//                             <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
//                             {/* </div> */}
//                         </div>
//                     </div>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// }



const DetailsBudget = () => {

    const [allbudget, setallbudget] = useState([])

    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();


    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const {id}=useParams()

    const [allcat, setallcat] = useState([])

    const dateActuelle = new Date().toISOString().split('T')[0];

    async function getBudget() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-budget/${id}`);
            setallbudget(response.data);
            console.log(response.data);
        } catch (error) {
            // console.log(error);
            console.log('echec');
        }
    }

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

    console.log(allbudget);

    // console.log(allbudget);

    useEffect(() => {
        getBudget()
        GetCategories()
    }, [])

    const [params, setparams] = useState([])
    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }
    const manuelaAll =(id) =>{
        let searchId = check.find((item)=> item== id)
        if (searchId){
            let newArray = check.filter((item)=> item != id)
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);
            setcheck(newArray)


        }else {
            setcheck([...check,id])
        }

    }

    const UpdateBudget = async () => {

        await axios.put(`${import.meta.env.VITE_URL}/update-budget/${allbudget.id}`,{
            'nomBudget': allbudget.nomBudget,
            'montant': allbudget.montant,
            'devise': allbudget.devise,
            'categorie_id': allbudget.categorie_id,
        })
        .then(function (response) {
            console.log(response.data);
            
            swal({
                title: "Modification Reussi !!!",
                text: "You clicked the button!",
                icon: "success",
                button: "OK",
                timer: 2000
            });

            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
    }




    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleDepense/>
                </Col>

                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">
                                                    <div className="container">
                                                        <div className="row d-flex justify-content-between bg-light py-3 px-3" style={{ borderRadius:'10px' }}>
                                                            <div className="col-md-6">

                                                                {/* <ol className="breadcrumb">
                                                                    <li className="breadcrumb-item"><NavLink to="/depense/sortie">Budget</NavLink></li>
                                                                    <li className="breadcrumb-item active">{allbudget.nomBudget}</li>
                                                                </ol> */}


                                                                <Breadcrumb>
                                                                    <NavLink to="/depense/sortie" className='fs-3'>Budget / </NavLink>
                                                                    <Breadcrumb.Item active className='fs-3 fw-bold text-danger'>
                                                                        {allbudget.nomBudget}
                                                                    </Breadcrumb.Item>
                                                                    {/* <Breadcrumb.Item active>Data</Breadcrumb.Item> */}
                                                                </Breadcrumb>
                                                            </div>

                                                            <div className="col-md-3 d-flex align-self-end">
                                                                <Button variant="primary" size="lg" className='mb-3 w-100' onClick={handleShow} style={{ cursor:'pointer' }}>Modifier</Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                </h3>
                                            </div>

                                            <section className="container">
                                                <div className="row d-flex justify-content-between bg-light py-3 px-3" style={{ borderRadius:'10px' }}>
                                                    <div className="col-md-4">

                                                        <div class="card text-center">
                                                            <div class="card-body">
                                                                <h5 class="card-title fs-3 fw-bold"> Budget Original</h5>
                                                                <p className='text-success fw-bold fs-4'> +{allbudget.montant} {allbudget.devise}</p>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="col-md-4">

                                                        <div class="card text-cente">
                                                            <div class="card-body">
                                                                <h5 class="card-title fs-3 fw-bold">Dépense jusqu'à présent </h5>
                                                                <p className='text-success fw-bold fs-4'>0,00 {allbudget.devise}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-md-4">

                                                        <div class="card text-cente">
                                                            <div class="card-body">
                                                                <h5 class="card-title fs-3 fw-bold">Argent Restant</h5>
                                                                <p className='text-success fw-bold fs-4'>+ {allbudget.montant} {allbudget.devise}</p>
                                                            </div>  
                                                        </div>

                                                    </div>
                                                </div>
                                            </section>

                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">

                                                                <div className="col-xl">
                                                                    <div className="card w-100">
                                                                        <div className="card-body pt-3">
                                                     

                                                                            <div className="tab-content pt-2">

                                                                                <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                                                                    <div className="container">
                                                                                        <div className="row">
                                                                                            <div className="col-md-6">
                                                                                            {/* {
                                                                                                allbudget.map((element,index)=>{
                                                                                                    return(
                                                                                                            <Link class="card" to='/details-Budget'>
                                                                                                                <div class="card-body">
                                                                                                                    <h5 class="card-title">{element.nomBudget}</h5>
                                                                                                                    <h6 class="card-subtitle mb-2 fs-3 fw-bold text-muted-success">{element.montant} {element.devise} restant</h6>
                                                                                                                    <p class="card-text">De {element.montant} {element.devise}</p>
                                                                                                                    <Button variant="info" size="lg" className='mb-3 w-100' onClick={handleShow} style={{ cursor:'pointer' }}>0.0%</Button>
                                                                                                                </div>
                                                                                                            </Link>
                                                                                                    )
                                                                                                })
                                                                                            } */}
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


            <Modal
            // {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
                    Modifier un Budget
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit(UpdateBudget)}>

                    <div className="container">

                        <div className="row mb-3">
                            <p className='fw-bold fs-5'>Informations Générales</p>

                            <div className="col-md-4">

                                <Form.Group className="mb-3" controlId="" >
                                    <Form.Label>Nom du Budget</Form.Label>
                                    <Form.Control type="text" {...register("nomBudget", { required: true })}  defaultValue={allbudget.nomBudget}/>
                                    {errors.nomBudget?.type==='required' && <span className='text-danger'>Le Nom du Budget est Obligatoire</span>}
                                </Form.Group>
                            </div>

                            <div className="col-md-4">

                                <Form.Group className="mb-3" controlId="" >
                                    <Form.Label>Montant </Form.Label>
                                    <Form.Control type="number" {...register("montant", { required: true, min:0 })} defaultValue={allbudget.montant} />
                                    {errors.montant?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
                                    {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
                                </Form.Group>
                            </div>

                            <div className="col-md-4">
                                <Form.Label>Devise </Form.Label>
                                <Form.Select aria-label="Default select example" {...register("devise", { required: true })} className='mb-3' controlId="" defaultValue={allbudget.devise}>
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
                                
                                <Form.Select aria-label="Default select example" {...register("categorie_id", { required: true })} className='mb-3' controlId="fil" defaultValue={allbudget.categorie_id}>
                                    <option>Choisir la categorie</option>
                                    {
                                        
                                        allcat.lenght !=0 && allcat.map((element, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={element.id} >{element.nomCat}</option>

                                                </>
                                            );
                                        })
                                        
                                    }
                                </Form.Select>
                                {errors.categorie_id?.type==='required' && <span className='text-danger'>Le choix de la categorie est Obligatoire</span>}

                            </div>
                        </div>

                        <div className="row mb-3 bouton">

                            <div className="row mt-4">
                                <Form.Label>Date de départ</Form.Label>
                                <Controller name='dateDepart' control={control} defaultValue={dateActuelle} render={({field}) => <input {...field} className='form-control' type="date" readOnly/>} />
                            </div>



                        </div>

                        <div className="row d-flex justify-content-center">
                            {/* <div className="col-md-6"> */}
                            <Button variant="warning" className='w-25 me-2' type='submit'>Modifier </Button>
                            <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
                            {/* </div> */}
                        </div>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
            
        </Container>
    );
};

export default DetailsBudget;