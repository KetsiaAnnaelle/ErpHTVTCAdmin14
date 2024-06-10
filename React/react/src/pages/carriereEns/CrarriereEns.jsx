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
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()
    console.log(props.data.id)
    const updateCarriere = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/carriereEns/${props.data.id}`,{
            'NouveauPosteeEns': data.nouveau,
            'NouveauSalaireEns': data.salaire,
            'AncienPosteEns': data.ancien,
            'MotifPromotionEns': data.motif,
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
                    Modifier une carrière
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(updateCarriere)}>
                    <>
                        <Form.Group className="mb-3" controlId="ancien" >
                            <Form.Label>Ancien poste</Form.Label>
                            <Form.Control type='text' {...register("ancien", { required: true, minLength:3 })} defaultValue={props.data.AncienPosteEns} />
                            {errors.ancien?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.ancien?.type==='minlength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nouveau" >
                            <Form.Label>Nouveau poste</Form.Label>
                            <Form.Control type='text' {...register("nouveau", { required: true, minLength:3 })} defaultValue={props.data.NouveauPosteEns} />
                            {errors.nouveau?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.nouveau?.type==='minLength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="salaire" >
                            <Form.Label>Nouveau salaire</Form.Label>
                            <Form.Control type='number' {...register("salaire", { required: true, min:0 })} defaultValue={props.data.NouveausalaireEns} />
                            {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.salaire?.type==='min' && <span className='text-danger'>Ce Champ doit être positif</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="motif" >
                            <Form.Label>Motif promotion</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("motif", { required: true, minLength:3 })} defaultValue={props.data.MotifPromotionEns}/>
                            {errors.desc?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.desc?.type==='minLength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>

                        <div className=" d-flex justify-content-center">
                            <Button variant="secondary" className='w-25 me-2' type={"submit"}>Modifier</Button>
                        </div>
                    </>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const CrarriereEns = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    const [carr, setcarr] = useState([])
    const [ens, setens] = useState([])
    const [records, setRecords] = useState(carr)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['prenomEns', 'nomEns', 'AncienPosteEns','NouveauPosteEns','MotifPromotionEns'];

    const [selectedPerso, setSelectedPerso] = useState('');
    const [selectedAncienPoste, setSelectedAncienPoste] = useState('');
    const [selectedNouveauPoste, setSelectedNouveauPoste] = useState('');
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

    async function getCarrieres() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/carriereEnss`);
            setcarr(response.data);
            setRecords(response.data);
            setparams(response.data);
            setSeRecords(response.data)
            setload(false)
            //setSelectedRecords(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function getEnseignants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/enseignants`);
            setens(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
            getCarrieres()
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
        formData.append('personnel_id', data.nom);
        formData.append('AncienPosteEns', data.ancien);
        formData.append('NouveauPosteEns', data.nouveau);
        formData.append('NouveauSalaireEns', data.salaire);
        formData.append('MotifPromotionEns', data.motif);

        axios.post(`${import.meta.env.VITE_URL}/carriereEnss`,formData)
            .then(function (response) {
                console.log(response.data);
                //JSON.stringify(response.data)
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

        axios.put(`${import.meta.env.VITE_URL}/carriereEns/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("Archivé !", "Les carrieres sélectionnées ont été archivé.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/carriereEns/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les carrieres sélectionnées ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

// fonction pour supprimer un personnel

    const delCarriere = async (id) => {
        swal({
            title: "Êtes-vous certains de vouloir effectuer cette action ?",
            text: "Vous risquez de ne plus pouvoir restaurer cette carriere !",
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
                        .put(`${import.meta.env.VITE_URL}/carriereEns/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre carriere a bien été supprimé.", "success");
                            // Rechargez la page après la suppression
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de l'personnel en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/carriereEns/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre carriere a été marqué comme archivé.", "success");
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre carriere n'a pas été modifié.", "info");
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
        console.log(params)
    }

//filtrer les personnels

    const filtercarriere = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchPerso =
                selectedPerso === '' ||
                (record.nomEns + ' ' + record.prenomEns) === selectedPerso;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.created_at);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            const matchNouveauPoste =
                selectedNouveauPoste === '' || record.NouveauPosteEns === selectedNouveauPoste;

            const matchAncienPoste =
                selectedAncienPoste === '' || record.AncienPosteEns === selectedAncienPoste;


            // Combinez toutes les conditions de filtrage
            return matchPerso && dateFilter && matchNouveauPoste && matchAncienPoste;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filtercarriere()
    }, [ selectedPerso, startDate, endDate, selectedAncienPoste, selectedNouveauPoste]);

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
                            <h1>Carrière</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">carrière</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des enseignants ayant une promotion</h3>
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
                                                                                    <strong>Supprimer plusieurs promotions</strong>.
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
                                                                                    <strong>Archiver plusieurs promotions</strong>.
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
                                                                            <span>Personnel</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedPerso} onChange={(e) => setSelectedPerso(e.target.value)}>
                                                                                <option>Choisir l'enseignant</option>
                                                                                {
                                                                                    carr.length !== 0 && (
                                                                                        [...new Set(carr.map((element) => element.nomEns +' '+ element.prenomEns))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Ancien Poste</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedAncienPoste} onChange={(e) => setSelectedAncienPoste(e.target.value)}>
                                                                                <option>Choisir l'ancien poste</option>
                                                                                {
                                                                                    carr.length !== 0 && (
                                                                                        [...new Set(carr.map((element) => element.AncienPosteEns))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Nouveau Poste</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedNouveauPoste} onChange={(e) => setSelectedNouveauPoste(e.target.value)}>
                                                                                <option>Choisir le nouveau poste</option>
                                                                                {
                                                                                    carr.length !== 0 && (
                                                                                        [...new Set(carr.map((element) => element.NouveauPosteEns))].map((nom, index) => {
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
                                                                        <th>Date</th>
                                                                        <th>Nom</th>
                                                                        <th>Ancien poste</th>
                                                                        <th>Nouveau poste</th>
                                                                        <th>Ancien salaire</th>
                                                                        <th>Nouveau salaire</th>
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
                                                                                            <td key={index}>{element.nomEns +' '+element.prenomEns}</td>
                                                                                            <td key={index}>{element.AncienPosteEns}</td>
                                                                                            <td key={index}>{element.NouveauPosteEns}</td>
                                                                                            <td key={index}>{element.salaireEns}</td>
                                                                                            <td key={index}>{element.NouveauSalaireEns}</td>
                                                                                            <td key={index}>{element.MotifPromotionEns}</td>
                                                                                        </tr>
                                                                                        <MyVerticallyCenteredModal
                                                                                            show={(idL===element.id) && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            carriere={carr}
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total de promotions : {total} </p>
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter une promotion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data format'>
                        <div className='mb-3'>
                            <Form.Select aria-label="Default select example" {...register("nom", { required: true })} controlId="nom" >
                                <option>Choisir l'enseignant</option>
                                {
                                    ens.map((element) =>{
                                        return(
                                            <option key={element.id} value={element.id}>{element.nomEns+' '+element.prenomEns}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                            {errors.nom?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        </div>
                        <Form.Group className="mb-3" controlId="ancien" >
                            <Form.Label>Ancien poste</Form.Label>
                            <Form.Control type='text' {...register("ancien", { required: true, minLength:3 })} />
                            {errors.ancien?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.ancien?.type==='minlength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="nouveau" >
                            <Form.Label>Nouveau poste</Form.Label>
                            <Form.Control type='text' {...register("nouveau", { required: true, minLength:3 })} />
                            {errors.nouveau?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.nouveau?.type==='minLength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="salaire" >
                            <Form.Label>Nouveau salaire</Form.Label>
                            <Form.Control type='number' {...register("salaire", { required: true, min:0 })} />
                            {errors.salaire?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.salaire?.type==='min' && <span className='text-danger'>Ce Champ doit être positif</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="motif" >
                            <Form.Label>Motif promotion</Form.Label>
                            <Form.Control as="textarea" rows={3} {...register("motif", { required: true, minLength:3 })} />
                            {errors.desc?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                            {errors.desc?.type==='minLength' && <span className='text-danger'>Ce Champ doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default CrarriereEns;