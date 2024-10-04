 import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import { Col, Container, Row, Button, Modal, Form, Table, OverlayTrigger, Tooltip, Nav } from 'react-bootstrap';
import React, { useState, useEffect, Component } from 'react';
import { useForm } from "react-hook-form";
import {Link, NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import { BsArrowDownUp, BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaFileArchive, FaFilter, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading';



// fonction pour modifier une abscence et affichant au prealable les anciennes informations de l'utilisateur

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()

    console.log(props.data.id);

    const updateAbscence = async (data) => {

    await axios.post(`http://localhost:8000/api/abscence/${props.data.id}`,{
       'dateAbsc': data.date,
        'nbreHeureAbs': data.nbre,
        'typeAbs': data.typ,
        'motifAbs': data.motif
    })
        .then(function (response) {
            // console.log(response.data);
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
            // console.log(error);
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
                    Modifier une Absence
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateAbscence)}>
                    <Form.Group className="mb-3" controlId="dateAbsc" >
                        <Form.Label>Date du Cours</Form.Label>
                        <Form.Control type="date" {...register("date", { required: true })} defaultValue={props.data.dateAbsc} />
                        {errors.date?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateAbsc" >
                        <Form.Label>Nombre d'heure d'absence</Form.Label>
                        <Form.Control type="text" {...register("nbre", { required: true, max: 20, min:0 })} defaultValue={props.data.nbreHeureAbs} />
                        {errors.nbre?.type==='required' && <span className='text-danger'>Le nombre d'heures est Obligatoire et doit être compris entre 0 et 20</span>}
                    </Form.Group>
                    <Form.Select aria-label="Default select example" {...register("typ", { required: true })} className='mb-3'controlId="typeAbsc" defaultValue={props.data.typeAbs} >
                        <option>Choisir le type d'absence</option>
                        <option value="Absence Justifiée">Absence Justifiée</option>
                        <option value="Absence Non Justifiée">Absence Non Justifiée</option>
                    </Form.Select>
                    {errors.typ?.type==='required' && <span className='text-danger'>Le type d'absence est Obligatoire</span>}
                    <Form.Group className="mb-3" controlId="motifAbsc" >
                        <Form.Label>Motif</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("motif", { required: false })} defaultValue={props.data.motifAbs} />
                        {errors.motif?.type==='required' && <span className='text-danger'>Le motif est Obligatoire et doit avoir au mons 10 caractères</span>}
                    </Form.Group>
                    <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Modifier</Button>{' '}</center>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


const EtudAbsc = () => {

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
});

const history=useNavigate()

const [absc, setabsc] = useState([])
const [form, setform] = useState([])
const [etud, setetud] = useState([])
const [etudiant, setetudiant] = useState([])
const [cours, setcours] = useState([])
const [records, setRecords] = useState(absc)

const [params, setparams] = useState([])
const [modalShow, setModalShow] = React.useState(false);
const [idL, setidL] = useState(0)

const [searchQuery, setSearchQuery] = useState('');
const keys=['typeAbs', 'motifAbs','dateAbs', 'nomEtud', 'nomForm', 'nomCours'];

const [selectedFormation, setSelectedFormation] = useState('');
const [selectedEtudiant, setSelectedEtudiant] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');

const [seRecords, setSeRecords] = useState([]);
const [selectedRecords, setSelectedRecords] = useState([]);

const [check, setcheck] = useState([]);
const [checkAll, setcheckAll] = useState(false);

const [pageNumber, setPageNumber] = useState(0);
const perPage = 20; // Nombre d'éléments par page

let total=0

const [searchTerm, setSearchTerm] = useState('');
const [nomForm, setNomForm] = useState('');

// fonction pour lister les abscences

async function getAbscences() {
    try {
        setload(true)
        const response = await axios.get(`${import.meta.env.VITE_URL}/abscences`);
        setabsc(response.data);
        setRecords(response.data);
        setparams(response.data);
        setSeRecords(response.data)
        setload(false)
        // console.log(response.data)
        //setSelectedRecords(response.data)
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

// async function getEtudiants(){
//     try {
//         const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`);
//         setetudiant(response.data);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }


useEffect(() => {
    if (params.length!==0) {
        setModalShow(true)
    }

}, [fresh])

// fonction pour créer une abscence

const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('formation_id', data.fil);
    formData.append('cour_id', data.cour);
    formData.append('dateAbs', data.date);
    formData.append('nbreHeureAbs', data.nbre);
    formData.append('typeAbs', data.typ);
    formData.append('motifAbs', data.motif);
    
    const selectedEtudiant = etudiant.find(etud => etud.nomEtud + ' ' + etud.prenomEtud === data.nom);
    console.log(selectedEtudiant)
    if (!selectedEtudiant) {
        // Gérer le cas où l'étudiant n'est pas trouvé
        console.error("Étudiant non trouvé");
        return;
    }

    formData.append('etudiant_id', selectedEtudiant.id);

    axios.post(`${import.meta.env.VITE_URL}/abscences`,formData)
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
            getAbscences()
            setabsc(absc)
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
    // console.log(check)
    if (check.length==0 || selectedRecords.length==0){
        // swal({
        //     text: "Sélectionnez au moins une abscence !!!",
        //     icon: "info",
        //     button: "OK",
        //     timer: 10000
        // });
    }else {
        axios.post(`${import.meta.env.VITE_URL}/abscence/element`, {
            data: selectedRecords,
        })
            .then(function (response) {
                // console.log(response.data);
            })
            .catch(function (error) {
                // console.log(error);
            });
    }
};

const handleRestauresSelected = () => {
    if (selectedRecords.length === 0) {
        // Afficher un message d'erreur car rien n'est sélectionné
        return;
    }

    axios.put(`${import.meta.env.VITE_URL}/abscence/elementRestaures`, { ids: selectedRecords })
        .then(function (response) {
            swal("Archiver !", "Les absences sélectionnées ont été archivé.", "success");
            getAbscences()
            setabsc(absc)
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

    axios.put(`${import.meta.env.VITE_URL}/abscence/elementSupprime`, { ids: selectedRecords })
        .then(function (response) {
            swal("Supprimées !", "Les absences sélectionnées ont été supprimé.", "success");
            getAbscences()
            setabsc(absc)
        })
        .catch(function (error) {
            console.error(error);
        });
};

// fonction pour supprimer une abscence

const delAbscence = async (id) => {
    swal({
        title: "Êtes-vous certains de vouloir effectué cette action ?",
        text: "Vous risquez de ne plus pouvoir restauré cette abscence !",
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
                    .put(`${import.meta.env.VITE_URL}/abscence/${id}/supprimer`, { supprimer: 1 })
                    .then(function(response) {
                        swal("Supprimé!", "Votre abscence a bien été supprimé.", "success");
                        // Rechargez la page après la suppression
                        getAbscences()
                        setabsc(absc)
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            } else if (value === "archiver") {
                // Pour mettre à jour le champ 'archiver' de l'abscence en le mettant à 1
                axios
                    .put(`${import.meta.env.VITE_URL}/abscence/${id}/archiver`, { archiver: 1 })
                    .then(function(response) {
                        swal("Archivé!", "Votre abscence a été marqué comme archivée.", "success");
                        getAbscences()
                        setabsc(absc)
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

//Modifier les infos d'une abscence

function handleMan(element) {
    setidL(element.id)
    setparams(element)
    setModalShow(true)
}

//filtrer les abscences

const filterAbsences = () => {
    const filteredRecords = seRecords.filter((record) => {
        const matchEtudiant =
            selectedEtudiant === '' ||
            (record.nomEtud + ' ' + record.prenomEtud) === selectedEtudiant;
        const matchFormation =
            selectedFormation === '' || record.nomForm === selectedFormation;

        // Obtenez la date de l'enregistrement sous forme de date JavaScript
        const recordDate = new Date(record.dateAbs);

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
    filterAbsences();
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

    const handleShowFilter = () => {
        // Sauvegarde des valeurs actuelles des filtres dans initialFilters
        setInitialFilters({
            startDate,
            endDate,
            selectedFormation,
            selectedEtudiant,
        });

        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate(initialFilters.startDate);
        setEndDate(initialFilters.endDate);
        setSelectedFormation(initialFilters.selectedFormation);
        setSelectedEtudiant(initialFilters.selectedEtudiant);
    };

    const handleFiliereChange = async (e) => {
        const selectedFiliereId = e.target.value;

        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/cours/${selectedFiliereId}`);
            setcours(response.data);
            // console.log(response.data[0].nomForm)
            setNomForm(response.data[0].nomForm);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCoursChange = async (e) => {
    const selectedCoursId = e.target.value;

    try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/students/${nomForm}`);
        setetudiant(response.data);
        // console.log(response.data)
    } catch (error) {
        console.error(error);
    }
}

    useEffect(() => {
        if (!load===true){
            getAbscences()
            getFormation()
            // getEtudiants()
        }
    },[fresh])

    const [isCrois, setisCrois] = useState(false)
    const [isAsc, setisAsc] = useState(false)

    function TrieDateDescendant() {
        let t = absc;
        if (isAsc === false) {
            
            t.sort((a,b) => new Date(a.dateAbs) - new Date(b.dateAbs))
            // console.log(t);
        }else{
            t.sort((a,b) => new Date(b.dateAbs) - new Date(a.dateAbs))
        }
        setisAsc(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setabsc(t)
    }


    function TrieNom() {
        let t = absc;
        // console.log(t);     
        if (isCrois === false) {
            
            t.sort((a,b) => a.nomEtud.localeCompare(b.nomEtud)) //tri croissant
            // console.log(t);
        }else{
            t.sort((a,b) => b.nomEtud.localeCompare(a.nomEtud))
        }
        setisCrois(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setabsc(t)
    }

    useEffect(() => {
        setabsc(absc)
    }, [isCrois,isAsc])
    

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
                    <h1>Absences</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                            <li className="breadcrumb-item active">Absences</li>
                        </ol>
                    </nav>
                </div>

                <section className="section form">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Liste des absences</h3>
                                    </div>
                                    <div className="card-body">
                                        <Form className='d-flex justify-content-center my-3' >
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
                                                            <strong>Supprimer plusieurs abscences</strong>.
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
                                                            <strong>Archiver plusieurs abscences</strong>.
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
                                                            <strong>Filtrer les absences</strong>.
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
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Filtre</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    <Form>
                                                        <Row className='d-flex justify-content-center'>

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
                                                                        absc.length !== 0 && (
                                                                            [...new Set(absc.map((element) => element.nomForm))].map((nom, index) => {
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
                                                                        absc.length !== 0 && (
                                                                            [...new Set(absc.map((element) => element.nomEtud +' '+ element.prenomEtud))].map((nom, index) => {
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
                                                                <strong>Créer une abscence</strong>.
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
                                            <tr style={{backgroundColor: '#1A3C30'}} className='w-100'>
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
                                                <th>Date <BsArrowDownUp className='fw-bold ms-1'onClick={TrieDateDescendant} style={{ cursor:'pointer' }}/></th>
                                                <th>Etudiant <BsArrowDownUp className='fw-bold ms-1' onClick={TrieNom} style={{ cursor:'pointer' }}/></th>
                                                <th>Filière</th>
                                                <th>Cours</th>
                                                <th>Heure(s)</th>
                                                <th>Etat</th>
                                                <th>Motif</th>
                                                
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
                                                        total=total+element.nbreHeureAbs
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
                                                                                        <strong>Modifier abscence</strong>.
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
                                                                                        <strong>Supprimer abscence</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delAbscence(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} onClick={()=>delAbscence(element.id)}/></Button>
                                                                            </OverlayTrigger>
                                                                        ))}
                                                                    </td>
                                                                    <td>{element.dateAbs}</td>
                                                                    <td key={index}>{element.nomEtud +' '+element.prenomEtud}</td>
                                                                    <td key={index}>{element.nomForm}</td>
                                                                    <td key={index}>{element.nomCours}</td>
                                                                    <td>{element.nbreHeureAbs}</td>
                                                                    <td>{element.typeAbs}</td>
                                                                    <td>{element.motifAbs}</td>
                                                                    

                                                                </tr>
                                                                <MyVerticallyCenteredModal
                                                                    show={(idL===element.id) && modalShow}
                                                                    onHide={() => setModalShow(false)}
                                                                    data={params}
                                                                    absence={absc}
                                                                />

                                                            </>

                                                        )
                                                    })
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="card-footer">
                                        <p className='text-danger fs-4 fw-3 mt-3'>Total heure d'abscence : {total} </p>
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
        <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une Abscence</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {
            done && <div className="alert alert-success">Abscence cree avec succes!!!</div>
        }
        <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
            <Form.Select aria-label="Default select example" {...register("fil", { required: true })} className='mb-3'controlId="fil" onChange={(e) => handleFiliereChange(e)} >
                <option>Choisir la filière</option>

                {
                    form.map((element) =>{
                        return(
                            <option key={element.id} value={element.id}>{element.nomForm}</option>
                        )
                    })
                }
            </Form.Select>
            {errors.fil?.type === 'required' && <span className='text-danger'>La filière est Obligatoire</span>}

            <Form.Select aria-label="Default select example" {...register("cour", { required: true })} className='mb-3' controlId="cour" onChange={(e) => handleCoursChange(e)}>
                <option>Choisir le cours</option>
                {
                    cours.map((element) => {
                        return (
                            <option key={element.id} value={element.id}>{element.nomCours}</option>
                        )
                    })
                }
            </Form.Select>
            {errors.cour?.type === 'required' && <span className='text-danger'>Le cours est Obligatoire</span>}
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
                        <option key={index} value={element.nomEtud + ' ' + element.prenomEtud} data-id={element.id} />
                    ))
                )}
            </datalist>
            {errors.nom?.type === 'required' && <span className='text-danger'>Le nom est Obligatoire</span>}
            <Form.Group className="mb-3" controlId="dateAbsc" >
                <Form.Label>Date du Cours</Form.Label>
                <Form.Control type="date" {...register("date", { required: true })} />
                {errors.date?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="dateAbsc" >
                <Form.Label>Nombre d'heure d'absence</Form.Label>
                <Form.Control type="text" {...register("nbre", { required: true, max: 20, min:0 })} />
                {errors.nbre?.type==='required' && <span className='text-danger'>Le nombre d'heures est Obligatoire et doit être compris entre 0 et 20</span>}
            </Form.Group>
            <Form.Select aria-label="Default select example" {...register("typ", { required: true })} className='mb-3'controlId="typeAbsc" >
                <option>Choisir le type d'absence</option>
                <option value="Absence Justifiée">Absence Justifiée</option>
                <option value="Absence Non Justifiée">Absence Non Justifiée</option>
            </Form.Select>
            {errors.typ?.type==='required' && <span className='text-danger'>Le type d'absence est Obligatoire</span>}
            <Form.Group className="mb-3" controlId="projet" >
                <Form.Label>Motif</Form.Label>
                <Form.Control as="textarea" rows={3} {...register("motif", { required: false })} />
                {errors.motif?.type==='required' && <span className='text-danger'>Le motif est Obligatoire et doit avoir au moins 10 caractères</span>}
            </Form.Group>
            <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
        </Form>
    </Modal.Body>
    </Modal>

</Container>

);
};

export default EtudAbsc;