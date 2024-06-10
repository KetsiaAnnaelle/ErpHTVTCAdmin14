import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Link, NavLink, useNavigate} from "react-router-dom";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";
import ReactPaginate from "react-paginate";
import {BsSearch} from "react-icons/bs";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactLoading from "react-loading";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import.meta.env.VITE_URL;
import FloatingLabel from "react-bootstrap/FloatingLabel";

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const history= useNavigate()
    const updateConge = async (data) => {

        await axios.post(`${import.meta.env.VITE_URL}/conge/${props.data.id}`,{
            'personnel_id': data.nom,
            'typeConge': data.type,
            'dateDeb': data.deb,
            'dateFin': data.fin,
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
                <Form onSubmit={handleSubmit(updateConge)}>
                    <>
                        <Form.Group className="mb-3" controlId="type" >
                            <Form.Label>Type de congé</Form.Label>
                            <Form.Control type="text" {...register("type", { required: true, minLength:3})} defaultValue={props.data.typeConge}/>
                            {errors.type?.type==='required' && <span className='text-danger'>Le type est Obligatoire</span>}
                            {errors.type?.type==='minLength' && <span className='text-danger'>Le type doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deb" >
                            <Form.Label>Date debut congé</Form.Label>
                            <Form.Control type="date" {...register("deb", { required: true })} defaultValue={props.data.dateDeb}/>
                            {errors.deb?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fin" >
                            <Form.Label>Date fin congé</Form.Label>
                            <Form.Control type="date" {...register("fin", { required: true })} defaultValue={props.data.dateFin} />
                            {errors.fin?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                        </Form.Group>

                        <div className="row d-flex justify-content-center">
                            <Button variant="secondary" className='w-25 me-2' type={"submit"}>Modifier</Button>
                        </div>
                    </>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const Conge = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    const [cong, setcong] = useState([])
    const [perso, setperso] = useState([])
    const [records, setRecords] = useState(cong)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=[ 'prenomPerso','typeConge', 'nomPerso'];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedTypeConge, setSelectedTypeConge] = useState('');
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

// fonction pour lister les abscences

    async function getConges() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/conges`);
            setcong(response.data);
            setRecords(response.data);
            setparams(response.data);
            setSeRecords(response.data)
            setload(false)
            //setSelectedRecords(response.data)
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
           getConges()
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
        formData.append('personnel_id', data.nom);
        formData.append('typeConge', data.type);
        formData.append('dateDeb', data.deb);
        formData.append('dateFin', data.fin);

        axios.post(`${import.meta.env.VITE_URL}/conges`,formData)
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

        axios.put(`${import.meta.env.VITE_URL}/conge/elementRestaures`, { ids: selectedRecords })
            .then(function (response) {
                swal("Archivé !", "Les conges sélectionnés ont été archivé.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/conge/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les conges sélectionnés ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

// fonction pour supprimer un personnel

    const delCoonge = async (id) => {
        swal({
            title: "Êtes-vous certains de vouloir effectuer cette action ?",
            text: "Vous risquez de ne plus pouvoir restaurer ce conge !",
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
                    // Pour mettre à jour le champ 'supprimer' de l'conge en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/conge/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre conge a bien été supprimé.", "success");
                            // Rechargez la page après la suppression
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else if (value === "archiver") {
                    // Pour mettre à jour le champ 'archiver' de l'conge en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/conge/${id}/archiver`, { archiver: 1 })
                        .then(function(response) {
                            swal("Archivé!", "Votre conge a été marqué comme archivé.", "success");
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                } else {
                    // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
                    swal("Annulé", "Votre conge n'a pas été modifié.", "info");
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

    const filterConges = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchPerso =
                selectedPerso === '' ||
                (record.nomPerso + ' ' + record.prenomPerso) === selectedPerso;
            const matchTypeConge =
                selectedTypeConge === '' || record.typeConge === selectedTypeConge;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.created_at);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchPerso && matchTypeConge  && dateFilter;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterConges()
    }, [selectedTypeConge, selectedPerso, startDate, endDate]);

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
                            <h1>Congés</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Congés</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des personnels en congés</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body table-responsive p-0">
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
                                                                                    <strong>Supprimer plusieurs congés</strong>.
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
                                                                                    <strong>Archiver plusieurs congés</strong>.
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
                                                                                <option>Choisir le personnel</option>
                                                                                {
                                                                                    cong.length !== 0 && (
                                                                                        [...new Set(cong.map((element) => element.nomPerso +' '+ element.prenomPerso))].map((nom, index) => {
                                                                                            return (
                                                                                                <option key={index} value={nom}>{nom}</option>
                                                                                            );
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Type</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedTypeConge} onChange={(e) => setSelectedTypeConge(e.target.value)}>
                                                                                <option>Choisir le type de conge</option>
                                                                                {
                                                                                    cong.length !== 0 && (
                                                                                        [...new Set(cong.map((element) => element.typeConge))].map((nom, index) => {
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
                                                                                        <strong>Créer un congé</strong>.
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
                                                                        <th>Date</th>
                                                                        <th>Nom </th>
                                                                        <th>Type Congé</th>
                                                                        <th>Date Debut</th>
                                                                        <th>Date fin</th>
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
                                                                                                                <strong>Modifier congé</strong>.
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
                                                                                                                <strong>Supprimer congé</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delConge(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td>{formatdate}</td>
                                                                                            <td key={index}>{element.nomPerso +' '+element.prenomPerso}</td>
                                                                                            <td key={index}>{element.typeConge}</td>
                                                                                            <td key={index}>{element.dateDeb}</td>
                                                                                            <td key={index}>{element.dateFin}</td>
                                                                                        </tr>
                                                                                        <MyVerticallyCenteredModal
                                                                                            show={(idL===element.id) && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            conge={cong}
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total Congés : {total} </p>
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
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4' >Ajouter un conge</Modal.Title>
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
                        <Form.Group className="mb-3" controlId="type" >
                            <Form.Label>Type de congé</Form.Label>
                            <Form.Control type="text" {...register("type", { required: true, minLength:3})}/>
                            {errors.type?.type==='required' && <span className='text-danger'>Le type est Obligatoire</span>}
                            {errors.type?.type==='minLength' && <span className='text-danger'>Le type doit avoir au moins 3 caractères</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deb" >
                            <Form.Label>Date debut congé</Form.Label>
                            <Form.Control type="date" {...register("deb", { required: true })} />
                            {errors.deb?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fin" >
                            <Form.Label>Date fin congé</Form.Label>
                            <Form.Control type="date" {...register("fin", { required: true })} />
                            {errors.fin?.type==='required' && <span className='text-danger'>La date est Obligatoire</span>}
                        </Form.Group>
                        <center><Button type={"submit"} variant="secondary" size="lg" className='mb-3 w-50' >Ajouter</Button>{' '}</center>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Conge;