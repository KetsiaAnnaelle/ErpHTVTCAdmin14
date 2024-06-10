import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
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
import FloatingLabel from "react-bootstrap/FloatingLabel";
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";
import.meta.env.VITE_URL;

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()
    console.log(props.data.id)
    const updateEnseignant = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/enseignant/${props.data.id}`,{

            'nomEns': data.nom,
            'prenomEns': data.prenom,
            'emailEns': data.email,
            'dateNaisEns': data.dateNais,
            'cniEns': data.cni,
            'nivEtudeEns': data.niveau,
            'villeEns': data.ville,
            'paysEns': data.pays,
            'telEns': data.tel,
            'whatstappEns': data.what,
            'dernDiplEns': data.diplome,
            'genreEns': data.sexe,
            'salaireEns': data.salaire,
            'typeContratEns': data.typeContrat,
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
                <Form onSubmit={handleSubmit(updateEnseignant)}>
                    <>
                        <div className="container">
                            <div className="row mb-3">

                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Nom">
                                        <Form.Control type='text' {...register("nom", { required: true, minLength:3 })} defaultValue={props.data.nomEns} />
                                        {errors.nom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et doit avoir minimum 3 caractères</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Prénom">
                                        <Form.Control type='text' {...register("prenom", { required: true, minLength:3 })} defaultValue={props.data.prenomEns} />
                                        {errors.prenom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et doit avoir minimum 3 caractères</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Email">
                                        <Form.Control type='email' {...register("email", { required: true })} defaultValue={props.data.emailEns} />
                                        {errors.email?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Date de naissance">
                                        <Form.Control type='date' {...register("dateNais", { required: true })} defaultValue={props.data.dateNaissanceEns} />
                                        {errors.dateNais?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Numéro CNI">
                                        <Form.Control type='text' {...register("cni", { required: true })} defaultValue={props.data.cniEns} />
                                        {errors.cni?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Ville">
                                        <Form.Control type='text' {...register("ville", { required: true })} defaultValue={props.data.villeEns} />
                                        {errors.ville?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Pays">
                                        <Form.Control type='text' {...register("pays", { required: true })} defaultValue={props.data.paysEns} />
                                        {errors.pays?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Numero téléphone">
                                        <Form.Control type='text' {...register("tel", { required: true })} defaultValue={props.data.telEns} />
                                        {errors.tel?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Numero Whatstapp">
                                        <Form.Control type='text' {...register("what", { required: true })} defaultValue={props.data.whatstappEns} />
                                        {errors.what?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Genre de l'enseignant">
                                        <Form.Select aria-label="Floating label select example" {...register("sexe", { required: true })} defaultValue={props.data.genreEns}>
                                            <option value="">Choix du sexe</option>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminin">Feminin</option>
                                        </Form.Select>
                                        {errors.sexe?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Niveau d'etude">
                                        <Form.Select aria-label="Floating label select example" {...register("niveau", { required: true })} defaultValue={props.data.nivEtudeEns}>
                                            <option value="">Choix le niveau</option>
                                            <option value="BEPC">BEPC</option>
                                            <option value="Probatoire">Probatoire</option>
                                            <option value="Baccalaureat">Baccalaureat</option>
                                            <option value="Licence">Licence</option>
                                            <option value="Master">Master</option>
                                            <option value="Doctorat">Doctorat</option>
                                        </Form.Select>
                                        {errors.niveau?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Dernier diplome">
                                        <Form.Control type='text' {...register("diplome", { required: true })} defaultValue={props.data.dernDiplEns} />
                                        {errors.diplome?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-3 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Salaire">
                                        <Form.Control type='number' {...register("salaire", { required: true })} defaultValue={props.data.salaireEns} />
                                        {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <FloatingLabel controlId="floatingSelect" label="Type de contrat">
                                        <Form.Select aria-label="Floating label select example" {...register("typeContrat", { required: true })} defaultValue={props.data.typeContratEns}>
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
                                {/* </div> */}
                            </div>
                        </div>
                    </>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const Enseignant = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    const [ens, setens] = useState([])
    const [records, setRecords] = useState(ens)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['nivEtudEns', 'dernDiplEns','typeContratEns', 'nomEns','prenomEns'];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedNiveauEtude, setSelectedNiveauEtude] = useState('');
    const [selectedEns, setSelectedEns] = useState('');
    const [selectedTypeContratEns, setSelectedTypeContratEns] = useState('');
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

    async function getEnseignants() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/enseignants`);
            setens(response.data);
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
            getEnseignants()
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
        formData.append('nomEns', data.nom);
        formData.append('prenomEns', data.prenom);
        formData.append('emailEns', data.email);
        formData.append('dateNaisEns', data.dateNais);
        formData.append('cniEns', data.cni);
        formData.append('nivEtudeEns', data.niveau);
        formData.append('villeEns', data.ville);
        formData.append('paysEns', data.pays);
        formData.append('telEns', data.tel);
        formData.append('whatstappEns', data.what);
        formData.append('dernDiplEns', data.dernier);
        formData.append('genreEns', data.sexe);
        formData.append('photoProfilEns', data.photo[0]);
        formData.append('salaireEns', data.salaire);
        formData.append('typeContratEns', data.typeContrat);
        formData.append('formation_id', data.fil);
        formData.append('cour_id', data.cours);

        axios.post(`${import.meta.env.VITE_URL}/enseignants`,formData)
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

    const handleRestauresSelected = () => {
        if (selectedRecords.length === 0) {
            // Afficher un message d'erreur car rien n'est sélectionné
            return;
        }

        axios.put(`${import.meta.env.VITE_URL}/enseignant/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("Archivé !", "Les enseignants sélectionnés ont été archivé.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/enseignant/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les enseignants sélectionnés ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

// fonction pour supprimer un enseignant

    const delEnseignant = async (id) => {
        swal({
            title: "Êtes-vous certains de vouloir effectuer cette action ?",
            text: "Vous risquez de ne plus pouvoir restaurer cet enseignant !",
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
                    // Pour mettre à jour le champ 'supprimer' de l'enseignant en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/enseignant/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre enseignant a bien été supprimé.", "success");
                            // Rechargez la page après la suppression
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de l'enseignant en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/enseignant/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre enseignant a été marqué comme archivé.", "success");
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre enseignant n'a pas été modifié.", "info");
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    };

//Modifier les infos d'un enseignant

    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

//filtrer les enseignants

    const filterEnseignants = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchEns =
                selectedEns === '' ||
                (record.nomEns + ' ' + record.prenomEns) === selectedEns;
            const matchNiveauEtude =
                selectedNiveauEtude === '' || record.nivEtudeEns === selectedNiveauEtude;

            const matchTypeContratEns =
                selectedTypeContratEns === '' || record.typeContratEns === selectedTypeContratEns;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.created_at);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchEns && matchNiveauEtude && matchTypeContratEns && dateFilter;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterEnseignants()
    }, [selectedNiveauEtude, selectedTypeContratEns, selectedEns, startDate, endDate]);

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
                    <BarreLateraleEns/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Enseignant</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Enseignant</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des enseignants</h3>
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
                                                                                    <strong>Supprimer plusieurs enseignants</strong>.
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
                                                                                    <strong>Archiver plusieurs enseignants</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
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
                                                                            <span>Enseignant</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedEns} onChange={(e) => setSelectedEns(e.target.value)}>
                                                                                <option>Choisir l'enseignant</option>
                                                                                {
                                                                                    ens.length !== 0 && (
                                                                                        [...new Set(ens.map((element) => element.nomEns +' '+ element.prenomEns))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Niveau Etude</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedNiveauEtude} onChange={(e) => setSelectedNiveauEtude(e.target.value)}>
                                                                                <option>Choisir le niveau d'etude</option>
                                                                                {
                                                                                    ens.length !== 0 && (
                                                                                        [...new Set(ens.map((element) => element.nivEtudeEns))].map((nom, index) => {
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
                                                                            <Form.Select value={selectedTypeContratEns} onChange={(e) => setSelectedTypeContratEns(e.target.value)} aria-label="Default select example" className='mb-3'>
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
                                                                                        <strong>Créer un enseignant</strong>.
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
                                                                        <th>Nom </th>
                                                                        <th>Date Naissance </th>
                                                                        <th>Email</th>
                                                                        <th>Niveau</th>
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
                                                                                                                <strong>Voir enseignant</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' > <Link to={`/enseignant/voir_enseignant/${element.id}`}><FaEye className="text-warning" style={{ cursor:'pointer' }} /></Link></Button>
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
                                                                                                                <strong>Modifier enseignant</strong>.
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
                                                                                                                <strong>Supprimer enseignant</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delEnseignant(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td>{formatdate}</td>
                                                                                            <td key={index}>{element.nomEns +' '+element.prenomEns}</td>
                                                                                            <td key={index}>{element.dateNaisEns}</td>
                                                                                            <td key={index}>{element.emailEns}</td>
                                                                                            <td key={index}>{element.nivEtudeEns}</td>
                                                                                            <td key={index}>{element.typeContratEns}</td>
                                                                                            <td>
                                                                                                <img
                                                                                                    src={`http://localhost:8000/imagesEnseig/${element.photoProfilEns}`}
                                                                                                    //src={element.photoProfilEns}
                                                                                                    width='100%'
                                                                                                    height='50px'
                                                                                                    alt={'image-ens'}
                                                                                                />
                                                                                            </td>
                                                                                        </tr>
                                                                                        <MyVerticallyCenteredModal
                                                                                            show={(idL===element.id) && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            enseignant={ens}
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total d'enseignants : {total} </p>
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter un enseignant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className='fw-bold fs-5'>Informations sur le personnel</p>

                    <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                        <>
                            <div className="container">
                                <div className="row mb-3">

                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Nom">
                                            <Form.Control type='text' {...register("nom", { required: true, minLength:3 })} />
                                            {errors.nom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et doit avoir minimum 3 caractères</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Prénom">
                                            <Form.Control type='text' {...register("prenom", { required: true, minLength:3 })} />
                                            {errors.prenom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et doit avoir minimum 3 caractères</span>}
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
                                        <FloatingLabel controlId="floatingSelect" label="Numéro CNI">
                                            <Form.Control type='text' {...register("cni", { required: true })} />
                                            {errors.cni?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Ville">
                                            <Form.Control type='text' {...register("ville", { required: true })} />
                                            {errors.ville?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Pays">
                                            <Form.Control type='text' {...register("pays", { required: true })} />
                                            {errors.pays?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Numero téléphone">
                                            <Form.Control type='text' {...register("tel", { required: true })} />
                                            {errors.tel?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Numero Whatstapp">
                                            <Form.Control type='text' {...register("what", { required: true })} />
                                            {errors.what?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Genre de l'enseignant">
                                            <Form.Select aria-label="Floating label select example" {...register("sexe", { required: true })}>
                                                <option value="">Choix du sexe</option>
                                                <option value="Masculin">Masculin</option>
                                                <option value="Feminin">Feminin</option>
                                            </Form.Select>
                                            {errors.sexe?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Niveau d'etude">
                                            <Form.Select aria-label="Floating label select example" {...register("niveau", { required: true })}>
                                                <option value="">Choix le niveau</option>
                                                <option value="BEPC">BEPC</option>
                                                <option value="Probatoire">Probatoire</option>
                                                <option value="Baccalaureat">Baccalaureat</option>
                                                <option value="Licence">Licence</option>
                                                <option value="Master">Master</option>
                                                <option value="Doctorat">Doctorat</option>
                                            </Form.Select>
                                            {errors.niveau?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Dernier diplome">
                                            <Form.Control type='text' {...register("diplome", { required: true })} />
                                            {errors.diplome?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Salaire">
                                            <Form.Control type='number' {...register("salaire", { required: true })} />
                                            {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Filière">
                                            <Form.Select aria-label="Default select example" {...register("fil", { required: true })} className='mb-3'controlId="fil" >
                                                <option>Choisir la filière</option>

                                                {
                                                    Array.from(new Set(ens.map((element) => element.formation_id))).map((formationId, index) => (
                                                        <option key={index} value={formationId}>
                                                            {ens.find((element) => element.formation_id === formationId).nomForm}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Select>
                                            {errors.fil?.type==='required' && <span className='text-danger'>La filière est Obligatoire</span>}
                                        </FloatingLabel>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <FloatingLabel controlId="floatingSelect" label="Cours">
                                            <Form.Select aria-label="Default select example" {...register("cours", { required: true })} className='mb-3'controlId="fil" >
                                                <option>Choisir le cours</option>
                                                {
                                                    Array.from(new Set(ens.map((element) => element.cour_id))).map((courId, index) => (
                                                        <option key={index} value={courId}>
                                                            {ens.find((element) => element.cour_id === courId).nomCours}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Select>
                                            {errors.cours?.type==='required' && <span className='text-danger'>Le cours est Obligatoire</span>}
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

export default Enseignant;