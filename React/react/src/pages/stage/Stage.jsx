import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaTrashAlt, FaFilter, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading';

// fonction pour modifier un stage et affichant au prealable les anciennes informations de l'utilisateur

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()

    console.log(props.stage.id)
    const updateStage = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/stage/${props.data.id}`,{
            'nomEntrSta': data.nomEntr,
            'dateDebSta': data.dateDeb,
            'dateFinSta': data.dateFin,
            'projetSta': data.projet,
            'statutProjSta': data.statutProj,
            'rapSta': data.rap[0],
            'noteSta': data.note,
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
                    Modifier un stage
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateStage)} encType='multipart/form-data format' >
                    <Form.Group className="mb-3" controlId="nomEntr" >
                        <Form.Label>Nom de l'entreprise du stage</Form.Label>
                        <Form.Control type="text" {...register("nomEntr", { required: true, minLength:3 })} defaultValue={props.data.nomEntrSta} />
                        {errors.nomEntr?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        {errors.nomEntr?.type==='minLength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateDeb" >
                        <Form.Label>Date de debut du stage</Form.Label>
                        <Form.Control type="date" {...register("dateDeb", { required: true })} defaultValue={props.data.dateDebSta} />
                        {errors.dateDeb?.type==='required' && <span className='text-danger'>Ce Champ es
                            t Obligatoire</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateFin" >
                        <Form.Label>Date de fin du stage</Form.Label>
                        <Form.Control type="date" {...register("dateFin", { required: false })} defaultValue={props.data.dateFinSta} />
                        {errors.dateFin?.type==='required' && <span className='text-danger'>Ce Champ es
                            t Obligatoire</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="projet" >
                        <Form.Label>Projet du stage</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("projet", { required: true, minLength:3 })} defaultValue={props.data.projetSta} />
                        {errors.projet?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        {errors.projet?.type==='required' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                    </Form.Group>
                    <Form.Select aria-label="Default select example" {...register("statutProj", { required: true })} defaultValue={props.data.statutProjSta} className='mb-3'controlId="typeAbsc" >
                        <option>Choisir le statut du projet </option>
                        <option value="En Attente">En Attente</option>
                        <option value="En Cours">En Cours</option>
                        <option value="Terminé">Terminé</option>
                    </Form.Select>
                    {errors.statutProj?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                    <Form.Group className="mb-3" controlId="rap" >
                        <Form.Label>Rapport de stage</Form.Label>
                        <Form.Control type="text" {...register("rap", { required: false })}  defaultValue={props.data.rapSta}/>
                        {errors.rap?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="note" >
                        <Form.Label>Note de stage</Form.Label>
                        <Form.Control type="number" {...register("note", { required: false, min:0, max:20 })} defaultValue={props.data.noteSta} />
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

const Stage = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);
    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
        selectedFormation: 'Choisir la filière',
        selectedEtudiant: 'Choisir l\'étudiant',
        selectedEntreprise: 'Choisir l\'entreprise',
        selectedstatut: 'Choisir le status'
    });

    const history=useNavigate()

    const [stag, setstag] = useState([])
    const [etudiant, setetudiant] = useState([])
    const [filiere, setfiliere] = useState([])
    const [records, setRecords] = useState(stag)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['statutProjSta', 'nomEtud', 'nomForm','nomEntrSta'];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedFormation, setSelectedFormation] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState('');
    const [selectedstatut, setSelectedstatut] = useState('')
    const [selectedEntreprise, setSelectedEntreprise] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [seRecords, setSeRecords] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let total=0

    // fonction pour lister les stages

    async function getStages() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/stages`);
            setstag(response.data);
            setRecords(response.data);
            setparams(response.data);
            setSeRecords(response.data)
            //setSelectedRecords(response.data)
            JSON.stringify(response.data)
            console.log(response.data)
            setload(false)
        } catch (error) {
            console.error(error);
            console.log('pas faiit')
        }
    }

    async function getEtudiants(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`);
            setetudiant(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function getFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
            setfiliere(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (!load===true){
            getStages()
            getFiliere()
            getEtudiants()
        }
    },[fresh])

    const handleFiliereChange = async (e) => {
        const selectedFiliereId = e.target.value;

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/etudiant/${selectedFiliereId}`);
            setetudiant(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }

    }, [fresh])

    // fonction pour créer un stage

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('formation_id', data.fil);
        formData.append('nomEntrSta', data.nomEntr);
        formData.append('dateDebSta', data.dateDeb);
        formData.append('dateFinSta', data.dateFin);
        formData.append('projetSta', data.projet);
        formData.append('statutProjSta', data.statutProj);
        formData.append('rapSta', data.rap);
        formData.append('noteSta', data.note);

        const selectedEtudiant = etudiant.find(etud => etud.nomEtud + ' ' + etud.prenomEtud === data.nom);
        console.log(selectedEtudiant)
        if (!selectedEtudiant) {
            // Gérer le cas où l'étudiant n'est pas trouvé
            console.error("Étudiant non trouvé");
            return;
        }
    
        formData.append('etudiant_id', selectedEtudiant.id);

        axios.post(`${import.meta.env.VITE_URL}/stages`,formData)
            .then(function (response) {
                console.log(data);
                console.log(response.data);
                JSON.stringify(response.data)
                setShow(false)
                reset()
                swal({
                    title: "Ajouté Avec Succès !!!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "OK",
                    timer: 2000
                });
               getStages()
               setstag(stag)
            })
            .catch(function(error)  {
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
            //     text: "Sélectionnez au moins une abscence !!!",
            //     icon: "info",
            //     button: "OK",
            //     timer: 10000
            // });
        }else {
            axios.put(`${import.meta.env.VITE_URL}/stage/element`, {
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

        axios.put(`${import.meta.env.VITE_URL}/stage/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("Archivé !", "Les stages sélectionnés ont été archvé.", "success");
                getStages()
               setstag(stag)
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

        axios.put(`${import.meta.env.VITE_URL}/stage/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les stages sélectionnés ont été supprimé.", "success");
                getStages()
               setstag(stag)
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    // fonction pour supprimer une abscence

    const delStage = async (id) => {
        swal({
            title: "Êtes-vous certains de vouloir effectué cette action ?",
            text: "Vous risquez de ne plus pouvoir restauré ce stage !",
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
                    // Pour mettre à jour le champ 'supprimer' de l'abscence en le mettant à 1
                    axios
                        .put(`http://localhost:8000/api/stage/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre stage a bien été supprimé", "success");
                            // Rechargez la page après la suppression
                            getStages()
                            setstag(stag)
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de l'abscence en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/stage/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre stage a été marqué comme archivé.", "success");
                            getStages()
                            setstag(stag)
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre stage n'a pas été modifié.", "info");
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    };

    //Modifier les infos d'un stage

    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    //filtrer les stages

    const filterStages = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchEtudiant =
                selectedEtudiant === '' ||
                (record.nomEtud + ' ' + record.prenomEtud) === selectedEtudiant;
            const matchFormation =
                selectedFormation === '' || record.nomForm === selectedFormation;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.dateDebSta);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            const matchStatut =
                selectedstatut === '' || record.statutProjSta === selectedstatut;

            const matchEntreprise =
                selectedEntreprise === '' || record.nomEntrSta === selectedEntreprise;

            // Combinez toutes les conditions de filtrage
            return matchEtudiant && matchFormation && dateFilter && matchStatut && matchEntreprise;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterStages();
    }, [selectedEtudiant, selectedFormation, startDate, endDate, selectedstatut, selectedEntreprise]);

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

    const handleShowFilter = () => {
        // Sauvegarde des valeurs actuelles des filtres dans initialFilters
        setInitialFilters({
            startDate,
            endDate,
            selectedFormation,
            selectedEtudiant,
            selectedstatut,
            selectedEntreprise
        });

        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate(initialFilters.startDate);
        setEndDate(initialFilters.endDate);
        setSelectedFormation(initialFilters.selectedFormation);
        setSelectedEtudiant(initialFilters.selectedEtudiant);
        setSelectedstatut(initialFilters.selectedstatut)
        setSelectedEntreprise(initialFilters.selectedEntreprise)
    };

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Stages</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Stages</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des stages</h3>
                                            </div>
                                            <div className="card-body">
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
                                                                        <strong>Supprimer plusieurs stages</strong>.
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button variant="transparent" className='mb-3 ms-3 border-0' onClick={()=>handleSupprimeSelected(selectedRecords)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }}/></Button>
                                                            </OverlayTrigger>
                                                        ))}
                                                        {['bottom'].map((placement) => (
                                                            <OverlayTrigger
                                                                key={placement}
                                                                placement={placement}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                        <strong>Restaurer plusieurs stages</strong>.
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button variant="transparent" className='mb-3 ms-3 border-0' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                            </OverlayTrigger>
                                                        ))}
                                                        {['right'].map((placement) => (
                                                            <OverlayTrigger
                                                                key={placement}
                                                                placement={placement}
                                                                overlay={
                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                        <strong>Filtrer les stages</strong>.
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button variant="transparent" className='mb-3 ms-3 border-0' onClick={handleShowFilter} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaFilter className="text-primary" size={24} style={{ cursor:'pointer' }}/></Button>
                                                            </OverlayTrigger>
                                                        ))}
                                                    </Form>

                                                    <Row className='d-flex justify-content-center'>

                                                        <Modal
                                                            show={showFilter}
                                                            onHide={handleCloseFilter}
                                                            backdrop="static"
                                                            keyboard={false}
                                                            size="lg"
                                                        >
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Filtre</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>
                                                                <Form>
                                                                    <Row className='d-flex justify-content-center'>

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
                                                                                    stag.length !== 0 && (
                                                                                        [...new Set(stag.map((element) => element.nomForm))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Etudiant</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)}>
                                                                                <option>Choisir l'étudiant</option>
                                                                                {
                                                                                    stag.length !== 0 && (
                                                                                        [...new Set(stag.map((element) => element.nomEtud +' '+ element.prenomEtud))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Statut</span>
                                                                            <Form.Select value={selectedstatut} onChange={(e) => setSelectedstatut(e.target.value)} aria-label="Default select example" className='mb-3'>
                                                                                <option>Choisir le statut du stage</option>
                                                                                <option value="En attente">En attente</option>
                                                                                <option value="En cours">En cours</option>
                                                                                <option value="Terminé">Terminé</option>
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Entreprise</span>
                                                                            <Form.Select value={selectedEntreprise} onChange={(e) => setSelectedEntreprise(e.target.value)} aria-label="Default select example" className='mb-3'>
                                                                                <option>Choisir le nom de l'entreprise</option>
                                                                                {
                                                                                    stag.length !== 0 && (
                                                                                        [...new Set(stag.map((element) => element.nomEntrSta))].map((nom, index) => {
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
                                                            </Modal.Body>

                                                            <Modal.Footer>
                                                                <Button variant="primary" onClick={resetFilters}>Réinitialiser</Button>
                                                                <Button variant="secondary" onClick={handleCloseFilter}>
                                                                    Annuler
                                                                </Button>
                                                            </Modal.Footer>
                                                        </Modal>

                                                    </Row>

                                                    <Table responsive>
                                                        <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
                                                        <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}} className='w-100'>
                                                            {['right'].map((placement) => (
                                                                <OverlayTrigger
                                                                    key={placement}
                                                                    placement={placement}
                                                                    overlay={
                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                            <strong>Créer un stage</strong>.
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
                                                            <th>Etudiant</th>
                                                            <th>Filière</th>
                                                            <th>Entreprise</th>
                                                            <th>Debut</th>
                                                            <th>Fin</th>
                                                            <th>Statut</th>
                                                            <th>Rapport</th>
                                                            <th>Projet</th>
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
                                                                                                    <strong>Modifier stage</strong>.
                                                                                                </Tooltip>
                                                                                            }
                                                                                        >
                                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleMan(element)} ><FaEdit className='text-primary me-1' style={{ cursor:'pointer' }}/></Button>
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
                                                                                                    <strong>Supprimer stage</strong>.
                                                                                                </Tooltip>
                                                                                            }
                                                                                        >
                                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delStage(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }}/></Button>
                                                                                        </OverlayTrigger>
                                                                                    ))}
                                                                                </td>
                                                                                <td>{formatdate}</td>
                                                                                <td key={index}>{element.nomEtud +' '+element.prenomEtud}</td>
                                                                                <td key={index}>{element.nomForm}</td>
                                                                                <td key={index}>{element.nomEntrSta}</td>
                                                                                <td>{element.dateDebSta}</td>
                                                                                <td>{element.dateFinSta}</td>
                                                                                <td>{element.statutProjSta}</td>
                                                                                <td>{element.rapSta}</td>
                                                                                <td>{element.projetSta}</td>
                                                                                <td>{element.noteSta}</td>

                                                                            </tr>
                                                                            <MyVerticallyCenteredModal
                                                                                show={(idL===element.id) && modalShow}
                                                                                onHide={() => setModalShow(false)}
                                                                                data={params}
                                                                                stage={stag}
                                                                            />
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                        </tbody>

                                                    </Table>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total de stages : {total} </p>
                                                <ReactPaginate
                                                    previousLabel={<FaChevronLeft />}
                                                    nextLabel={<FaChevronRight />}
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter un stage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
                        <Form.Select aria-label="Default select example" {...register("fil", { required: true })} className='mb-3'controlId="fil" onChange={(e) => handleFiliereChange(e)} >
                            <option>Choisir la filière</option>
                            {
                                filiere.map((element) =>{
                                    return(
                                        <option key={element.id} value={element.id}>{element.nomForm}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        {errors.fil?.type==='required' && <span className='text-danger'>La filière est Obligatoire</span>}
                        <label htmlFor="exampleDataList" className="form-label">Liste d'étudiant</label>
                        <input
                            className="form-control"
                            list="datalistOptions"
                            placeholder="rechercher un etudiant"
                            {...register("nom", { required: true })}
                        />
                        <datalist id="datalistOptions">
                            {etudiant.length !== 0 && (
                                etudiant.map((element, index) => (
                                    <option key={index} value={element.nomEtud + ' ' + element.prenomEtud} data-id={element.etudiant_id} />
                                ))
                            )}
                        </datalist>
                        {errors.nom?.type==='required' && <span className='text-danger'>Le nom est Obligatoire</span>}
                        <Form.Group className="mb-3" controlId="nomEntr" >
                            <Form.Label>Nom de l'entreprise du stage</Form.Label>
                            <Form.Control type="text" {...register("nomEntr", { required: true, minLength:3 })} />
                            {errors.nomEntr?.type==='required' && <span className='text-danger'>Le nom de l'entreprise est Obligatoire et doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dateDeb" >
                            <Form.Label>Date de debut du stage</Form.Label>
                            <Form.Control type="date" {...register("dateDeb", { required: true })} />
                            {errors.dateDeb?.type==='required' && <span className='text-danger'>La date de début est Obligatoire</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dateFin" >
                            <Form.Label>Date de fin du stage</Form.Label>
                            <Form.Control type="date" {...register("dateFin", { required: false })} />
                            {errors.dateFin?.type==='required' && <span className='text-danger'>La date de fin est Obligatoire</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="projet" >
                            <Form.Label>Thème Projet du stage</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("projet", { required: true, minLength:3 })} />
                            {errors.projet?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et doit avoir au moins 10 caractères</span>}
                        </Form.Group>
                        <Form.Select aria-label="Default select example" {...register("statutProj", { required: true })} className='mb-3'controlId="typeAbsc" >
                            <option>Choisir le statut du projet </option>
                            <option value="En Attente">En Attente</option>
                            <option value="En Cours">En Cours</option>
                            <option value="Terminé">Terminé</option>
                        </Form.Select>
                        {errors.statutProj?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        <Form.Group className="mb-3" controlId="rap" >
                            <Form.Label>Rapport de stage</Form.Label>
                            <Form.Control type="text" {...register("rap", { required: false })} />
                            {errors.rap?.type==='required' && <span className='text-danger'>Le rapport est Obligatoire et maximum 5Mo</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="note" >
                            <Form.Label>Note de stage</Form.Label>
                            <Form.Control type="number" {...register("note", { required: false, min:0, max:20 })} />
                            {errors.note?.type==='required' && <span className='text-danger'>La note est Obligatoire et doit être comprise entre 0 et 20</span>}
                        </Form.Group>
                        <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Stage;