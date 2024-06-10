import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "axios";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import ReactLoading from 'react-loading';
import { Col, Container, Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useForm } from "react-hook-form";
import { BsSearch, BsFillPencilFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit, FaTrashAlt, FaFileArchive, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert';
import {IoMdAddCircle} from "react-icons/io";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import.meta.env.VITE_URL;
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";

const Cours = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const [allcours, setallcours] = useState([])
    const [searchQuery, setSearchQuery] = useState('');

    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();
   

    // const [allPaiement, setallPaiement] = useState([])
    const [newarr, setnewarr] = useState([]); //pour conserver la valeur de allpaiements lors du filtre (c'est valable pour tous les autres components ou il ya ce state)
    const [records, setRecords] = useState(allcours)

    const keys=['nomCours','formation_id'];
    
    const [params, setparams] = useState([])

    const [idL, setidL] = useState(0)
    const [modalShow, setModalShow] = React.useState(false);

    async function Archiver(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/archive-cours/${id}`);
            // setallcours(response.data)
            console.log(response.data);
            // getStudents()
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            swal("Cours Archivés avec succès !!!",{
                icon:"success",
            });
            console.log(' cours Archive ');
        } catch (error) {
            console.log('error');
        }
    }

    function modalElla(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    const handleCheckboxChange = (elementId) => {
        console.log(selectedRecords)
        // Mettez à jour les éléments sélectionnés lorsque les cases à cocher sont cochées/décochées
        if (selectedRecords.includes(elementId)) {
            setSelectedRecords(selectedRecords.filter(id => id.id !== elementId));
            console.log('ok')
        } else {
            setSelectedRecords([...selectedRecords, elementId]);
            console.log('non')
        }
    };

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append('nomCours', data.nomCours);
        formData.append('formation_id', data.formation_id);
        formData.append('heureDeb', data.heureDeb);
        formData.append('heureFin', data.heureFin);
        formData.append('description', data.description);

        axios.post(`${import.meta.env.VITE_URL}/cours`,formData)
        .then(function (response) {
            console.log(response.data);
            // JSON.stringify(response.data)
            setShow(false)

            swal({
                title: "cours Créée Avec Succès !!!",
                text: "You clicked the button!",
                icon: "success",
                button: "OK",
                timer: 2000
            });

            reset()

            GetCours()
        })
        .catch(function(error)  {
            console.log('error');
        })
    }

    async function GetCours() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/cours`);
            setallcours(response.data);
            // JSON.stringify(response.data)
            // setnewarr(response.data);
            // setallpaiebydate(response.data)
            setload(false)
        } catch (error) {
            console.log(error);
        }
    }


    const handleDeleteSelected = () => {
        if (check.length==0){
            // alert('Cocher au moins un paiement')
            swal({
                title: "Cocher au moins un cours",
                text: "You clicked the button!",
                icon: "error",
                button: "OK",
                timer: 2000
            })

        }else {

            swal({
                title: `Voulez-vous vraiment supprimer cet/ces étudiant(s)?`,
                icon: "warning",
                buttons: true,
                dangerMode:true,
            })
                .then((willDelete)=>{
                    if (willDelete) {
                        // async function delStudents(id) {

                        axios.post(`${import.meta.env.VITE_URL}/element_cours`, {
                            data: check,
                        })
                            .then(function (response) {
                                console.log(response.data);

                                setTimeout(() => {
                                    window.location.reload() //pour actualiser la page automatiquement
                                }, 2000);

                                // getStudentsCorbeille()
                                swal("Etudiant(s) supprimé(s) definitivement !!!",{
                                    icon:"success",
                                });
                            })
                            .catch(function (error) {
                                console.log('echec');
                            });

                        // setallcours(response.data)

                    }
                    else{
                        swal("Impossible de supprimer")
                    }
                })


        }
    };

    const manuelaAll =(id) =>{
        let searchId = check.find((item)=> item== id)
        if (searchId){
            let newArray = check.filter((item)=> item != id)
            setcheck(newArray)
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            // setallcours(newArray)

        }else {
            setcheck([...check,id])
        }


    }

    //supprimer plusieurs etudiants a la fois

    const [selectedRecords, setSelectedRecords] = useState([]);
    const [check, setcheck] = useState([]);

    const [checkAll, setcheckAll] = useState(false);
    const handleCheckAll = () => {
        if (!checkAll) {
            // Si la case à cocher dans l'en-tête est cochée, sélectionnez tous les enregistrements

            const allIds = allcours.map((element) => element.id);
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


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const [filiere, setfiliere] = useState([]);
    async function GetFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/GetFiliereDepense`);
            setfiliere(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function MettreDansLaCorbeille(id) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL}/delete-cours/${id}/corbeille`);
            // getStudents()
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            // history('/etud/inscription')

            swal("Cours mis dans la corbeille !!!",{
                icon:"success",
            });
            setallcours(response.data)
            console.log('Cet etudiant a ette mis dans la corbeille');
        } catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        GetFiliere()
        GetCours()
    }, [])


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
                            <h1>Liste Des Cours</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Cours</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des Cours</h3>
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

                                                                    {['right'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Supprimer plusieurs cours</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={handleDeleteSelected}><FaTrashAlt className="text-danger" size={24} style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                

                                                                <Table responsive>

                                                                    <thead style={{backgroundColor: '#1A3C30' , height:'100px', width:'350%'}} className='text-white fs-6 items-center'>
                                                                        <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}}>
                                                                            {['right'].map((placement) => (
                                                                                <OverlayTrigger
                                                                                    key={placement}
                                                                                    placement={placement}
                                                                                    overlay={
                                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                                            <strong>Ajouter un cours</strong>.
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
                                                                                    // onClick={()=>del}
                                                                                    // checked={isChecked}
                                                                                />
                                                                            </th>
                                                                            <th></th>
                                                                            <th></th>
                                                                            <th></th>
                                                                            <th>Date</th>
                                                                            <th>Nom du cours</th>
                                                                            <th>Heure Debut</th>
                                                                            <th>Heure Fin</th>
                                                                            <th>Nom Filiere</th>
                                                                            <th>Description</th>
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

                                                                            allcours.filter((element) =>
                                                                                keys.some((key) => {
                                                                                    const value = element[key];
                                                                                    if (typeof value === 'string') {
                                                                                        return value.toLowerCase().includes(searchQuery);
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            )
                                                                            
                                                                            .map((element, index)=>{
                                                                                
                                                                                const isChecked = selectedRecords.includes(element.id);
                                                                                const createdDate = new Date(element.created_at);
                                                                                const formatdate = createdDate.toLocaleDateString();
                                                                                
                                                                                return(
                                                                                    <>
                                                                                        <tr key={index} style={{ cursor: 'pointer' }}>

                                                                                            <td>
                                                                                                <Form.Check
                                                                                                    inline
                                                                                                    type="checkbox"
                                                                                                    className="mb-3"
                                                                                                    checked={isChecked}
                                                                                                    onClick={() => checkedAll(element.id)}
                                                                                                />
                                                                                            </td>
{/* 
                                                                                            <td>
                                                                                                {['bottom'].map((placement) => (
                                                                                                    <OverlayTrigger
                                                                                                        key={placement}
                                                                                                        placement={placement}
                                                                                                        overlay={
                                                                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                                                                <strong>Voir étudiant</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3'> <Link to={`/etud/details/${element.id}`}><FaEye className="text-warning" style={{ cursor:'pointer' }} /></Link></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td> */}

                                                                                            <td>
                                                                                                {['bottom'].map((placement) => (
                                                                                                    <OverlayTrigger
                                                                                                        key={placement}
                                                                                                        placement={placement}
                                                                                                        overlay={
                                                                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                                                                <strong>Modifier un cours</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3'><FaEdit className='text-primary me-1' onClick={()=>modalElla(element)} style={{ cursor:'pointer' }}/></Button>
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
                                                                                                                <strong>Archiver une cours</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3'><FaFileArchive className="text-success" style={{ cursor:'pointer' }} onClick={()=>Archiver(element.id)}/></Button>
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
                                                                                                                <strong>mise en corbeille </strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3'><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} onClick={()=>MettreDansLaCorbeille(element.id)}/></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>


                                                                                            <td>{formatdate}</td>

                                                                                            <td>{element.nomCours}</td>
                                                                                            <td>{element.heureDeb}</td>
                                                                                            <td>{element.heureFin}</td>
                                                                                            <td>{element.nomForm}</td>
                                                                                            <td>{element.description}</td>
                                                                                   
                                                                                        </tr>

                                                                                        {/* <MyVerticallyCenteredModal
                                                                                            show={idL==element.id && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            Getcours={()=>GetCours()}
                                                                                            data={params}
                                                                                            cours={filiere}
                                                                                        /> */}

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
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{allcours.length}</p>
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

            <Modal show={show} size="md" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Ajouter un cours</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Nom cours</Form.Label>
                            <Form.Control type="text" {...register("nomCours", { required: true})}  />
                            {errors.nomCours?.type==='required' && <span className='text-danger'>La cours est Obligatoire</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="heuredeb" >
                            <Form.Label>Heure Debut</Form.Label>
                            <Form.Control type="time" {...register("heureDeb", { required: true })} />
                            {errors.heureDeb?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="heurefin" >
                            <Form.Label>Heure Fin</Form.Label>
                            <Form.Control type="time" {...register("heureFin", { required: true })} />
                            {errors.heureFin?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>}
                        </Form.Group>

                        <Form.Select aria-label="Default select example" {...register("formation_id", { required: true })} className='mb-3' controlId="fil" >
                            <option>Choisir la filière</option>
                            {
                                filiere.length!=0 && (
                                    filiere.map((element, index) => {
                                        return (
                                            <option key={index} value={element.id}>{element.nomForm}</option>
                                        );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.nomForm?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}


                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" {...register("description", { required: true})}  />
                            {errors.description?.type==='required' && <span className='text-danger'>La description est Obligatoire</span>}
                        </Form.Group>

                        

                        <Row className='text-center mt-5'>
                            <Col className='col-md-6'>
                                <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75'>Créer</Button>{' '}
                            </Col>

                            <Col className='col-md-6'>
                                <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' onClick={() => {handleClose()} }>Annuler</Button>{' '}
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Cours;