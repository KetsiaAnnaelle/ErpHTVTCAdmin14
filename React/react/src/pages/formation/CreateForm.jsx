import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactLoading from "react-loading";
import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";

// fonction pour modifier un stage et affichant au prealable les anciennes informations de l'utilisateur

function MyVerticallyCenteredModal(props) {

 const { register, handleSubmit,reset, formState: { errors } } = useForm();
 const history= useNavigate()
 const updateConduite = async (data) => {

 await axios.post(`http://localhost:8000/api/form/${props.data.id}`,{
 'nomForm': data.fil,
 'scolariteForm': data.scolarite,
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
 <Modal.Header closeButton className='bg-secondary text-white'>
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >
 Modifier une formation
 </Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form onSubmit={handleSubmit(updateConduite)} encType='multipart/form-data format' >
 <Form.Group className="mb-3" controlId="fil" >
 <Form.Label>Nom de la filière</Form.Label>
 <Form.Control type='text' {...register("fil", { required: true, minLength:3 })} defaultValue={props.data.nomForm} />
 {errors.fil?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.fil?.type==='required' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
 </Form.Group>
 <Form.Group className="mb-3" controlId="scolarite" >
 <Form.Label>Montant de la scolarité</Form.Label>
 <Form.Control type="number" {...register("scolarite", { required: true, min:0 })} defaultValue={props.data.scolariteForm} />
 {errors.scolarite?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.scolarite?.type==='min' && <span className='text-danger'>La scolarite doit être supérieure à 0</span>}
 </Form.Group>
 <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Modifier</Button>{' '}</center>
 </Form>
 </Modal.Body>
 </Modal>
 );
}

const CreateForm = () => {

 const [show, setShow] = useState(false);
 const [fresh, setfresh] = useState(false);
 const [load, setload] = useState(false);
 const [done, setdone] = useState(false)
 const { register, handleSubmit,reset, formState: { errors } } = useForm();

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 const history=useNavigate()

 const [form, setform] = useState([])
 const [records, setRecords] = useState(form)

 const [params, setparams] = useState([])
 const [modalShow, setModalShow] = React.useState(false);
 const [idL, setidL] = useState(0)

 const [searchQuery, setSearchQuery] = useState('');
 const keys=['nomForm'];

 const [filteredRecords, setFilteredRecords] = useState([]);
 const [selectedFormation, setSelectedFormation] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 const [seRecords, setSeRecords] = useState([]);
 const [selectedRecords, setSelectedRecords] = useState([]);

 const [check, setcheck] = useState([]);
 const [checkAll, setcheckAll] = useState(false);

 const [pageNumber, setPageNumber] = useState(0);
 const perPage = 20; // Nombre d'éléments par page

 let total=0

 const dateActuelle = new Date()


 // fonction pour lister les formations

 async function getFormations() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
 setform(response.data);
 setRecords(response.data);
 setparams(response.data);
 setSeRecords(response.data)
 } catch (error) {
 console.error(error);
 }
 }

 useEffect(() => {
 if (!load===true){
 getFormations()
 }
 },[fresh])

 useEffect(() => {
 if (params.length!==0) {
 setModalShow(true)
 }

 }, [fresh])

 // fonction pour créer une formation

 const onSubmit = async (data) => {

 const formData = new FormData();
 formData.append('nomForm', data.fil);
 formData.append('scolariteForm', data.scolarite);

 axios.post(`${import.meta.env.VITE_URL}/form`,formData)
 .then(function (response) {
 console.log(response.data);
 JSON.stringify(response.data)
 setShow(false)

 swal({
 title: "Ajouté Avec Succès !!!",
 text: "You clicked the button!",
 icon: "success",
 button: "OK",
 timer: 2000
 });
 window.location.reload()
 })
 .catch(function(error) {
 console.error(error);
 })
 }

 const handleCheckAll = () => {
 if (!checkAll) {
 // Si la case à cocher dans l'en-tête est cochée, sélectionnez tous les enregistrements

 const allIds = records.map((element) => element.id);
 setcheck(allIds);
 setSelectedRecords(allIds);

 //setSelectedRecords(records.map((element) => element.id));
 } else {
 // Sinon, décochez tous les enregistrements
 setSelectedRecords([]);
 setcheck([])
 }
 setcheckAll(!checkAll); // Inversez l'état de la case à cocher dans l'en-tête
 return false;
 };

 const checkedAll =(id) =>{
 let searchId = check.find((item)=> item== id)
 let searchAllId = selectedRecords.find((item)=> item== id)
 if (searchId || searchAllId){
 let newArray = check.filter((item)=> item != id)
 let newAArray = selectedRecords.filter((item)=> item != id)
 setcheck(newArray)
 setSelectedRecords(newAArray)
 }else {
 setcheck([...check,id])
 setSelectedRecords([...selectedRecords,id])
 }
 }

 const handleRestauresSelected = () => {
 if (selectedRecords.length === 0) {
 // Afficher un message d'erreur car rien n'est sélectionné
 return;
 }

 axios.put(`${import.meta.env.VITE_URL}/form/elementRestaures`, { ids: selectedRecords })
 .then(function (response) {
 //swal("Restaurées !", "Les formations sélectionnées ont été archivé.", "success");
 //window.location.reload();
 console.log(response)
 })
 .catch(function (error) {
 console.error(error);
 });
 };

 const handleSupprimeSelected = () => {
 if (selectedRecords.length === 0) {
 // Afficher un message d'erreur car rien n'est sélectionné
 return;
 }

 axios.put(`${import.meta.env.VITE_URL}/form/elementSupprime`, { ids: selectedRecords })
 .then(function (response) {
 swal("Supprimées !", "Les formations sélectionnées ont été supprimées.", "success");
 // window.location.reload();
 })
 .catch(function (error) {
 console.error(error);
 });
 };

 // fonction pour supprimer une abscence

 const delFormation = async (id) => {
 swal({
 title: "Êtes-vous certains de vouloir effectuer cette action ?",
 text: "Vous risquez de ne plus pouvoir restaurer cette conduite !",
 icon: "warning",
 buttons: {
 cancel: "Annuler",
 supprimer: {
 text: "Supprimer",
 className: "btn btn-danger", // Utilisez la classe "btn-danger-custom"
 value: "supprimer",
 },
 archiver: {
 text: "Archiver",
 className: "btn btn-success", // Utilisez la classe "btn-success-custom"
 value: "archiver",
 },
 },
 dangerMode: true
 })
 .then((value) => {
 if (value === "supprimer") {
 // Pour mettre à jour le champ 'supprimer' de formation en le mettant à 1
 axios
 .put(`http://localhost:8000/api/form/${id}/supprimer`, { supprimer: 1 })
 .then(function(response) {
 swal("Supprimé!", "Votre formation a bien été supprimée.", "success");
 // Rechargez la page après la suppression
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else if (value === "archiver") {
 // Pour mettre à jour le champ 'archiver' de formation en le mettant à 1
 axios
 .put(`${import.meta.env.VITE_URL}/form/${id}/archiver`, { archiver: 1 })
 .then(function(response) {
 swal("Archivé!", "Votre formation a été marquée comme archivée.", "success");
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else {
 // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
 swal("Annulé", "Votre formation n'a pas été modifiée.", "info");
 }
 })
 .catch(function(error) {
 console.error(error);
 });
 };

 //Modifier les infos d'une conduite

 function handleMan(element) {
 setidL(element.id)
 setparams(element)
 setModalShow(true)
 }

 //filtrer les formations

 const filterFormations = () => {
 const filteredRecords = seRecords.filter((record) => {
 const matchFormation =
 selectedFormation === '' || record.nomForm === selectedFormation;

 // Obtenez la date de l'enregistrement sous forme de date JavaScript
 const recordDate = new Date(record.dateCond);

 // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
 const dateFilter =
 (!startDate || recordDate >= new Date(startDate)) &&
 (!endDate || recordDate <= new Date(endDate));

 // Combinez toutes les conditions de filtrage
 return matchFormation && dateFilter;
 });

 setRecords(filteredRecords);
 };

 useEffect(() => {
 filterFormations()
 }, [selectedFormation, startDate, endDate]);

 const handlePageChange = ({ selected }) => {
 setPageNumber(selected);
 };

 const offset = pageNumber * perPage;
 const pageCount = Math.ceil(records.length / perPage);

 const displayedRecords = records
 .filter((element) =>
 keys.some((key) => {
 const value = element[key];
 if (typeof value === 'string') {
 return value.toLowerCase().includes(searchQuery);
 }
 return false;
 })
 )
 .slice(offset, offset + perPage);

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
 <h1>Formations</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
 <li className="breadcrumb-item active">Formations</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Listes des formations</h3>
 </div>
 <div className="card-body">
 <Row className='d-flex justify-content-center'>
 <Col className='col-md-12'>
 <div className="card-body">
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
 <strong>Supprimer plusieurs formations</strong>.
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
 <strong>Archiver plusieurs formations</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success" size={24} style={{ cursor:'pointer' }} /></Button>
 </OverlayTrigger>
 ))}
 </Form>

 <Form>
 <Row className='d-flex justify-content-center mb-3'>
 <Col className='col-md-2'>
 <Form.Group className="mb-3" controlId="dateDeb">
 <span>Periode de</span>
 <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
 </Form.Group>
 </Col>
 <Col className='col-md-2'>
 <Form.Group className="mb-3" controlId="dateFin">
 <span>à</span>
 <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
 </Form.Group>
 </Col>
 <Col className='col-md-2'>
 <span>Filière</span>
 <Form.Select aria-label="Default select example" className='mb-3' value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
 <option>Choisir la filière</option>
 {
 form.length !== 0 && (
 [...new Set(form.map((element) => element.nomForm))].map((nom, index) => {
 return (
 <option key={index} value={nom}>{nom}</option>
 );
 })
 )
 }
 </Form.Select>
 </Col>
 </Row>
 </Form>

 <Table responsive className='table table-borderless datatable'>
 <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
 <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}} className='w-100'>
 {['right'].map((placement) => (
 <OverlayTrigger
 key={placement}
 placement={placement}
 overlay={
 <Tooltip id={`tooltip-${placement}`}>
 <strong>Créer une formation</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" size="lg" className='mb-3' onClick={handleShow} ><IoMdAddCircle className="text-white" size={36} style={{ cursor:'pointer' }}/></Button>
 </OverlayTrigger>
 ))}
 <th></th>
 <th></th>
 <th></th>
 <th></th>
 <th></th>
 </tr>
 <tr>
 <th>
 <Form.Check
 inline
 type="checkbox"
 checked={checkAll}
 onChange={() => handleCheckAll()}
 />
 </th>
 <th></th>
 <th></th>
 <th>Date</th>
 <th>Nom Filière</th>
 <th>Scolarité</th>
 </tr>
 </thead>
 <tbody>
 {
 load ?
 <tr>
 <td colSpan={9} align='center'>
 <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
 </td>
 </tr>
 :
 records .filter((element) =>
 keys.some((key) => {
 const value = element[key];
 if (typeof value === 'string') {
 return value.toLowerCase().includes(searchQuery);
 }
 return false;
 })
 ).map((element,index) => {
 total=total+1
 const isChecked = selectedRecords.includes(element.id);
 const createdDate = new Date(element.created_at);
 const formatdate = createdDate.toLocaleDateString();

    return(
        <>
            <tr key={index}>
                <td>
                    <Form.Check
                    inline
                    type="checkbox"
                    className="mb-3"
                    checked={isChecked}
                    onClick={() => checkedAll(element.id)}
                    />
                </td>
                <td>
                    {['bottom'].map((placement) => (
                    <OverlayTrigger
                    key={placement}
                    placement={placement}
                    overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                        <strong>Modifier formation</strong>.
                    </Tooltip>
                    }
                >
                    <Button variant="transparent" className='mb-3 ms-3' ><FaEdit className='text-primary me-1' onClick={()=>handleMan(element)} style={{ cursor:'pointer' }}/></Button>
                        </OverlayTrigger>
                    ))}
                </td>
                <td>
                    {['bottom'].map((placement) => (
                    <OverlayTrigger
                    key={placement}
                    placement={placement}
                    overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                    <strong>Supprimer formation</strong>.
                    </Tooltip>
                    }
                    >
                    <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delFormation(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                    </OverlayTrigger>
                    ))}
                </td>
                <td>{formatdate}</td>
                <td>{element.nomForm}</td>
                <td>{element.scolariteForm}</td>
            </tr>
            <MyVerticallyCenteredModal
            show={(idL===element.id) && modalShow}
            onHide={() => setModalShow(false)}
            data={params}
            formation={form}
            />
        </>
        )
        })
        }
    </tbody>

 </Table>

 </div>
 </Col>
 </Row>
 </div>
 <div className="card-footer">
 <p className='text-danger fs-4 fw-3 mt-3'>Total de formations : {total} </p>
 <ReactPaginate
 previousLabel={'Précédent'}
 nextLabel={'Suivant'}
 breakLabel={'...'}
 pageCount={pageCount}
 marginPagesDisplayed={2}
 pageRangeDisplayed={5}
 onPageChange={handlePageChange}
 containerClassName={'pagination'}
 subContainerClassName={'pages pagination'}
 activeClassName={'active'}
 />
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
 <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
 <Modal.Header closeButton className='bg-secondary text-white'>
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une Formation</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 {
 done && <div className="alert alert-success">Conduite cree avec succes!!!</div>
 }
 <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
 <Form.Group className="mb-3" controlId="fil" >
 <Form.Label>Nom de la filière</Form.Label>
 <Form.Control type='text' {...register("fil", { required: true, minLength:3 })} />
 {errors.fil?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.fil?.type==='required' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
 </Form.Group>
 <Form.Group className="mb-3" controlId="scolarite" >
 <Form.Label>Montant de la scolarité</Form.Label>
 <Form.Control type="number" {...register("scolarite", { required: true, min:0 })} />
 {errors.scolarite?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.scolarite?.type==='min' && <span className='text-danger'>La scolarite doit être supérieure à 0</span>}
 </Form.Group>
 <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
 </Form>
 </Modal.Body>
 </Modal>
 </Container>
 );
};

export default CreateForm;