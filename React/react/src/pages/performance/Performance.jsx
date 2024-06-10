import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, OverlayTrigger, Row, Table, Tooltip, Modal} from "react-bootstrap";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";

// fonction pour modifier un stage et affichant au prealable les anciennes informations de l'utilisateur

function MyVerticallyCenteredModal(props) {

 const { register, handleSubmit,reset, formState: { errors } } = useForm();
 const history= useNavigate()
 const updatePerformance = async (data) => {
 console.log(props.data.id)
 await axios.post(`${import.meta.env.VITE_URL}/performance/${props.data.id}`,{
 'respDelaiPerso': data.respDelai,
 'assuidPerso': data.assuid,
 'travailPerso': data.travail,
 'savoirVivrPerso': data.savoirVivr,
 'note': data.note,
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

 //window.location.reload()
 })
 .catch(function (error) {
 console.log(error);
 });
 }

 const [assuidValue, setAssuidValue] = useState(0);
 const [comprValue, setComprValue] = useState(0);
 const [travailPersoValue, setTravailPersoValue] = useState(0);
 const [savoirVivrValue, setSavoirVivrValue] = useState(0);
 const [computedNote, setComputedNote] = useState(0);

 const updateComputedNote = () => {
 const total = assuidValue + comprValue + travailPersoValue + savoirVivrValue;
 setComputedNote(total);
 };

 useEffect(() => {
 updateComputedNote()
 }, [assuidValue, comprValue, travailPersoValue, savoirVivrValue, computedNote]);



 return (
 <Modal
 {...props}
 size="lg"
 aria-labelledby="contained-modal-title-vcenter"
 centered
 >
 <Modal.Header closeButton className='bg-secondary text-white'>
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >
 Modifier une conduite
 </Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form onSubmit={handleSubmit(updatePerformance)} encType='multipart/form-data format' >
 <Form.Select aria-label="Default select example" {...register("respDelai", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setComprValue(newValue);
 updateComputedNote();
 }}
 defaultValue={props.data.respDelaiPerso}>
 <option value="0">Choisir le niveau de respect des délais </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.respDelai?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("assuid", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setAssuidValue(newValue);
 updateComputedNote();
 }}
 defaultValue={props.data.assuidPerso}>
 <option value="0">Choisir le niveau d'assiduité </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.assuid?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("travail", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setTravailPersoValue(newValue);
 updateComputedNote();
 }}
 defaultValue={props.data.travailPerso}>
 <option value="0">Choisir le niveau de travail du personnel </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.travail?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("savoirVivr", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setSavoirVivrValue(newValue);
 updateComputedNote();
 }}
 defaultValue={props.data.savoirVivrPerso}>
 <option value="0">Choisir le niveau du savoir vivre </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.savoirVivr?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Group className="mb-3" controlId="note" >
 <Form.Label>Note de la perfomance</Form.Label>
 <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })} value={computedNote} defaultValue={props.data.note}/>
 {errors.note?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.note?.type==='min' && <span className='text-danger'>La note doit être supérieure à 0</span>}
 {errors.note?.type==='max' && <span className='text-danger'>La note doit être inférieure ou égale à 20</span>}
 </Form.Group>
 <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Modifier</Button>{' '}</center>
 </Form>
 </Modal.Body>
 </Modal>
 );
}

