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
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";

function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();


    const history= useNavigate()

    const update = async (data) => {

        await axios.put(`${import.meta.env.VITE_URL}/edit_note/${props.data.id}`,{
            'valeur':data.note,
            'formation_id':data.nomForm,
            'Etudiant_id':data.nomEtud,
            'cour_id':data.nomCours,
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

        props.onHide()
        // window.location.reload()

        props.GetNote()
    })
    .catch(function (error) {
    console.log(error);
    });
    }

    const [fres, setfres] = useState(false);

    if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
        window.location.replace('/')
    }  

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
                    Modifier une Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(update)}>

                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Note</Form.Label>
                            <Form.Control type="number" {...register("note", { required: true, min:0 })} defaultValue={props.data.valeur}/>
                            {errors.note?.type==='required' && <span className='text-danger'>La Note est Obligatoire</span>}
                        </Form.Group>

                        <Form.Select aria-label="Default select example" {...register("nomForm", { required: true })} className='mb-3' controlId="fil" defaultValue={props.data.formation_id}>
                            <option>Choisir la filière</option>
                            {
                                props.note.length!=0 && (
                                    props.note.Fileres.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id} selected={element.formation_id == props.data.nomForm}>{element.nomForm}</option>
                                    );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.nomForm?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}


                        <Form.Select aria-label="Default select example" {...register("nomEtud", { required: true })} className='mb-3' controlId="etud" defaultValue={props.data.Etudiant_id}>
                        <option>Choisir l'étudiant</option>
                            {
                                props.note.length!=0 && (
                                    props.note.etudiants.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id} selected={element.Etudiant_id == props.data.nomEtud}>{element.nomEtud}</option>
                                    );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.nomEtud?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}


                        <Form.Select aria-label="Default select example" {...register("nomCours", { required: true })} className='mb-3' controlId="cours" defaultValue={props.data.cour_id}>
                        <option>Choisir le cours</option>
                            {
                                props.note.length!=0 && (
                                    props.note.Cours.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id} selected={element.cour_id == props.data.nomCours}>{element.nomCours}</option>
                                    );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.nomCours?.type==='required' && <span className='text-danger'>Le nom du cours est Obligatoire</span>}


                        <Row className='text-center mt-5'>
                            <Col className='col-md-6'>
                                <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75' >Modifier</Button>{' '}
                            </Col>

                            <Col className='col-md-6'>
                                <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' >Annuler</Button>{' '}
                            </Col>
                        </Row>

                    </Form>
                </Modal.Body>

            </Modal.Body>
        </Modal>
    );
}


