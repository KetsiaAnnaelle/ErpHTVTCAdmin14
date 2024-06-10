import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowDownUp, BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaChevronLeft, FaChevronRight, FaEdit, FaEye, FaFilter, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import ReactLoading from "react-loading";

// fonction pour modifier une facture et affichant au prealable les anciennes iinformations de l'utilisateur

function MyVerticallyCenteredModal(props) {

    const history= useNavigate()
    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();
    // Utilisez watch pour obtenir les valeurs des champs
    const total = watch('total') || 0;
    const paye = watch('paye') || 0;
    const restant = total - paye;

    const dateActuelle = new Date()

    const updateFacture = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/facture/${props.data.id}`,{
            'total': data.total,
            'paye': data.paye,
            'restant': data.restant,
            'echeance': data.echeance,
            'status': data.status
        })
            .then(function (response) {
                console.log(response.data);
                swal({
                    title: "Modification Reussi !!!",
                    text: "Vous pouvez cliquer sur le bouton !",
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
                <Modal.Title id="contained-modal-title-vcenter"className='fw-4' >
                    Modifier une Facture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateFacture)}>
                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Total Facture</Form.Label>
                        <Form.Control type="number" {...register("total", { required: true, min:0 })} defaultValue={props.data.total}  />
                        {errors.total?.type==='required' && <span className='text-danger'>Le total est Obligatoire et ne peut pas être inférieur à 0</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Montant Payé</Form.Label>
                        <Form.Control type="number" {...register("paye", { required: true, min:0, max: register('total').value })}
                                      control={control}
                                      defaultValue={0} onChange={(e) => {
                            const newValue = parseFloat(e.target.value || 0);
                            setValue('paye', newValue); // Mettez à jour la valeur du champ "Montant Payé"
                            setValue('restant', total - newValue); // Mettez à jour la valeur du champ "Montant Restant"
                        }}
                                      onBlur={(e) => {
                                          const newValue = parseFloat(e.target.value || 0);
                                          setValue('paye', newValue); // Mettez à jour la valeur du champ "Montant Payé"
                                          setValue('restant', total - newValue); // Mettez à jour la valeur du champ "Montant Restant"
                                      }}
                        />
                        {errors.paye?.type==='required' && <span className='text-danger'>Le montant payé est Obligatoire et doit être supérieur à 0 et supérieur au total</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Montant Restant</Form.Label>
                        <Form.Control type="number" {...register("restant", { required: true, min:0 })} readOnly value={restant} />
                        {errors.restant?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et ne peut pas être inférieur à 0</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Echéance</Form.Label>
                        <Form.Control type="date" {...register("echeance", { required: true,
                            validate:(value) => new Date(value) > dateActuelle})} defaultValue={props.data.echeance} />
                        {errors.echeance?.type==='required' && <span className='text-danger'>La date d'échéance est Obligatoire et doit être supérieure à la date d'aujourd'hui</span>}
                    </Form.Group>
                    <Form.Select aria-label="Default select example" {...register("status", { required: true })} defaultValue={props.data.status} className='mb-3'controlId="" >
                        <option>Choisir le Statut</option>
                        <option value="Réglé">Réglé</option>
                        <option value="Partiellement Réglé">Partiellement Réglé</option>
                        <option value="Rembourssement">Remboursement</option>
                        <option value="Brouillon">Brouillon</option>
                    </Form.Select>
                    {errors.status?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}
                    <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Modifier</Button>{' '}</center>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const Fact = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);

    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
        selectedFormation: 'Choisir la filière',
        selectedEtudiant: 'Choisir l\'étudiant',
        selectedstatus: 'Choisir le statut',
        echeanceDate: 'Choisir l\'echeance'
    });

    const [fact, setfact] = useState([])
    const [filiere, setfiliere] = useState([])
    const [etudiant, setetudiant] = useState([])
    const [records, setRecords] = useState(fact)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['echeance', 'status','nomEtud', 'nomForm'];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedFormation, setSelectedFormation] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState('');
    const [selectedstatus, setSelectedstatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [echeanceDate, setecheanceDate] = useState('');

    const [seRecords, setSeRecords] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [selectedFiliere, setSelectedFiliere] = useState('');
    const [selectedStudent,setSelectedStudent]=useState([])
    const [allStudents, setAllStudents] = useState([]);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let totals=0
    let payee=0
    let reste=0

    const value = 0

    // Utilisez watch pour obtenir les valeurs des champs
    const total = watch('total') || 0;
    const paye = watch('paye') || 0;
    const restant = total - paye;

    const dateActuelle = new Date()

    // fonction pour lister les factures

    async function getFactures() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/factures`);
            setfact(response.data);
            setRecords(response.data);
            setparams(response.data);
            setSeRecords(response.data)
            setAllStudents(response.data)
            // console.log(response.data)
            setload(false)
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

    async function getEtudiants(){
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`);
            setetudiant(response.data);
            // console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

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
        if (!load===true){
            getFactures()
            getFiliere()
            getEtudiants()
        }
    },[fresh])

    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }

    }, [fresh])

    // fonction pour créer une facture

    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('etudiant_id', data.nom);
        formData.append('formation_id', data.fil);
        formData.append('total', data.total);
        formData.append('paye', data.paye);
        formData.append('restant', data.restant);
        formData.append('echeance', data.echeance);
        formData.append('status', data.status);

        const selectedEtudiant = etudiant.find(etud => etud.nomEtud + ' ' + etud.prenomEtud === data.nom);
        // console.log(selectedEtudiant)
        if (!selectedEtudiant) {
            // Gérer le cas où l'étudiant n'est pas trouvé
            alert("Étudiant non trouvé");
            return;
        }

        formData.append('etudiant_id', selectedEtudiant.id);

        axios.post(`${import.meta.env.VITE_URL}/factures`,formData)
            .then(function (response) {
                console.log(response.data);
                JSON.stringify(response.data)
                setShow(false)
                setdone(true)

                swal({
                    title: "Ajouté Avec Succès !!!",
                    text: "Vous pouvez cliquer sur le bouton !",
                    icon: "success",
                    button: "OK",
                    timer: 2000
                });
                 window.location.reload()
                // getFactures()
                // setRecords(response.data)

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

    // fonction pour selectionner plusieurs cases à la fois

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

    // fonction pour supprimer plusieurs factures

    const handleDeleteSelected = () => {
        console.log(check)
        if (check.length==0 || selectedRecords.length==0){
            // swal({
            //     text: "Sélectionnez au moins une facture !!!",
            //     icon: "info",
            //     button: "OK",
            //     timer: 10000
            // });
        }else {
            axios.post(`${import.meta.env.VITE_URL}/facture/element`, {
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

        axios.put(`${import.meta.env.VITE_URL}/facture/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("Archivé !", "Les factures sélectionnées ont été archvé.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/facture/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les factures sélectionnées ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    // fonction pour supprimer une facture

    const delFacture = async (id) => {
        swal({
            title: "Êtes-vous certains de vouloir effectué cette action ?",
            text: "Vous risquez de ne plus pouvoir restauré cette facture !",
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
                    // Pour mettre à jour le champ 'supprimer' de l'facture en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/facture/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre facture a bien été supprimé.", "success");
                            // Rechargez la page après la suppression
                            console.log(response);
                            getFactures()
                            setfact(fact)
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de l'facture en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/facture/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre facture a été marqué comme archivée.", "success");
                            getFactures()
                            setfact(fact)
                            console.log(response);
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre abscence n'a pas été modifié.", "info");
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    };

    //Modifier les infos d'une facture

    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    //filtrer les factures

    const filterFactures = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchEtudiant =
                selectedEtudiant === '' ||
                (record.nomEtud + ' ' + record.prenomEtud) === selectedEtudiant;
            const matchFormation =
                selectedFormation === '' || record.nomForm === selectedFormation;
            const matchStatus =
                selectedstatus === '' || record.status === selectedstatus;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.echeance);
            const recordDateEcheance = new Date(record.echeance);
            // console.log(recordDateEcheance)

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            const dateFilterEcheance =
                (!echeanceDate || recordDateEcheance >= new Date(echeanceDate)) &&
                (!echeanceDate || recordDateEcheance <= new Date(echeanceDate));

            // Combinez toutes les conditions de filtrage
            return matchEtudiant && matchFormation && dateFilter && dateFilterEcheance && matchStatus;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterFactures();
    }, [selectedEtudiant, selectedFormation, startDate, endDate, echeanceDate, selectedstatus]);

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
            selectedstatus,
            echeanceDate
        });

        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate(initialFilters.startDate);
        setEndDate(initialFilters.endDate);
        setSelectedFormation(initialFilters.selectedFormation);
        setSelectedEtudiant(initialFilters.selectedEtudiant);
        setSelectedstatus(initialFilters.selectedstatus);
        setecheanceDate(initialFilters.echeanceDate);
    };

    function TrieDateDescendant() {
        let t = fact;
        if (isAsc === false) {
            
            t.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
            // console.log(t);
        }else{
            t.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        }
        setisAsc(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setfact(t)
    }

    const [isCrois, setisCrois] = useState(false)
    const [isAsc, setisAsc] = useState(false)
    const [isAscForm, setisAscForm] = useState(false)

    function TrieNom() {
        let t = fact;
        console.log(t);     
        if (isCrois === false) {
            
            t.sort((a,b) => a.nomEtud.localeCompare(b.nomEtud)) //tri croissant
            // console.log(t);
        }else{
            t.sort((a,b) => b.nomEtud.localeCompare(a.nomEtud))
        }
        setisCrois(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setfact(t)
    }

    function TrieForm() {
        let t = fact;
        console.log(t);     
        if (isAscForm === false) {
            
            t.sort((a,b) => a.nomForm.localeCompare(b.nomForm)) //tri croissant
            // console.log(t);
        }else{
            t.sort((a,b) => b.nomForm.localeCompare(a.nomForm))
        }
        setisAscForm(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setfact(t)
    }


    useEffect(() => {
        setfact(fact)
    }, [isCrois,isAsc,isAscForm])

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
                            <h1>Factures</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Factures</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Listes des factures</h3>
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
                                                                                    <strong>Supprimer plusieurs factures</strong>.
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
                                                                                    <strong>Archiver plusieurs factures</strong>.
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
                                                                                    <strong>Filtrer les factures</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3 border-0' onClick={handleShowFilter} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaFilter className="text-primary" size={24} style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Voir archive facture</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Link variant="transparent" to={'/fact/fact_archiver'} className='btn btn-transparent'>Archives</Link>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Voir corbeille facture</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Link to={'/fact/fact_supprimer'}  className='btn btn-transparent'>Corbeille</Link>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                <Row className='d-flex justify-content-center'>

                                                                    <Modal
                                                                        show={showFilter}
                                                                        onHide={handleCloseFilter}
                                                                        backdrop="static"
                                                                        keyboard={false}
                                                                    >
                                                                        <Modal.Header closeButton>
                                                                            <Modal.Title>Filtre</Modal.Title>
                                                                        </Modal.Header>

                                                                        <Modal.Body>
                                                                            <Form>
                                                                                <Row className='d-flex justify-content-center'>

                                                                                    <Col className='col-md-4'>
                                                                                        <Form.Group className="mb-3" controlId="dateDeb">
                                                                                            <span>Periode de</span>
                                                                                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    <Col className='col-md-4'>
                                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                                            <span>à</span>
                                                                                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    <Col className='col-md-4'>
                                                                                        <span>Filière</span>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
                                                                                            <option>Choisir la filière</option>
                                                                                            {
                                                                                                fact.length !== 0 && (
                                                                                                    [...new Set(fact.map((element) => element.nomForm))].map((nom, index) => {
                                                                                                        return (
                                                                                                            <option key={index} value={nom}>{nom}</option>
                                                                                                        );
                                                                                                    })
                                                                                                )
                                                                                            }
                                                                                        </Form.Select>
                                                                                    </Col>
                                                                                    <Col className='col-md-4'>
                                                                                        <span>Etudiant</span>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)}>
                                                                                            <option>Choisir l'étudiant</option>
                                                                                            {
                                                                                                fact.length !== 0 && (
                                                                                                    [...new Set(fact.map((element) => element.nomEtud+' '+element.prenomEtud))].map((nom, index) => {
                                                                                                        return (
                                                                                                            <option key={index} value={nom}>{nom}</option>
                                                                                                        );
                                                                                                    })
                                                                                                )
                                                                                            }
                                                                                        </Form.Select>
                                                                                    </Col>
                                                                                    <Col className='col-md-4'>
                                                                                        <span>Echéance</span>
                                                                                        <Form.Group className="mb-3" >
                                                                                            <Form.Control type="date"  value={echeanceDate} onChange={(e) => setecheanceDate(e.target.value)}/>
                                                                                        </Form.Group>
                                                                                    </Col>
                                                                                    <Col className='col-md-4'>
                                                                                        <span>Statut</span>
                                                                                        <Form.Select value={selectedstatus} onChange={(e) => setSelectedstatus(e.target.value)} aria-label="Default select example" className='mb-3'>
                                                                                            <option>Choisir le statut</option>
                                                                                            <option value="Réglé">Réglé</option>
                                                                                            <option value="Partiellement Réglé">Partiellement Réglé</option>
                                                                                            <option value="Rembourssement">Rembourssement</option>
                                                                                            <option value="Brouillon">Brouillon</option>

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
                                                                                        <strong>Créer une facture</strong>.
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
                                                                        <th>Date <BsArrowDownUp className='fw-bold ms-1'onClick={TrieDateDescendant} style={{ cursor:'pointer' }}/></th>
                                                                        <th>Etudiant <BsArrowDownUp className='fw-bold ms-1' onClick={TrieNom} style={{ cursor:'pointer' }}/></th>
                                                                        <th>Filière <BsArrowDownUp className='fw-bold ms-1' onClick={TrieForm} style={{ cursor:'pointer' }}/></th>
                                                                        <th>Total</th>
                                                                        <th>Payer</th>
                                                                        <th>Restant</th>
                                                                        <th>Echeance</th>
                                                                        <th>Statut</th>
                                                                        <th></th>
                                                                        <th></th>
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
                                                                        displayedRecords.filter((element) =>
                                                                            keys.some((key) => {
                                                                                const value = element[key];
                                                                                if (typeof value === 'string') {
                                                                                    return value.includes(searchQuery);
                                                                                }
                                                                                return false;
                                                                            })
                                                                        ).map((element,index) => {
                                                                            totals=totals+element.total
                                                                            payee=payee+element.paye
                                                                            reste=reste+element.restant
                                                                            const isChecked = selectedRecords.includes(element.id);
                                                                            const createdDate = new Date(element.created_at);
                                                                            const formatdate = createdDate.toISOString();
                                                                            const formatdateString = createdDate.toLocaleDateString();
                                                                            

                                                                            const EcheanceDate = new Date(element.echeance);
                                                                            const EcheanceDateFormat = EcheanceDate.toISOString();

                                                                            function joursRestantsAvantDate(datePaiementActuel, dateEcheance) {
                                                                                // Convertir les chaînes de date en objets Date
                                                                                const datePaiement = new Date(datePaiementActuel);
                                                                                const echeance = new Date(dateEcheance);
                                                                                
                                                                                // Calculer la différence en millisecondes entre la date de paiement et la date d'échéance
                                                                                const differenceEnMs = echeance - datePaiement;

                                                                                let joursInitial
                                                                                
                                                                                // Obtenir la date d'aujourd'hui
                                                                                const aujourdHui = new Date();
                                                                                const differenceDatePaieVsToday = datePaiement- aujourdHui
                                                                                
                                                                                // Calculer la différence en millisecondes entre aujourd'hui et la date d'échéance
                                                                                const differenceJusqueEcheance = echeance - aujourdHui;
                                                                                // console.log(echeance);

                                                                                if (differenceDatePaieVsToday == 0) {
                                                                                    // Obtenir le nombre initial de jours entre la date de paiement et la date d'échéance
                                                                                    joursInitial = Math.ceil(Math.abs(differenceEnMs) / (1000 * 60 * 60 * 24));
                                                                                }else if (differenceDatePaieVsToday <0) {
                                                                                    // Obtenir le nombre initial de jours entre la date d'aujourd'hui et la date d'échéance
                                                                                    joursInitial = Math.ceil(Math.abs(differenceJusqueEcheance) / (1000 * 60 * 60 * 24));
                                                                                    
                                                                                }
                                                                                
                                                                                 // Comparer les années, mois et jours pour voir si la date d'échéance est aujourd'hui
                                                                                if (echeance.getFullYear() === aujourdHui.getFullYear() &&
                                                                                    echeance.getMonth() === aujourdHui.getMonth() &&
                                                                                    echeance.getDate() === aujourdHui.getDate()) {
                                                                                    return (<span style={{ color: 'orange' }}>Aujourd'hui</span>);
                                                                                }
                                                                                // Si la date d'échéance est déjà passée
                                                                               

                                                                                 // Comparer les années, mois et jours pour voir si la date d'échéance est hier
                                                                                if (echeance.getFullYear() === aujourdHui.getFullYear() &&
                                                                                    echeance.getMonth() === aujourdHui.getMonth() &&
                                                                                    echeance.getDate() === aujourdHui.getDate() - 1) {
                                                                                    return (<span style={{ color: 'blue' }}>Hier</span>);
                                                                                } 
                                                                                
                                                                                if (differenceJusqueEcheance < 0) {
                                                                                    // Calculer le nombre de jours passés
                                                                                    const joursPasse = Math.ceil(Math.abs(differenceJusqueEcheance) / (1000 * 60 * 60 * 24));
                                                                                    
                                                                                    return (<span style={{ color: 'red' }}>Il y a {joursPasse} jours</span>);
                                                                                } 

                                                                                else {
                                                                                    // Initialiser le nombre de jours restants
                                                                                    let joursRestants = joursInitial;
                                                                                    
                                                                                    // Tant que la date d'aujourd'hui est inférieure à la date d'échéance
                                                                                    while (aujourdHui < echeance) {
                                                                                        // Diminuer le nombre de jours restants
                                                                                        joursRestants
                                                                                        
                                                                                        // Avancer d'un jour
                                                                                        aujourdHui.setDate(aujourdHui.getDate() + 1);
                                                                                    }
                                                                            
                                                                                    return (<span style={{ color: 'green' }}> Il reste {joursInitial} jours </span>);
                                                                                }
                                                                            }

                                                                            
                                                                            // Exemple d'utilisation de la fonction
                                                                            const datePaiementActuel = '2024-02-14';
                                                                            const dateEcheance = '2024-02-29';
                                                                            
                                                                            // Initialiser la dernière date avec la date d'aujourd'hui
                                                                            joursRestantsAvantDate.dernierJour = new Date();
                                                                            
                                                                            // console.log(joursRestantsAvantDate(datePaiementActuel, dateEcheance));
                                                                            


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
                                                                                                            <strong>Voir facture</strong>.
                                                                                                        </Tooltip>
                                                                                                    }
                                                                                                >
                                                                                                    <Button variant="transparent" className='mb-3 ms-3' >  <Link to={`/fact/detail_facture/${element.etudiant_id}`}><FaEye className="text-warning" style={{ cursor:'pointer' }} /></Link></Button>
                                                                                                </OverlayTrigger>
                                                                                            ))}
                                                                                        </td>
                                                                                        <td>{formatdateString}</td>
                                                                                        <td>{element.nomEtud+' '+element.prenomEtud}</td>
                                                                                        <td>{element.nomForm}</td>
                                                                                        <td>{element.total}</td>
                                                                                        <td>{element.paye}</td>
                                                                                        <td>{element.restant}</td>
                                                                                        <td className="fw-bold">{joursRestantsAvantDate(formatdate, EcheanceDateFormat)}</td>
                                                                                        <td>{element.status}</td>
                                                                                        <td>
                                                                                            {['bottom'].map((placement) => (
                                                                                                <OverlayTrigger
                                                                                                    key={placement}
                                                                                                    placement={placement}
                                                                                                    overlay={
                                                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                                                            <strong>Modifier facture</strong>.
                                                                                                        </Tooltip>
                                                                                                    }
                                                                                                >
                                                                                                    <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleMan(element)} ><FaEdit className='text-primary me-1'  style={{ cursor:'pointer' }}/></Button>
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
                                                                                                            <strong>Supprimer facture</strong>.
                                                                                                        </Tooltip>
                                                                                                    }
                                                                                                >
                                                                                                    <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delFacture(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                </OverlayTrigger>
                                                                                            ))}
                                                                                        </td>
                                                                                    </tr>
                                                                                    <MyVerticallyCenteredModal
                                                                                        show={(idL===element.id) && modalShow}
                                                                                        onHide={() => setModalShow(false)}
                                                                                        data={params}
                                                                                        facture={fact}
                                                                                        // etudiant={etudiant}
                                                                                        // filiere={filiere}
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
                                                <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures : <span className='text-primary'>{totals}</span>  FCFA </p>
                                                <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures payé : <span className='text-success'>{payee}</span>  FCFA </p>
                                                <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures restant : <span className='text-danger'>{reste}</span>  FCFA </p>
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une Facture</Modal.Title>
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
                        
                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Total Facture</Form.Label>
                            <Form.Control type="number" {...register("total", { required: true, min:0 })}  />
                            {errors.total?.type==='required' && <span className='text-danger'>Le total est Obligatoire et ne peut pas être inférieur à 0</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Montant Payé</Form.Label>
                            <Form.Control type="number" {...register("paye", { required: true, min:0, max: register('total').value })}
                                          control={control}
                                          defaultValue={0} onChange={(e) => {
                                const newValue = parseFloat(e.target.value || 0);
                                setValue('paye', newValue); // Mettez à jour la valeur du champ "Montant Payé"
                                setValue('restant', total - newValue); // Mettez à jour la valeur du champ "Montant Restant"
                            }}
                                          onBlur={(e) => {
                                              const newValue = parseFloat(e.target.value || 0);
                                              setValue('paye', newValue); // Mettez à jour la valeur du champ "Montant Payé"
                                              setValue('restant', total - newValue); // Mettez à jour la valeur du champ "Montant Restant"
                                          }}
                            />
                            {errors.paye?.type==='required' && <span className='text-danger'>Le montant payé est Obligatoire et doit être supérieur à 0 et supérieur au total</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Montant Restant</Form.Label>
                            <Form.Control type="number" {...register("restant", { required: true, min:0 })} readOnly value={restant} />
                            {errors.restant?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire et ne peut pas être inférieur à 0</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Echéance</Form.Label>
                            <Form.Control type="date" {...register("echeance", { required: true,
                                validate:(value) => new Date(value) > dateActuelle})} />
                            {errors.echeance?.type==='required' && <span className='text-danger'>La date d'échéance est Obligatoire et doit être supérieure à la date d'aujourd'hui</span>}
                        </Form.Group>
                        <Form.Select
                            aria-label="Default select example"
                            {...register("status", { required: true })}
                            className='mb-3'
                            controlId=""
                            >
                            <option>Choisir le Statut</option>
                            {restant > 0 ? (
                                <>
                                <option value="Partiellement Réglé">Partiellement Réglé</option>
                                <option value="Remboursement">Remboursement</option>
                                <option value="Brouillon">Brouillon</option>
                                </>
                            ) : (
                                <>
                                <option value="Réglé">Réglé</option>
                                <option value="Remboursement">Remboursement</option>
                                <option value="Brouillon">Brouillon</option>
                                </>
                            )}
                        </Form.Select>
                        {errors.status?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}
                        <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Créer</Button>{' '}</center>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Fact;