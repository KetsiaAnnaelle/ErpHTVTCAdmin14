import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, OverlayTrigger, Row, Table, Tooltip, Modal} from "react-bootstrap";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaFilter, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import.meta.env.VITE_URL;

// fonction pour modifier un stage et affichant au prealable les anciennes informations de l'utilisateur

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()
    const updateConduite = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/conduite/${props.data.id}`,{
            'dateCond': data.date,
            'comprCond': data.compr,
            'assuidCond': data.assuid,
            'travailPersoCond': data.travailPerso,
            'savoirVivrCond': data.savoirVivr,
            'avisFormcond': data.avisForm,
            'notecond': data.note,
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
                <Form onSubmit={handleSubmit(updateConduite)} encType='multipart/form-data format' >
                    <Form.Group className="mb-3" controlId="projet" >
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" {...register("date", { required: true })} defaultValue={props.data.dateCond} />
                        {errors.date?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                    </Form.Group>
                    <Form.Select aria-label="Default select example" {...register("compr", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                 onChange={(e) => {
                                     const newValue = parseInt(e.target.value);
                                     setComprValue(newValue);
                                     updateComputedNote();
                                 }} defaultValue={props.data.comprCond}>
                        <option value="0">Choisir le niveau de comprehension </option>
                        <option value="1">Mauvais</option>
                        <option value="2">Moyen</option>
                        <option value="3">Bon</option>
                        <option value="4">Très bon</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    {errors.compr?.type==='required' && <span className='text-danger'>La note compréhension est Obligatoire et doit être comprise entre 1 et 5</span>}
                    <Form.Select aria-label="Default select example" {...register("assuid", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                 onChange={(e) => {
                                     const newValue = parseInt(e.target.value);
                                     setAssuidValue(newValue);
                                     updateComputedNote();
                                 }} defaultValue={props.data.assuidCond}>
                        <option value="0">Choisir le niveau d'assiduité </option>
                        <option value="1">Mauvais</option>
                        <option value="2">Moyen</option>
                        <option value="3">Bon</option>
                        <option value="4">Très bon</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    {errors.assuid?.type==='required' && <span className='text-danger'>La note de l'assuidité est Obligatoire et doit être comprise entre 1 et 5</span>}
                    <Form.Select aria-label="Default select example" {...register("travailPerso", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                 onChange={(e) => {
                                     const newValue = parseInt(e.target.value);
                                     setTravailPersoValue(newValue);
                                     updateComputedNote();
                                 }} defaultValue={props.data.travailPersoCond}>
                        <option value="0">Choisir le niveau de travail personnel </option>
                        <option value="1">Mauvais</option>
                        <option value="2">Moyen</option>
                        <option value="3">Bon</option>
                        <option value="4">Très bon</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    {errors.travailPerso?.type==='required' && <span className='text-danger'>La note travail personnel est Obligatoire et doit être comprise entre 1 et 5 </span>}
                    <Form.Select aria-label="Default select example" {...register("savoirVivr", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                 onChange={(e) => {
                                     const newValue = parseInt(e.target.value);
                                     setSavoirVivrValue(newValue);
                                     updateComputedNote();
                                 }} defaultValue={props.data.savoirVivrCond}>
                        <option value="0">Choisir le niveau du savoir vivre </option>
                        <option value="1">Mauvais</option>
                        <option value="2">Moyen</option>
                        <option value="3">Bon</option>
                        <option value="4">Très bon</option>
                        <option value="5">Excellent</option>
                    </Form.Select>
                    {errors.savoirVivr?.type==='required' && <span className='text-danger'>La note savoir vivre est Obligatoire et doit être comprise entre 1 et 5</span>}
                    <Form.Group className="mb-3" controlId="projet" >
                        <Form.Label>Avis du formateur</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("avisForm", { required: false})} defaultValue={props.data.avisFormcond} />
                        {errors.avisForm?.type==='required' && <span className='text-danger'>L'avis est Obligatoire et doit avoir au moins 10 caractères</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="note" >
                        <Form.Label>Note de la conduite</Form.Label>
                        <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })}  value={computedNote} defaultValue={props.data.notecond}/>
                        {errors.note?.type==='required' && <span className='text-danger'>La note est Obligatoire et doit être comprise entre 0 et 20</span>}
                    </Form.Group>
                    <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Modifier</Button>{' '}</center>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const Conduite = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    const [cond, setcond] = useState([])
    const [form, setform] = useState([])
    const [etud, setetud] = useState([])
    const [etudiant, setetudiant] = useState([])
    const [records, setRecords] = useState(cond)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['comprCond', 'nomEtud', 'nomForm',];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedFormation, setSelectedFormation] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState('');
    const [selectedstatut, setSelectedstatut] = useState('');
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

    async function getConduites() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/conduites`);
            setcond(response.data);
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

    async function getFormation(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/form`);
            setform(response.data);
        } catch (error) {
            console.error(error);
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

    useEffect(() => {
        if (!load===true){
            getConduites()
            getFormation()
            getEtudiants()
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
        formData.append('formation_id', data.fil);
        formData.append('dateCond', data.date);
        formData.append('comprCond', data.compr);
        formData.append('assuidCond', data.assuid);
        formData.append('travailPersoCond', data.travailPerso);
        formData.append('savoirVivrCond', data.savoirVivr);
        formData.append('avisFormcond', data.avisForm);
        formData.append('notecond', data.note);

        const selectedEtudiant = etudiant.find(etud => etud.nomEtud + ' ' + etud.prenomEtud === data.nom);
        console.log(selectedEtudiant)
        if (!selectedEtudiant) {
            // Gérer le cas où l'étudiant n'est pas trouvé
            console.error("Étudiant non trouvé");
            return;
        }

        formData.append('etudiant_id', selectedEtudiant.id);

        axios.post(`${import.meta.env.VITE_URL}/conduites`,formData)
            .then(function (response) {
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
                window.location.reload()
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
            axios.put(`${import.meta.env.VITE_URL}/conduite/element`, {
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

        axios.put(`${import.meta.env.VITE_URL}/conduite/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("archivé !", "Les conduites sélectionnées ont été archivé.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/conduite/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les conduites sélectionnées ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    // fonction pour supprimer une abscence

    const delConduite = async (id) => {
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
                    // Pour mettre à jour le champ 'supprimer' de conduite en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/conduite/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre conduite a bien été supprimée.", "success");
                            // Rechargez la page après la suppression
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de conduite en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/conduite/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre conduite a été marquée comme archivée.", "success");
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre conduite n'a pas été modifiée.", "info");
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

    const filterConduite = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchEtudiant =
                selectedEtudiant === '' ||
                (record.nomEtud + ' ' + record.prenomEtud) === selectedEtudiant;
            const matchFormation =
                selectedFormation === '' || record.nomForm === selectedFormation;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.dateCond);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchEtudiant && matchFormation && dateFilter;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterConduite()
    }, [selectedEtudiant, selectedFormation, startDate, endDate]);

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

    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);

    function resetFilters() {
        setStartDate('')
        setEndDate('')
        getConduites()
    }


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
                            <h1>Conduites</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Conduites</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des rapports sur la conduite des étudiants</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
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
                                                                                    <strong>Supprimer plusieurs conduites</strong>.
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
                                                                                    <strong>Archiver plusieurs conduites</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                                        </OverlayTrigger>
                                                                    ))}

                                                                    {['right'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Filtrer les conduites</strong>.
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
                                                                                <Row className='d-flex justify-content-center mb-3'>
                                                                                    <Col className='col-md-3'>
                                                                                        <Form.Group className="mb-3" controlId="dateDeb">
                                                                                            <span>Periode de</span>
                                                                                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    <Col className='col-md-3'>
                                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                                            <span>à</span>
                                                                                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    <Col className='col-md-3'>
                                                                                        <span>Filière</span>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
                                                                                            <option>Choisir la filière</option>
                                                                                            {
                                                                                                records.length !== 0 && (
                                                                                                    [...new Set(records.map((element) => element.nomForm))].map((nom, index) => {
                                                                                                        return (
                                                                                                            <option key={index} value={nom}>{nom}</option>
                                                                                                        );
                                                                                                    })
                                                                                                )
                                                                                            }
                                                                                        </Form.Select>
                                                                                    </Col>
                                                                                    <Col className='col-md-3'>
                                                                                        <span>Etudiant</span>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)}>
                                                                                            <option>Choisir l'étudiant</option>
                                                                                            {
                                                                                                records.length !== 0 && (
                                                                                                    [...new Set(records.map((element) => element.nomEtud +' '+ element.prenomEtud))].map((nom, index) => {
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
                                                                                        <strong>Créer une conduite</strong>.
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
                                                                        <th></th>
                                                                        <th>Date</th>
                                                                        <th>Nom Etudiant</th>
                                                                        <th>Filière</th>
                                                                        <th>Comprehension</th>
                                                                        <th>Assiduité</th>
                                                                        <th>Travail personnel</th>
                                                                        <th>Savoir vivre</th>
                                                                        <th>Avis formateur</th>
                                                                        <th>note</th>
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
                                                                                                                <strong>Voir conduite</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' >  <Link to={`/conduite/voir_conduite/${element.id}`}><FaEye className="text-warning" style={{ cursor:'pointer' }} /></Link></Button>
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
                                                                                                                <strong>Modifier conduite</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleMan(element)} style={{ cursor:'pointer' }} ><FaEdit className='text-primary me-1' /></Button>
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
                                                                                                                <strong>Supprimer conduite</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delConduite(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td>{element.dateCond}</td>
                                                                                            <td key={index}>{element.nomEtud +' '+element.prenomEtud}</td>
                                                                                            <td key={index}>{element.nomForm}</td>
                                                                                            <td>{mentions[element.comprCond-1]}</td>
                                                                                            <td>{mentions[element.assuidCond-1]}</td>
                                                                                            <td>{mentions[element.travailPersoCond-1]}</td>
                                                                                            <td>{mentions[element.savoirVivrCond-1]}</td>
                                                                                            <td>{element.avisFormcond}</td>
                                                                                            <td>{element.notecond}</td>
                                                                                        </tr>
                                                                                        <MyVerticallyCenteredModal
                                                                                            show={(idL===element.id) && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            conduite={cond}
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total de conduites : {total} </p>
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une Conduite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        done && <div className="alert alert-success">Conduite cree avec succes!!!</div>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
                        <Form.Select aria-label="Default select example" {...register("fil", { required: true })} onChange={(e) => handleFiliereChange(e)} className='mb-3'controlId="fil" >
                            <option>Choisir la filière</option>
                            {
                                form.map((element) =>{
                                    return(
                                        <option key={element.id} value={element.id}>{element.nomForm}</option>
                                    )
                                })
                            }
                        </Form.Select>
                        {errors.fil?.type==='required' && <span className='text-danger'>La formation est Obligatoire</span>}
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
                        <Form.Group className="mb-3" controlId="projet" >
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" {...register("date", { required: true })} />
                            {errors.date?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                        </Form.Group>
                        <Form.Select aria-label="Default select example" {...register("compr", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                     onChange={(e) => {
                                         const newValue = parseInt(e.target.value);
                                         setComprValue(newValue);
                                         updateComputedNote();
                                     }} >
                            <option value="0">Choisir le niveau de comprehension </option>
                            <option value="1">Mauvais</option>
                            <option value="2">Moyen</option>
                            <option value="3">Bon</option>
                            <option value="4">Très bon</option>
                            <option value="5">Excellent</option>
                        </Form.Select>
                        {errors.compr?.type==='required' && <span className='text-danger'>La note compréhension est Obligatoire et doit être comprise entre 1 et 5</span>}
                        <Form.Select aria-label="Default select example" {...register("assuid", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
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
                        {errors.assuid?.type==='required' && <span className='text-danger'>La note de l'assuidité est Obligatoire et doit être comprise entre 1 et 5</span>}
                        <Form.Select aria-label="Default select example" {...register("travailPerso", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
                                     onChange={(e) => {
                                         const newValue = parseInt(e.target.value);
                                         setTravailPersoValue(newValue);
                                         updateComputedNote();
                                     }}>
                            <option value="0">Choisir le niveau de travail personnel </option>
                            <option value="1">Mauvais</option>
                            <option value="2">Moyen</option>
                            <option value="3">Bon</option>
                            <option value="4">Très bon</option>
                            <option value="5">Excellent</option>
                        </Form.Select>
                        {errors.travailPerso?.type==='required' && <span className='text-danger'>La note travail personnel est Obligatoire et doit être comprise entre 1 et 5 </span>}
                        <Form.Select aria-label="Default select example" {...register("savoirVivr", { required: true, min:1, max:5 })} className='mb-3'controlId="typeAbsc"
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
                        {errors.savoirVivr?.type==='required' && <span className='text-danger'>La note savoir vivre est Obligatoire et doit être comprise entre 1 et 5</span>}
                        <Form.Group className="mb-3" controlId="projet" >
                            <Form.Label>Avis du formateur</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("avisForm", { required: false })} />
                            {errors.avisForm?.type==='required' && <span className='text-danger'>L'avis est Obligatoire et doit avoir au moins 10 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="note" >
                            <Form.Label>Note de la conduite</Form.Label>
                            <Form.Control type="number" {...register("note", { required: true, min:0, max:20 })}  value={computedNote}/>
                            {errors.note?.type==='required' && <span className='text-danger'>La note est Obligatoire et doit être comprise entre 0 et 20</span>}
                        </Form.Group>
                        <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Conduite;