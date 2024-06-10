import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function MyVerticallyCenteredModal(props) {

 const { register, handleSubmit,reset, formState: { errors } } = useForm();
 const history= useNavigate()
 console.log(props.data.id)
 const updatePersonnel = async (data) => {

 await axios.post(`${import.meta.env.VITE_URL}/personnel/${props.data.id}`,{
 'nomPerso': data.nom,
 'prenomPerso': data.prenom,
 'emailPerso': data.email,
 'dateNaissancePerso': data.dateNais,
 'adressePerso': data.adresse,
 'telPerso': data.tel,
 'sexePerso': data.sexe,
 'imagePerso': data.photo,
 'diplomePerso': data.diplome,
 'postePerso': data.poste,
 'salairePerso': data.salaire,
 'debutContratPerso': data.dateDeb,
 'finContratPerso': data.dateFin,
 'typeContratPerso': data.typeContrat,
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
 <Modal.Title id="contained-modal-title-vcenter"className='fw-4' >
 Modifier un personnel
 </Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form onSubmit={handleSubmit(updatePersonnel)}>
 <>
 <div className="container">
 <div className="row mb-3">

 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Nom">
 <Form.Control type='text' {...register("nom", { required: true })} defaultValue={props.data.nomPerso} />
 {errors.nom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Prénom">
 <Form.Control type='text' {...register("prenom", { required: true })} defaultValue={props.data.prenomPerso}/>
 {errors.prenom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Email">
 <Form.Control type='email' {...register("email", { required: true })} defaultValue={props.data.emailPerso}/>
 {errors.email?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date de naissance">
 <Form.Control type='date' {...register("dateNais", { required: true })} defaultValue={props.data.dateNaissancePerso}/>
 {errors.dateNais?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Adresse">
 <Form.Control type='text' {...register("adresse", { required: true })} defaultValue={props.data.adressePerso}/>
 {errors.adresse?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Numero téléphone">
 <Form.Control type='text' {...register("tel", { required: true })} defaultValue={props.data.telPerso}/>
 {errors.tel?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Genre de l'étudiant">
 <Form.Select aria-label="Floating label select example" {...register("sexe", { required: true })} defaultValue={props.data.sexePerso}>
 <option value="">Choix du sexe</option>
 <option value="Masculin">Masculin</option>
 <option value="Feminin">Feminin</option>
 </Form.Select>
 {errors.sexe?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Diplome">
 <Form.Control type='text' {...register("diplome", { required: true })} defaultValue={props.data.diplomePerso}/>
 {errors.diplome?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 </div>

 <div className="row mb-3">

 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="poste">
 <Form.Control type='text' {...register("poste", { required: true })} defaultValue={props.data.postePerso}/>
 {errors.poste?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Salaire">
 <Form.Control type='number' {...register("salaire", { required: true })} defaultValue={props.data.salairePerso}/>
 {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date Debut Contrat">
 <Form.Control type='date' {...register("dateDeb", { required: true })} defaultValue={props.data.debutContratPerso}/>
 {errors.dateDeb?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date Fin Contrat">
 <Form.Control type='date' {...register("dateFin", { required: false })} defaultValue={props.data.finContratPerso}/>
 {errors.dateFin?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-6 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Photo Profil">
 <Form.Control type='file' {...register("photo", { required: true })} defaultValue={props.data.imagePerso}/>
 {errors.photo?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-6 mb-3">
 <FloatingLabel controlId="floatingSelect">
 <Form.Select aria-label="Floating label select example" {...register("typeContrat", { required: true })} defaultValue={props.data.typeContratPerso}>
 <option value="">Choisir le type de contrat</option>
 <option value="CDI">CDI</option>
 <option value="CDD">CDD</option>
 </Form.Select>
 {errors.typeContrat?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 </div>

 <div className="row d-flex justify-content-center">
 {/* <div className="col-md-6"> */}
 <Button variant="secondary" className='w-25 me-2' type={"submit"}>Modifier</Button>
 <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
 {/* </div> */}
 </div>
 </div>
 </>
 </Form>
 </Modal.Body>
 </Modal>
 );
}

const Persos = () => {

 const [show, setShow] = useState(false);
 const [fresh, setfresh] = useState(false);
 const [load, setload] = useState(false);
 const [done, setdone] = useState(false)
 const { register, handleSubmit,reset, formState: { errors } } = useForm();

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

 const history=useNavigate()

 const [perso, setperso] = useState([])
 const [records, setRecords] = useState(perso)

 const [params, setparams] = useState([])
 const [modalShow, setModalShow] = React.useState(false);
 const [idL, setidL] = useState(0)

 const [searchQuery, setSearchQuery] = useState('');
 const keys=['postePerso', 'diplomePerso','typeContratPerso', 'nomPerso','prenomPerso'];

 const [filteredRecords, setFilteredRecords] = useState([]);
 const [selectedPoste, setSelectedPoste] = useState('');
 const [selectedPerso, setSelectedPerso] = useState('');
 const [selectedTypeContrat, setSelectedTypeContrat] = useState('');
 const [startDate, setStartDate] = useState('');
 const [endDate, setEndDate] = useState('');

 const [seRecords, setSeRecords] = useState([]);
 const [selectedRecords, setSelectedRecords] = useState([]);

 const [check, setcheck] = useState([]);
 const [checkAll, setcheckAll] = useState(false);

 const [pageNumber, setPageNumber] = useState(0);
 const perPage = 20; // Nombre d'éléments par page

 let total=0

// fonction pour lister les abscences

 async function getPersonnels() {
 try {
 setload(true)
 const response = await axios.get(`${import.meta.env.VITE_URL}/personnels`);
 setperso(response.data);
 setRecords(response.data);
 setparams(response.data);
 setSeRecords(response.data)
 setload(false)
 //setSelectedRecords(response.data)
 } catch (error) {
 console.error(error);
 }
 }

 useEffect(() => {
 if (!load===true){
 getPersonnels()
 }
 },[fresh])

 useEffect(() => {
 if (params.length!==0) {
 setModalShow(true)
 }

 }, [fresh])

// fonction pour créer un personnel

 const onSubmit = async (data) => {

 const formData = new FormData();
 formData.append('nomPerso', data.nom);
 formData.append('prenomPerso', data.prenom);
 formData.append('emailPerso', data.email);
 formData.append('dateNaissancePerso', data.dateNais);
 formData.append('adressePerso', data.adresse);
 formData.append('telPerso', data.tel);
 formData.append('sexePerso', data.sexe);
 formData.append('imagePerso', data.photo[0]);
 formData.append('diplomePerso', data.diplome);
 formData.append('postePerso', data.poste);
 formData.append('salairePerso', data.salaire);
 formData.append('debutContratPerso', data.dateDeb);
 formData.append('finContratPerso', data.dateFin);
 formData.append('typeContratPerso', data.typeContrat);

 axios.post(`${import.meta.env.VITE_URL}/personnels`,formData)
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

 axios.put(`${import.meta.env.VITE_URL}/personnel/elementRestaures`, { ids: selectedRecords })
 .then(function (response) {
 swal("Archivé !", "Les personnels sélectionnés ont été archivé.", "success");
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

 axios.put(`${import.meta.env.VITE_URL}/personnel/elementSupprime`, { ids: selectedRecords })
 .then(function (response) {
 swal("Supprimé !", "Les personnels sélectionnés ont été supprimé.", "success");
 window.location.reload();
 })
 .catch(function (error) {
 console.error(error);
 });
 };

// fonction pour supprimer un personnel

 const delPersonnel = async (id) => {
 swal({
 title: "Êtes-vous certains de vouloir effectuer cette action ?",
 text: "Vous risquez de ne plus pouvoir restaurer ce personnel !",
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
 // Pour mettre à jour le champ 'supprimer' de l'personnel en le mettant à 1
 axios
 .put(`${import.meta.env.VITE_URL}/personnel/${id}/supprimer`, { supprimer: 1 })
 .then(function(response) {
 swal("Supprimé!", "Votre personnel a bien été supprimé.", "success");
 // Rechargez la page après la suppression
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else if (value === "archiver") {
 // Pour mettre à jour le champ 'archiver' de l'personnel en le mettant à 1
 axios
 .put(`${import.meta.env.VITE_URL}/personnel/${id}/archiver`, { archiver: 1 })
 .then(function(response) {
 swal("Archivé!", "Votre personnel a été marqué comme archivé.", "success");
 window.location.reload();
 })
 .catch(function(error) {
 console.error(error);
 });
 } else {
 // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
 swal("Annulé", "Votre personnel n'a pas été modifié.", "info");
 }
 })
 .catch(function(error) {
 console.error(error);
 });
 };

//Modifier les infos d'un personnel

 function handleMan(element) {
 setidL(element.id)
 setparams(element)
 setModalShow(true)
 }

//filtrer les personnels

 const filterPersonnels = () => {
 const filteredRecords = seRecords.filter((record) => {
 const matchPerso =
 selectedPerso === '' ||
 (record.nomPerso + ' ' + record.prenomPerso) === selectedPerso;
 const matchPoste =
 selectedPoste === '' || record.postePerso === selectedPoste;

 const matchTypeContrat =
 selectedTypeContrat === '' || record.typeContratPerso === selectedTypeContrat;

 // Obtenez la date de l'enregistrement sous forme de date JavaScript
 const recordDate = new Date(record.created_at);

 // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
 const dateFilter =
 (!startDate || recordDate >= new Date(startDate)) &&
 (!endDate || recordDate <= new Date(endDate));

 // Combinez toutes les conditions de filtrage
 return matchPerso && matchPoste && matchTypeContrat && dateFilter;
 });

 setRecords(filteredRecords);
 };

 useEffect(() => {
 filterPersonnels()
 }, [selectedPoste, selectedTypeContrat, selectedPerso, startDate, endDate]);

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
 <BarreLateralePerso/>
 </Col>
 <Col className='col-lg-12'>
 <main id="main" className="main">

 <div className="pagetitle">
 <h1>Personnel</h1>
 <nav>
 <ol className="breadcrumb">
 <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
 <li className="breadcrumb-item active">Personnel</li>
 </ol>
 </nav>
 </div>

 <section className="section form">
 <div className="row">

 <div className="col-lg-12">
 <div className="row">

 <div className="card">
 <div className="card-header">
 <h3 className="card-title">Liste des personnels</h3>
 </div>
 <div className="card-body">
 <div className="row">
 <div className="col-12">
 <div className="card">
 <div className="card-body ">
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
 <strong>Supprimer plusieurs Personnel</strong>.
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
 <strong>Archiver plusieurs Personnel</strong>.
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
 perso.length !== 0 && (
 [...new Set(perso.map((element) => element.nomPerso +' '+ element.prenomPerso))].map((nom, index) => {
 return (
 <option key={index} value={nom}>{nom}</option>
 );
 })
 )
 }
 </Form.Select>
 </Col>
 <Col className='col-md-2'>
 <span>Poste</span>
 <Form.Select aria-label="Default select example" className='mb-3' value={selectedPoste} onChange={(e) => setSelectedPoste(e.target.value)}>
 <option>Choisir le poste</option>
 {
 perso.length !== 0 && (
 [...new Set(perso.map((element) => element.postePerso))].map((nom, index) => {
 return (
 <option key={index} value={nom}>{nom}</option>
 );
 })
 )
 }
 </Form.Select>
 </Col>
 <Col className='col-md-2'>
 <span>Type Contrat</span>
 <Form.Select value={selectedTypeContrat} onChange={(e) => setSelectedTypeContrat(e.target.value)} aria-label="Default select example" className='mb-3'>
 <option>Choisir le type de contrat</option>
 <option value="CDI">CDI</option>
 <option value="CDD">CDD</option>
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
 <strong>Créer une promotion</strong>.
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
 <th>Nom </th>
 <th>Email</th>
 <th>Poste</th>
 <th>Type</th>
 <th>Photo</th>
 </tr>
 </thead>
 <tbody>
 {
 load ?
 <tr>
 <td colSpan={15} align='center'>
 <ReactLoading type={'bubbles'} color={'red'} height={70} width={70} />
 </td>
 </tr>
 :
 records.filter((element) =>
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
 <strong>Voir personnel</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3' > <Link to={`/personnel/voir_personnel/${element.id}`}><FaEye className="text-warning" style={{ cursor:'pointer' }} /></Link></Button>
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
 <strong>Modifier promotion</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleMan(element)}><FaEdit className='text-primary me-1' style={{ cursor:'pointer' }}/></Button>
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
 <strong>Supprimer promotion</strong>.
 </Tooltip>
 }
 >
 <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delCarriere(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
 </OverlayTrigger>
 ))}
 </td>
 <td>{formatdate}</td>
 <td key={index}>{element.nomPerso +' '+element.prenomPerso}</td>
 <td key={index}>{element.emailPerso}</td>
 <td key={index}>{element.postePerso}</td>
 <td key={index}>{element.typeContratPerso}</td>
 <td>
 <img
 src={`${import.meta.env.VITE_URL_Image}/imagesPerso/${element.imagePerso}`}
 //src={element.imagePerso}
 width='100%'
 height='50px'
 alt={'image-perso'}
 />
 </td>
 </tr>
 <MyVerticallyCenteredModal
 show={(idL===element.id) && modalShow}
 onHide={() => setModalShow(false)}
 data={params}
 personnel={perso}
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
 <p className='text-danger fs-4 fw-3 mt-3'>Total de personnels : {total} </p>
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
 <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter un personnel</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <p className='fw-bold fs-5'>Informations sur le personnel</p>

 <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
 <>
 <div className="container">
 <div className="row mb-3">

 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Nom">
 <Form.Control type='text' {...register("nom", { required: true })} />
 {errors.nom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Prénom">
 <Form.Control type='text' {...register("prenom", { required: true })} />
 {errors.prenom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Email">
 <Form.Control type='email' {...register("email", { required: true })} />
 {errors.email?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date de naissance">
 <Form.Control type='date' {...register("dateNais", { required: true })} />
 {errors.dateNais?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Adresse">
 <Form.Control type='text' {...register("adresse", { required: true })} />
 {errors.adresse?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Numero téléphone">
 <Form.Control type='text' {...register("tel", { required: true })} />
 {errors.tel?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Genre de l'étudiant">
 <Form.Select aria-label="Floating label select example" {...register("sexe", { required: true })}>
 <option value="">Choix du sexe</option>
 <option value="Masculin">Masculin</option>
 <option value="Feminin">Feminin</option>
 </Form.Select>
 {errors.sexe?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Diplome">
 <Form.Control type='text' {...register("diplome", { required: true })} />
 {errors.diplome?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 </div>

 <div className="row mb-3">


 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="poste">
 <Form.Control type='text' {...register("poste", { required: true })} />
 {errors.poste?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Salaire">
 <Form.Control type='number' {...register("salaire", { required: true })} />
 {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date Debut Contrat">
 <Form.Control type='date' {...register("dateDeb", { required: true })} />
 {errors.dateDeb?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-3 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Date Fin Contrat">
 <Form.Control type='date' {...register("dateFin", { required: false })} />
 {errors.dateFin?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-6 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Photo Profil">
 <Form.Control type='file' {...register("photo", { required: true })} />
 {errors.photo?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 <div className="col-md-6 mb-3">
 <FloatingLabel controlId="floatingSelect" label="Type de contrat">
 <Form.Select aria-label="Floating label select example" {...register("typeContrat", { required: true })}>
 <option value="">Choisir le type de contrat</option>
 <option value="CDI">CDI</option>
 <option value="CDD">CDD</option>
 </Form.Select>
 {errors.typeContrat?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
 </FloatingLabel>
 </div>
 </div>

 <div className="row d-flex justify-content-center mb-3">
 {/* <div className="col-md-6"> */}
 <Button variant="secondary" className='w-25 me-2' type={'submit'}>Ajouter</Button>
 {/* </div> */}
 </div>


 </div>
 </>
 </Form>
 </Modal.Body>
 </Modal>
 </Container>
 );
};

export default Persos;