const Note = () => {


        const history= useNavigate()
        const [show, setShow] = useState(false);
        const [fresh, setfresh] = useState(false);
        const [load, setload] = useState(false);

        const [allnotes, setallnotes] = useState([])
        const [searchQuery, setSearchQuery] = useState('');


        // const [allPaiement, setallPaiement] = useState([])
        const [newarr, setnewarr] = useState([]); //pour conserver la valeur de allpaiements lors du filtre (c'est valable pour tous les autres components ou il ya ce state)
        const [records, setRecords] = useState(allnotes)

        const keys=['nomEtud','nomForm','nomCours','note'];

        const [params, setparams] = useState([])

        const [idL, setidL] = useState(0)
        const [modalShow, setModalShow] = React.useState(false);

        //Pour montrer la modal la filiere
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);


        //modal pour le filtre
        const [showFilter, setShowFilter] = useState(false);

        const handleCloseFilter = () => setShowFilter(false);
        const handleShowFilter = () => setShowFilter(true);

        const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();

        //ajouter un etudiant
        const onSubmit = async (data) => {

            const formData = new FormData();

            formData.append('valeur', data.note);
            formData.append('formation_id', data.nomForm);
            formData.append('Etudiant_id', data.nomEtud);
            formData.append('cour_id', data.nomCours);

            axios.post(`${import.meta.env.VITE_URL}/note`,formData)
            .then(function (response) {
            console.log(response.data);
            // JSON.stringify(response.data)
            setShow(false)

            swal({
                title: "Note Créée Avec Succès !!!",
                text: "You clicked the button!",
                icon: "success",
                button: "OK",
                timer: 2000
            });
            reset()
            GetNote()
            })
            .catch(function(error) {
                console.log('error');
            })
        }

        async function GetNote() {
            try {
                setload(true)
                const response = await axios.get(`${import.meta.env.VITE_URL}/get-note`);
                setallnotes(response.data);
                JSON.stringify(response.data)
                // setnewarr(response.data);
                // setallpaiebydate(response.data)
                setload(false)
                // setRecords(response.data);
                // setparams(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        // console.log(allnotes);


        const [leon, setleon] = useState([]);
        async function GetEtudiantsAndFiliereAndCours() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL}/GetEtudiantsAndFiliereAndCours`);
                setleon(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        useEffect(() => {
            GetNote()
            GetEtudiantsAndFiliereAndCours()
        }, [])

        async function MettreDansLaCorbeille(id) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_URL}/delete_note/${id}/corbeille`);
                // getStudents()
                setTimeout(() => {
                    window.location.reload() //pour actualiser la page automatiquement
                }, 2000);

                // history('/etud/inscription')

                swal("Etudiant mis dans la corbeille !!!",{
                    icon:"success",
                });
                setallnotes(response.data.data)
                console.log('Cet etudiant a ette mis dans la corbeille');
            } catch (error) {
                console.error(error);
            }
        }

        // const {id}=useParams()
        async function Archiver(id) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_URL}/archive_note/${id}`);
                // setallnotes(response.data)
                console.log(response.data);
                // getStudents()
                setTimeout(() => {
                    window.location.reload() //pour actualiser la page automatiquement
                }, 2000);

                swal("Etudiant Archivé avec succès !!!",{
                    icon:"success",
                });
                console.log(' Etudiant Archive ');
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

        const handleDeleteSelected = () => {
            if (check.length==0){
                // alert('Cocher au moins un paiement')
                swal({
                    title: "Cocher au moins un note",
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

                    axios.post(`${import.meta.env.VITE_URL}/element_note`, {
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

                    // setallnotes(response.data)
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

            // setallnotes(newArray)

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

                const allIds = allnotes.map((element) => element.id);
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
                    <h1>Liste Des Notes</h1>
                    <nav>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                    <li className="breadcrumb-item active">Notes</li>
                    </ol>
                    </nav>
                    </div>

                    <section className="section form">
                    <div className="row">

                    <div className="col-lg-12">
                    <div className="row">

                    <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">Liste des Notes</h3>
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
                                    <strong>Supprimer plusieurs notes</strong>.
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
                                    <strong>Ajouter une Note</strong>.
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
                                <th>Note</th>
                                <th>Nom Etudiant</th>
                                <th>Nom Filiere</th>
                                <th>Nom du Cours</th>
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

                            allnotes.filter((element) =>
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

                        <td>
                            {['bottom'].map((placement) => (
                            <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                    <strong>Modifier étudiant</strong>.
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
                                    <strong>Archiver une note</strong>.
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

                        <td>{element.valeur}</td>
                        <td>{element.nomEtud}</td>
                        <td>{element.nomForm}</td>
                        <td>{element.nomCours}</td>

                        </tr>
                            <MyVerticallyCenteredModal
                            show={idL==element.id && modalShow}
                            onHide={() => setModalShow(false)}
                            GetNote={()=>GetNote()}
                            data={params}
                            note={leon}
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
                    <p className='text-danger fs-3 fw-3 mt-3'>Total:{allnotes.length}</p>
                    </div>
                    </div>

                    </div>
                    </div>

                    </div>
                    </section>

                    </main>

                    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
                </Col>
            </Row>

            <Modal show={show} size="md" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Ajouter une Note</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Note</Form.Label>
                            <Form.Control type="number" {...register("note", { required: true, min:0 })} />
                            {errors.note?.type==='required' && <span className='text-danger'>La Note est Obligatoire</span>}
                        </Form.Group>

                        <Form.Select aria-label="Default select example" {...register("nomForm", { required: true })} className='mb-3' controlId="fil" >
                            <option>Choisir la filière</option>
                            {
                                leon.length!=0 && (
                                    leon.Fileres.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id}>{element.nomForm}</option>
                                    );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.nomForm?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}


                        <Form.Select aria-label="Default select example" {...register("nomEtud", { required: true })} className='mb-3' controlId="etud" >
                            <option>Choisir l'étudiant</option>
                            {
                            leon.length!=0 && (
                                leon.etudiants.map((element, index) => {
                                return (
                                <option key={index} value={element.id}>{element.nomEtud}</option>
                                );
                                })
                                )
                            }
                        </Form.Select>
                        {errors.nomEtud?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}


                        <Form.Select aria-label="Default select example" {...register("nomCours", { required: true })} className='mb-3' controlId="cours" >
                            <option>Choisir le cours</option>
                            {
                            leon.length!=0 && (
                                leon.Cours.map((element, index) => {
                                return (
                                <option key={index} value={element.id}>{element.nomCours}</option>
                                );
                                })
                            )
                            }
                        </Form.Select>
                        {errors.nomCours?.type==='required' && <span className='text-danger'>Le nom du cours est Obligatoire</span>}

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

export default Note;