const Performance = () => {

 const [show, setShow] = useState(false);
 const [fresh, setfresh] = useState(false);
 const [load, setload] = useState(false);
 const [done, setdone] = useState(false)
 const { register, handleSubmit,reset, formState: { errors } } = useForm();

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 const history=useNavigate()

 const [perf, setperf] = useState([])
 const [perso, setperso] = useState([])
 const [records, setRecords] = useState(perf)

 const [params, setparams] = useState([])
 const [modalShow, setModalShow] = React.useState(false);
 const [idL, setidL] = useState(0)

 const [searchQuery, setSearchQuery] = useState('');
 const keys=['prenomPerso', 'nomPerso'];

 const [filteredRecords, setFilteredRecords] = useState([]);
 const [selectedPerso, setSelectedPerso] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 const [seRecords, setSeRecords] = useState([]);
 const [selectedRecords, setSelectedRecords] = useState([]);

 const [check, setcheck] = useState([]);
 const [checkAll, setcheckAll] = useState(false);

 const [pageNumber, setPageNumber] = useState(0);
 const perPage = 20; // Nombre d'éléments par page

 let total=0

 const mentions = ['Mauvais', 'Moyen', 'Bon', 'Très Bien', 'Excellent']

 // fonction pour lister les conduites

 async function getPerformances() {
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/performances`);
 setperf(response.data);
 setRecords(response.data);
 setparams(response.data);
 setSeRecords(response.data)
 //setSelectedRecords(response.data)
 JSON.stringify(response.data)
 console.log(response)
 } catch (error) {
 console.error(error);
 }
 }

 async function getPersonnels(){
 try {
 const response = await axios.get(`${import.meta.env.VITE_URL}/personnels`);
 setperso(response.data)
 }catch (error){
 console.error(error)
 }
 }

 useEffect(() => {
 if (!load===true){
 getPerformances()
 getPersonnels()
 }
 },[fresh])

 useEffect(() => {
 if (params.length!==0) {
 setModalShow(true)
 }

 }, [fresh])

 // fonction pour créer une condite

 const onSubmit = async (data) => {

 const formData = new FormData();
 formData.append('personnel_id', data.nom);
 formData.append('respDelaiPerso', data.respDelai);
 formData.append('assuidPerso', data.assuid);
 formData.append('travailPerso', data.travail);
 formData.append('savoirVivrPerso', data.savoirVivr);
 formData.append('note', data.note);

 axios.post(`${import.meta.env.VITE_URL}/performances`,formData)
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
 //window.location.reload()
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

 const handleDeleteSelected = () => {
 console.log(check)
 if (check.length==0 || selectedRecords.length==0){
 // swal({
 // text: "Sélectionnez au moins une abscence !!!",
 // icon: "info",
 // button: "OK",
 // timer: 10000
 // });
 }else {
 axios.put(`${import.meta.env.VITE_URL}/performance/element`, {
 data: selectedRecords,
 })
 .then(function (response) {
 console.log(response.data);
 })
 .catch(function (error) {
 console.log(error);
 });
 }
 };

 const handleRestauresSelected = () => {
 if (selectedRecords.length === 0) {
 // Afficher un message d'erreur car rien n'est sélectionné
 return;
 }

 axios.put(`${import.meta.env.VITE_URL}/performance/elementRestaures`, { ids: selectedRecords })
 .then(function (response) {
 swal("Restaurées !", "Les performance sélectionnées ont été archivé.", "success");
 window.location.reload();
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

 axios.put(`${import.meta.env.VITE_URL}/performance/elementSupprime`, { ids: selectedRecords })
 .then(function (response) {
 swal("Supprimées !", "Les performances sélectionnées ont été supprimé.", "success");
 window.location.reload();
 })
 .catch(function (error) {
 console.error(error);
 });
 };

 // fonction pour supprimer une abscence

 const delPerformance = async (id) => {
 swal({
 title: "Êtes-vous certains de vouloir effectuer cette action ?",
 text: "Vous risquez de ne plus pouvoir restaurer cette performance !",
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
 // Pour mettre à jour le champ 'supprimer' de conduite en le mettant à 1
 axios
 .put(`${import.meta.env.VITE_URL}/performance/${id}/supprimer`, { supprimer: 1 })
 .then(function(response) {
 swal("Supprimé!", "Votre performance a bien été supprimée.", "success");
 // Rechargez la page après la suppression
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else if (value === "archiver") {
 // Pour mettre à jour le champ 'archiver' de conduite en le mettant à 1
 axios
 .put(`${import.meta.env.VITE_URL}/performance/${id}/archiver`, { archiver: 1 })
 .then(function(response) {
 swal("Archivé!", "Votre performance a été marquée comme archivée.", "success");
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else {
 // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
 swal("Annulé", "Votre performance n'a pas été modifiée.", "info");
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

 //filtrer les conduites

 const filterPeformance = () => {
 const filteredRecords = seRecords.filter((record) => {
 const matchPerso =
 selectedPerso === '' ||
 (record.nomPerso + ' ' + record.prenomPerso) === selectedPerso;

 // Obtenez la date de l'enregistrement sous forme de date JavaScript
 const recordDate = new Date(record.created_at);

 // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
 const dateFilter =
 (!startDate || recordDate >= new Date(startDate)) &&
 (!endDate || recordDate <= new Date(endDate));

 // Combinez toutes les conditions de filtrage
 return matchPerso && dateFilter;
 });

 setRecords(filteredRecords);
 };

 useEffect(() => {
 filterPeformance()
 }, [selectedPerso, startDate, endDate]);

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

 const [assuidValue, setAssuidValue] = useState(0);
 const [comprValue, setComprValue] = useState(0);
 const [travailPersoValue, setTravailPersoValue] = useState(0);
 const [savoirVivrValue, setSavoirVivrValue] = useState(0);
 const [computedNote, setComputedNote] = useState(0);

 const updateComputedNote = () => {
 const total = assuidValue + comprValue + travailPersoValue + savoirVivrValue;
 setComputedNote(total);
 };

 useEffect(() => {
 updateComputedNote()
 }, [assuidValue, comprValue, travailPersoValue, savoirVivrValue, computedNote]);

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
 <h1>Performances</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
 <li className="breadcrumb-item active">Performances</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Liste des rapports sur la performance des personnels</h3>
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
 <strong>Supprimer plusieurs performances</strong>.
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
 <strong>Archiver plusieurs performances</strong>.
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
 <span>Personnel</span>
 <Form.Select aria-label="Default select example" className='mb-3' value={selectedPerso} onChange={(e) => setSelectedPerso(e.target.value)}>
 <option>Choisir le personnel</option>
 {
 records.length !== 0 && (
 [...new Set(records.map((element) => element.nomPerso +' '+ element.prenomPerso))].map((nom, index) => {
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

 <Table responsive>
 <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
 <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}} className='w-100'>
 {['right'].map((placement) => (
 <OverlayTrigger
 key={placement}
 placement={placement}
 overlay={
 <Tooltip id={`tooltip-${placement}`}>
 <strong>Créer une performance</strong>.
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
 <th></th>
 <th>Date</th>
 <th>Nom Personnel</th>
 <th>Respect délai</th>
 <th>Assiduité</th>
 <th>Travail</th>
 <th>Savoir vivre</th>
 <th>Note</th>
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
 <strong>Modifier performance</strong>.
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
 <strong>Supprimer performance</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delPerformance(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
 </OverlayTrigger>
 ))}
 </td>
 <td>{formatdate}</td>
 <td key={index}>{element.nomPerso +' '+element.prenomPerso}</td>
 <td>{mentions[element.respDelaiPerso-1]}</td>
 <td>{mentions[element.assuidPerso-1]}</td>
 <td>{mentions[element.travailPerso-1]}</td>
 <td>{mentions[element.savoirVivrPerso-1]}</td>
 <td>{element.note}</td>
 </tr>
 <MyVerticallyCenteredModal
 show={(idL===element.id) && modalShow}
 onHide={() => setModalShow(false)}
 data={params}
 performance={perf}
 />
 </>
 )
 })
 }
 </tbody>

 </Table>
 </div>
 </div>
 </div>
 </div>
 </div>
 <div className="card-footer">
 <p className='text-danger fs-4 fw-3 mt-3'>Total de performances : {total} </p>
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
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une Performance</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
 <Form.Select aria-label="Default select example" {...register("nom", { required: true })} className='mb-3'controlId="fil" >
 <option>Choisir le personnel</option>
 {
 perso.map((element) =>{
 return(
 <option key={element.id} value={element.id}>{element.nomPerso+' '+element.prenomPerso}</option>
 )
 })
 }
 </Form.Select>
 <Form.Select aria-label="Default select example" {...register("respDelai", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setComprValue(newValue);
 updateComputedNote();
 }} >
 <option value="0">Choisir le niveau de respect des délais </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.respDelai?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("assuid", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setAssuidValue(newValue);
 updateComputedNote();
 }}>
 <option value="0">Choisir le niveau d'assiduité </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.assuid?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("travail", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setTravailPersoValue(newValue);
 updateComputedNote();
 }}>
 <option value="0">Choisir le niveau de travail du personnel </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.travail?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Select aria-label="Default select example" {...register("savoirVivr", { required: true })} className='mb-3'controlId="typeAbsc"
 onChange={(e) => {
 const newValue = parseInt(e.target.value);
 setSavoirVivrValue(newValue);
 updateComputedNote();
 }}>
 <option value="0">Choisir le niveau du savoir vivre </option>
 <option value="1">Mauvais</option>
 <option value="2">Moyen</option>
 <option value="3">Bon</option>
 <option value="4">Très bon</option>
 <option value="5">Excellent</option>
 </Form.Select>
 {errors.savoirVivr?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 <Form.Group className="mb-3" controlId="note" >
 <Form.Label>Note de la perfomance</Form.Label>
 <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })} value={computedNote}/>
 {errors.note?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 {errors.note?.type==='min' && <span className='text-danger'>La note doit être supérieure à 0</span>}
 {errors.note?.type==='max' && <span className='text-danger'>La note doit être inférieure ou égale à 20</span>}
 </Form.Group>
 <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
 </Form>
 </Modal.Body>
 </Modal>
 </Container>
 );
};

export default Performance;