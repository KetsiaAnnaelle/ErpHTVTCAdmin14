import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import { Col, Container, Row, Button, Form, Table, Modal } from 'react-bootstrap';
import {BsSearch, } from "react-icons/bs";
import { FaEdit } from 'react-icons/fa';
import {AiFillCheckCircle} from "react-icons/ai";
import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    // const [leon, setleon] = useState([]);
    const dateActuelle = new Date()
    
    
    const history= useNavigate()
    const updatePaiement = async (data) => {
    
    await axios.put(`${import.meta.env.VITE_URL}/update-paiement/${props.data.id}`,{
    'RefPaiement': data.RefPaiement,
    'formation_id': data.formation_id,
    'Etudiant_id': data.Etudiant_id,
    'MontantPaiement': data.MontantPaiement,
    'MoyenPaiement': data.MoyenPaiement,
    'MotifPaiement': data.MotifPaiement,
    'ProchainPaiement': data.ProchainPaiement
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
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
    Modifier un Paiement
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
    <Form onSubmit={handleSubmit(updatePaiement)}>
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Reference</Form.Label>
    <Form.Control type="text" {...register("RefPaiement", { required: true, min:0 })} defaultValue={props.data.RefPaiement} />
    {errors.RefPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
    </Form.Group>
    
    <Form.Select aria-label="Default select example" {...register("formation_id", { required: true })} className='mb-3'controlId="fil" defaultValue={props.data.formation_id}>
    <option>Choisir la filière</option>
    {
    props.paiement.length!=0 && (
    props.paiement.Fileres.map((element, index) => {
    return (
    <option key={index} value={element.id} selected={element.formation_id == props.data.formation_id}>{element.nomForm}</option>
    );
    })
    )
    }
    </Form.Select>
    {errors.formation_id?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}
    
    
    <Form.Select aria-label="Default select example" {...register("Etudiant_id", { required: true })} className='mb-3' controlId="fil" defaultValue={props.data.Etudiant_id}>
    <option>Choisir l'étudiant</option>
    {
    props.paiement.length!=0 && (
    props.paiement.etudiants.map((element, index) => {
    return (
    <option key={index} value={element.id} selected={element.Etudiant_id == props.data.Etudiant_id}>{element.nomEtud}</option>
    );
    })
    )
    }
    </Form.Select>
    {errors.Etudiant_id?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}
    
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Montant Du Paiement</Form.Label>
    <Form.Control type="number" {...register("MontantPaiement", { required: true, min:0 })} defaultValue={props.data.MontantPaiement}/>
    {errors.MontantPaiement?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
    {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
    </Form.Group>
    
    
    <Form.Select aria-label="Default select example" {...register("MoyenPaiement", { required: true })} className='mb-3'controlId="" defaultValue={props.data.MoyenPaiement}>
    <option>Moyen De Paiement</option>
    <option value="Orange Money">Orange Money</option>
    <option value="MTN Monney">MTN Money</option>
    <option value="Virement Bancaire">Virement Bancaire</option>
    <option value="Espèce">Espèce</option>
    </Form.Select>
    {errors.MoyenPaiement?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Motif</Form.Label>
    <Form.Control type="text" {...register("MotifPaiement", { required: true, min:0 })} defaultValue={props.data.MotifPaiement} />
    {errors.MotifPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="" >
    <Form.Label>Prochain Paiement</Form.Label>
    <Form.Control type="date" {...register("ProchainPaiement", { required: true,
    validate:(value) => new Date(value) > dateActuelle})} defaultValue={props.data.ProchainPaiement}/>
    {errors.ProchainPaiement?.type==='required' && <span className='text-danger'>La date du prochain paiement est Obligatoire</span>}
    {errors.ProchainPaiement?.type==='validate' && <span className='text-danger'>Cette date doit être supérieure à la date d'aujourd'hui </span>}
    </Form.Group>
    
    <Row className='text-center mt-5'>
    <Col className='col-md-6'>
    <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75' >Modifier</Button>{' '}
    </Col>
    
    <Col className='col-md-6'>
    <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' >Annuler</Button>{' '}
    </Col>
    </Row>
    </Form>
    </Modal.Body>
    </Modal>
    );
    }

const PaiementsArchives = () => {

 const [allPaiement, setallPaiement] = useState([]) //tous les paiement de la corbeille

 const [load, setload] = useState(false);

 const [params, setparams] = useState([])

 const [idL, setidL] = useState(0)
 const [modalShow, setModalShow] = React.useState(false);

 const [leon, setleon] = useState([]);

 async function getPaiementsArchives() {
 try {
 setload(true)
 const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement-archives`);
 setallPaiement(response.data);
 setload(false)

 console.log(response.data);
 //setallstudbydate(response.data.data) //ici on recupere tous les eleves stockes et qui vont subir les filtres
 } catch (error) {
 console.error('Erreur lors de la recuperation des paiements');
 }}

 async function GetEtudiantsAndFiliere() {
    try {
    const response = await axios.get(`${import.meta.env.VITE_URL}/GetEtudiantsAndFiliere`);
    setleon(response.data);
    } catch (error) {
    console.error(error);
    }
 }

 
 // const paiementsArchives = allPaiement.filter(paie => paie.archived_at !== null)

// console.log(allPaiement);

 async function RestaurerPaiementArchivé(id) {
 try {
 const response = await axios.put(`${import.meta.env.VITE_URL}/restore-paiement/${id}/archivé`);
 setallPaiement(response.data);

 setTimeout(() => {
 window.location.reload() //pour actualiser la page automatiquement
 }, 2000);

 swal("Paiement Restauré avec succès !!!",{
 icon:"success",
 });
 // history('/etud/inscription')
 } catch (error) {
 console.error('Erreur lors de la restauration de l etudiant');
 }
 }

 useEffect(() => {
 getPaiementsArchives()
 GetEtudiantsAndFiliere()
 // getStudents()
 }, [])

 useEffect(() => {
    if (params.length!==0) {
    setModalShow(true)
    }
},[])
 
  //Modifier les infos d'un paiement

  function handleMan(element) {
    setidL(element.id)
    setparams(element)
    setModalShow(true)
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
 <h1>Archives</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/fact/paie">Paiements</NavLink></li>
 <li className="breadcrumb-item active">Archives</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Liste des paiements archivés</h3>
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
 </Form>

 <Table responsive>
 <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
 <tr>
 <th></th>
 <th></th>
 <th></th>
 <th>Date d'archivage</th>
 <th>Date Du Paiement</th>
 <th>Reference</th>
 <th>Filière</th>
 <th>Etudiant</th>
 <th>Montant</th>
 <th>Moyen de Paiement</th>
 <th>Motif</th>
 <th>Prochain Paiement</th>
 {/* <th></th> */}
 </tr>
 </thead>

 <tbody>
 {
 // paiementsArchives.length==0 ?
 // <tr>
 // <td colSpan={15} align='center'>
 // <p className='text-danger fw-bold'>Pas de Paiement Archivés</p>
 // </td>
 // </tr>

 // :
 load ?
 <tr>
 <td colSpan={15} align='center'>
 <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
 </td>
 </tr>

 :
 allPaiement.map((element, index)=>{
 return(
 <>
 <tr key={element.id} style={{ cursor: 'pointer' }} onClick={()=>console.log(element.deleted_at)}>
 <td>
 {

 ['checkbox'].map((type) => (

 <div key={`inline-${type}`} className="mb-3">
 <Form.Check
 inline
 label=""
 name="group1"
 type={type}
 id={`inline-${type}-1`}

 />
 </div>
 ))
 }
 </td>
 <td>
 <button className=" btn btn-transparent text-light" onClick={()=>RestaurerPaiementArchivé(element.id)}> <AiFillCheckCircle className="text-success" style={{ cursor:'pointer' }} /> </button>
 </td>
 <td>
 <button className=" btn btn-transparent text-light" onClick={()=>handleMan(element)}> <FaEdit className="text-info"  style={{ cursor:'pointer' }} /> </button>
 </td>
 <td>{element.archived_at.split(' ')[0]}</td>
 <td>{element.created_at.split(' ')[0]}</td>
 <td>{element.RefPaiement}</td>
 <td key={index}>{element.nomForm}</td>
 <td key={index}>{element.nomEtud}</td>
 <td key={index}>{element.MontantPaiement} FCFA</td>
 <td>{element.MoyenPaiement}</td>
 <td>{element.MotifPaiement}</td>
 <td>{element.ProchainPaiement}</td>
 </tr>
 <MyVerticallyCenteredModal
    show={(idL===element.id) && modalShow}
    onHide={() => setModalShow(false)}
    data={params}
    paiement={leon}
 />
 </>

 )
 })

 }
 {/* <tr className='text-danger fs-3 fw-3 mt-3'>Total:{allstud.length}</tr> */}
 </tbody>
 </Table>
 </div>
 </div>
 </div>
 </div>
 </div>
 <div className="card-footer">
 <p className='text-danger fs-3 fw-3 mt-3'>Total:{allPaiement.length}</p>
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

export default PaiementsArchives;