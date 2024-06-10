import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaTrashAlt,FaCoins,FaGraduationCap,FaMoneyCheckAlt } from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import HeaderGeneral from '../../../component/HeaderGeneral.jsx';
import BarreLateraleDepense from '../../../component/BarreLateraleDepense.jsx';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
// import Select from 'react-select';
import { elements } from 'chart.js';
import.meta.env.VITE_URL;
import { IoSettingsSharp } from "react-icons/io5";


function MyVerticallyCenteredModal(props) {
    // const {id}=useParams()

    const [nomCat, setnomCat] = useState('')

    const [params, setparams] = useState([])

    const [idEtud, setidEtud] = useState()
    const [show1, setShow1] = useState(false);

    const [fres, setfres] = useState(false);

   

    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    

    useEffect(() => {

        if (props.data) {
            setnomCat(props.data.nomCat);
        }
    }, [props])

   


    function EditCat(e) {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/edit-cat/${props.data.id}`,{
            'nomCat':nomCat,
        })
            .then(function (response) {
                console.log(response.data);
                // setfres(!fres)
                
                // getStudents()
                swal("Modification Reussi!!!",{
                    icon:"success",
                });
                
                props.onHide()

                setTimeout(() => {
                    window.location.reload()
                }, 1000);

                // props.GetEtudiant()


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // useEffect(() => {
    //     props.onHide()
    // }, [fres])
    
    // useEffect(() => {
    //     getStudents()
    // }, [])


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <p className='fw-bold fs-5'>Informations de la Categorie</p>
                <Form onSubmit={(e) => {EditCat(e)}}>
                    <>
                        <div className="container">
                            <div className="row">

                                <Col className='col-md-4'>
                                    <Form.Group className="mb-3" controlId="Nom Categorie">
                                        <Form.Control type="text" value={nomCat} onChange={(e)=>setnomCat(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </div>


                            <div className="row d-flex justify-content-center">
                                {/* <div className="col-md-6"> */}
                                <Button variant="warning" className='w-25 me-2' type='submit'>Modifier</Button>
                                <Button variant="primary" className='w-25' type='reset' onClick={props.onHide} >Annuler</Button>
                                {/* </div> */}
                            </div>
                        </div>
                    </>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

const Catégorie = () => {

    // const [icone, seticone] = useState('')
    const [nomCat, setnomCat] = useState('')
    const [typeCat, settypeCat] = useState('')

    const [allcat, setallcat] = useState([])
    const [newallcat, setnewallcat] = useState([])

    const keys=['nomCat'];

    const [load, setload] = useState(false)

    const [selectedColor, setselectedColor] = useState('#000000')

    const [show1, setShow1] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);

    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const [fres, setfres] = useState(false);

    const [params, setparams] = useState([])


    const handleChangeColor = (color) =>{
        setselectedColor(color)
    }

    const allIcons = Object.keys(FaIcons).map(iconName => ({
        value: iconName,
        
        label: (
          <IconContext.Provider key={iconName} value={{ size: '1.5em', color:selectedColor }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <span style={{ marginRight: '8px', size:'50px' }}>
                        {React.createElement(FaIcons[iconName])}
                        </span>
    
                    </div>
                </div>
            </div>
            {/* {iconName} */}
          </IconContext.Provider>
        ),
    }));


    function AddCategorie(e) {
        // alert(e);
        e.preventDefault();

        const fData = new FormData()
        // fData.append('icone',icone)
        fData.append('nomCat',nomCat)
        fData.append('typeCat',typeCat)

        axios.post('http://localhost:8000/api/categorieDepense',fData)
            .then(function (response) {
                console.log(response.data);
                setShow1(false)
                swal({
                    title: "Catéorie Ajoutée Avec Succès !!!",
                    icon: "success",
                    button: "OK",
                });
                
                // seticone('')
                setnomCat('')
                settypeCat('')

                GetCategories()

                allcat(response.data)
            })
            .catch(function(error)  {

                console.error(error)

                //gestion des erreurs de validation

             /*   if (error.response && error.response.status ===422) {
                    const errors = error.response.data.errors;

                    setvalidationErrors(errors)

                } else {

                    console.error('Erreur non geres : ',error.message);
                }*/
            })
    }

    async function GetCategories() {
        try {
            const response = await axios.get('http://localhost:8000/api/categorieDepense');
            setallcat(response.data);
            setnewallcat(response.data);
            // JSON.stringify(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(allcat);

    useEffect(() => {
        GetCategories()
    }, [])

    const [idL, setidL] = useState('id')

    function modalElla(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }
    }, [fres])


    const [delcat, setdelcat] = useState(false)
    function alertForDeleteCat(id) {
        swal({
            title: `Voulez-vous vraiment supprimer cette categorie?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
            .then((willDelete)=>{
                if (willDelete) {
                    // async function delStudents(id) {
                    try {
                        const response = axios.delete(`http://localhost:8000/api/force-delete-cat/${id}`);
                        console.log(response.data);
                        setdelcat(!delcat);

                        // setallcat(response.data)
                        GetCategories()


                        setTimeout(() => {
                            window.location.reload() //pour actualiser la page automatiquement
                        }, 1000);

                        // getStudentsCorbeille()
                        swal("Categorie supprimée definitivement !!!",{
                            icon:"success",
                        });
                    } catch (error) {
                        console.error(error);
                    }

                }
                else{
                    swal("Impossible de supprimer")
                }
            })
    }

    const [searchQuery, setSearchQuery] = useState('');

    //pour supprimer plusieurs categories a la fois
    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);

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
                title: "Cocher au moins une categorie",
                text: "You clicked the button!",
                icon: "error",
                button: "OK",
                timer: 2000
            })

        }else {

            console.log(check.length);

            swal({
                title: `Voulez-vous vraiment supprimer cette/ces categorie(s)?`,
                icon: "warning",
                buttons: true,
                dangerMode:true,
            })
                .then((willDelete)=>{
                    if (willDelete) {
                        // async function delStudents(id) {

                        axios.post('http://localhost:8000/api/element-cat', {
                            data: check,
                        })
                            .then(function (response) {
                                console.log(response.data);

                                GetCategories()
                                // setTimeout(() => {
                                //     window.location.reload() //pour actualiser la page automatiquement
                                // }, 2000);

                                // getStudentsCorbeille()
                                swal("Categorie(s) supprimée(s) definitivement !!!",{
                                    icon:"success",
                                });
                            })
                            .catch(function (error) {
                                console.log('echec');
                            });

                        // setallstud(response.data)

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

            // setallstud(newArray)

        }else {
            setcheck([...check,id])
        }


    }

    const [checkAll, setcheckAll] = useState(false);
    const handleCheckAll = () => {
        if (!checkAll) {
            // Si la case à cocher dans l'en-tête est cochée, sélectionnez tous les enregistrements

            const allIds = allstud.map((element) => element.id);
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
    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();



    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleDepense/>
                </Col>

                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Catégories</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Catégories</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Listes des Catégories</h3>
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
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Supprimer plusieurs Categories</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3'><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} onClick={handleDeleteSelected}/></Button>
                                                                        </OverlayTrigger>
                                                                        ))}
                                                                    
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Restaurer plusieurs Entrées</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                    
                                                                </Form>

                                                            </div>

                                                            <h5 class="card-title d-flex mt-5 ms-3">Créer une nouvelle catégorie</h5>
                                                            
                                                            
                                                                <div class="container ms-3">
                                                                    <div class="row">
                                                                        
                                                                        <div class="col-lg-1 col-md-2">
                                                                             <label for="icone">icône</label> 
                                                                             <select className='form-select' aria-label='Defaut select example'>
                                                                                <option value="">icône</option>
                                                                            </select>

                                                                        </div>

                                                                        <div class="col-lg-1 col-md-2 mt-2">
                                                                            <label for="color">couleur</label>
                                                                           
                                                                            <input type="color" className='form-control' name="" id="" />
                                                                        </div>

                                                                        <div class="col-lg-4 col-md-5">
                                                                            
                                                                            {/* <!-- Button trigger modal --> */}
                                                                            {/* <button type="button" className="btn btn-info mt-4 w-100 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                                Nouveau nom de catégorie
                                                                            </button> */}

                                                                            <Button variant="info" size="lg" className='m-4' onClick={handleShow1} >Nouveau nom de catégorie</Button>

                                                                        </div> 
                                                                            {/* <!-- Modal --> */}

                                                                        <div class="col-lg-2 col-md-2 mt-2">
                                                                            <label for="color">Type</label>
                                                                        
                                                                            <select className='form-control' name="" id="">
                                                                                <option value=''>Choix du Type</option>
                                                                                <option value='Depense'>Dépense</option>
                                                                                <option value="Revenu">Revenu</option>
                                                                            </select>
                                                                        </div>
                                           
                                                                            <Modal
                                                                                show={show1}
                                                                                onHide={handleClose1}
                                                                                aria-labelledby="contained-modal-title-vcenter"
                                                                                centered
                                                                                keyboard={false}
                                                                                size='lg'
                                                                            >
                            
                                                                                <Modal.Body>
                                                                                    <Form onSubmit={(e) => {AddCategorie(e)}}>

                                                                                        <Row className='d-flex justify-content-center mb-3'>

                                                                                            <Col className='col-md-4'>
                                                                                                <Form.Group className="mb-3" controlId="Nom Categorie" placeholder='Nom'>
                                                                                                <Form.Control type="text" value={nomCat} onChange={(e)=>setnomCat(e.target.value)} placeholder='Nom'/>
                                                                                                </Form.Group>
                                                                                            </Col>

                                                                                            <Col className='col-md-4'>
                                                                                                <Form.Select aria-label="Default select example" className='mb-3' value={typeCat} onChange={(e)=>settypeCat(e.target.value)}>
                                                                                                    <option value=''>Choix du Type</option>
                                                                                                    <option value='Depense'>Dépense</option>
                                                                                                    <option value="Revenu">Revenu</option>
                                                                                                  
                                                                                                </Form.Select>

                                                                                            </Col>
                                                                                            
                                                                                            <Col className='col-md-4'>
                                                                                                <Button variant="success" type='submit' className='w-100'>
                                                                                                    Créer une Catégorie
                                                                                                </Button>
                                                                                            </Col>
                                                                                        </Row>

                                                                                    </Form>
                                                                                </Modal.Body>
                                                                            </Modal>
                                                                                
                                                                        
                                                                    </div>

                                                                    {/* <h5 className="card-title d-flex mt-5">Gérer les Catégories</h5>
                                                                    <div className="row">
                                                                        <div className="col-lg-4 col-md-6">
                                                                            <button type="button" className="btn btn-secondary mt-4">Fusionner les catégories</button>
                                                                        </div>

                                                                        <div className="col-lg-4 col-md-6 d-flex">
                                                                            <button type="button" className="btn btn-secondary mt-4" onClick={handleDeleteSelected}>Supprimer plusieurs catégories</button>
                                                                        </div>
                                                                    </div> */}

                                                                    <h5 className="card-title d-flex mt-5">Catégories de revenus</h5>
                                                                    {/* <!-- Transactions --> */}
                                                
                                                                    <div className="row justify-content-center btnn rounded d-flex">
                                                                    
                                                                        <div className="d-flex">
                                                                            
                                                                            <div className="col-md-5 mb-3">
                                                                                {
                                                                                    allcat.filter((element) =>
                                                                                        keys.some((key) => {
                                                                                            const value = element[key];
                                                                                            if (typeof value === 'string') {
                                                                                                return value.toLowerCase().includes(searchQuery);
                                                                                            }
                                                                                            return false;
                                                                                        })
                                                                                    )
                                                                                    
                                                                                    .map((element)=>{
                                                                                        
                                                                                        if (element.typeCat =='Revenu') {

                                                                                            const isChecked = selectedRecords.includes(element.id);
                                                                                            return(

                                                                                                <>
                                                                                                    <div className="container">
                                                                                                        <div className="row">
                                                                                                            <div className="col-md-1 mb-3">
                                                                                                                <div className="form-check">
                                                                                                                    <input className="form-check-input" type="checkbox" value="" id="check" checked={isChecked} onClick={() => checkedAll(element.id)}/>
                                                                                                                    <label className="form-check-label" for="check">
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div className="col-md-4">

                                                                                                                <p value={typeCat}><FaCoins className='text-danger' /> {element.nomCat}</p>
                                                                                                            </div>

                                                                                                            <div className="col-md-3">

                                                                                                                <p value={typeCat}>0 transactions</p>
                                                                                                            </div>

                                                                                                            <div className="col-md-4">
                                                                                                                <div className="row"> 

                                                                                                                    <div className="col-md-1">
                                                                                                                        {['right'].map((placement) => (
                                                                                                                            <OverlayTrigger
                                                                                                                                key={placement}
                                                                                                                                placement={placement}
                                                                                                                                overlay={
                                                                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                                                                        <strong>Modifier une Categorie</strong>.
                                                                                                                                    </Tooltip>
                                                                                                                                }
                                                                                                                            >

                                                                                                                                <FaEdit className="text-success fa-3x" onClick={()=>modalElla(element)} style={{ cursor:'pointer' }}/>
                                                                                                                            </OverlayTrigger>
                                                                                                                        ))}
                                                                                                                    </div>

                                                                                                                    <div className="col-md-1 px-3">
                                                                                                                        {['right'].map((placement) => (
                                                                                                                        <OverlayTrigger
                                                                                                                            key={placement}
                                                                                                                            placement={placement}
                                                                                                                            overlay={
                                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                                    <strong>Supprimer une Categorie</strong>.
                                                                                                                                </Tooltip>
                                                                                                                            }
                                                                                                                        >

                                                                                                                            <FaTrashAlt className="text-danger" onClick={()=>alertForDeleteCat(element.id)}/>
                                                                                                                        </OverlayTrigger>
                                                                                                                        ))}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                        
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <MyVerticallyCenteredModal
                                                                                                        show={idL==element.id && modalShow}
                                                                                                        onHide={() => setModalShow(false)}
                                                                                                        // GetEtudiant={()=>getStudents()}
                                                                                                        data={params}
                                                                                                        // formation={allstud}
                                                                                                    />

                                                                                                </>
                                                                                                
                                                                                            );
                                                                                        }
                                                                                            
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>


                                                                    <h5 className="card-title d-flex mt-5">Catégories de Dépenses</h5>
                                                                    {/* <!-- Transactions --> */}
                                                
                                                                    <div className="row justify-content-center btnn rounded d-flex">
                                                                    
                                                                        <div className="d-flex">
                                                                            <div className="col-md-5 mb-3">
                                                                                {
                                                                                    allcat.filter((element) =>
                                                                                        keys.some((key) => {
                                                                                            const value = element[key];
                                                                                            if (typeof value === 'string') {
                                                                                                return value.toLowerCase().includes(searchQuery);
                                                                                            }
                                                                                            return false;
                                                                                        })
                                                                                    )
                                                                                    
                                                                                    .map((element)=>{
                                                                                        
                                                                                        if (element.typeCat =='Depense') {
                                                                                            const isChecked = selectedRecords.includes(element.id);
                                                                                            return(

                                                                                                <>
                                                                                                    <div className="container">
                                                                                                        <div className="row">

                                                                                                            <div className="col-md-1 mb-3">
                                                                                                                <div className="form-check">
                                                                                                                    <input className="form-check-input" type="checkbox" value="" id="check" checked={isChecked} onClick={() => checkedAll(element.id)}/>
                                                                                                                    <label className="form-check-label" for="check">
                                                                                                                    </label>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <div className="col-md-4">

                                                                                                                <p value={typeCat}><FaMoneyCheckAlt className='text-success' />{element.nomCat}</p>
                                                                                                            </div>

                                                                                                            <div className="col-md-4">

                                                                                                                <p value={typeCat}>0 transactions</p>
                                                                                                            </div>

                                                                                                            <div className="col-md-3">
                                                                                                                <div className="row">   

                                                                                                                    <div className="col-md-1">
                                                                                                                        {['right'].map((placement) => (
                                                                                                                        <OverlayTrigger
                                                                                                                            key={placement}
                                                                                                                            placement={placement}
                                                                                                                            overlay={
                                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                                    <strong>Modifier une Catégorie</strong>.
                                                                                                                                </Tooltip>
                                                                                                                            }
                                                                                                                        >

                                                                                                                            <FaEdit className="text-success fa-3x" onClick={()=>modalElla(element)} style={{ cursor:'pointer' }}/>
                                                                                                                        </OverlayTrigger>
                                                                                                                        ))}
                                                                                                                    </div>

                                                                                                                    <div className="col-md-1 px-3">
                                                                                                                        {['right'].map((placement) => (
                                                                                                                        <OverlayTrigger
                                                                                                                            key={placement}
                                                                                                                            placement={placement}
                                                                                                                            overlay={
                                                                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                                                                    <strong>Supprimer plusieurs Catégories</strong>.
                                                                                                                                </Tooltip>
                                                                                                                            }
                                                                                                                        >

                                                                                                                            <FaTrashAlt className="text-danger" onClick={()=>alertForDeleteCat(element.id)}/>
                                                                                                                        </OverlayTrigger>
                                                                                                                        ))}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                        
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <MyVerticallyCenteredModal
                                                                                                        show={idL==element.id && modalShow}
                                                                                                        onHide={() => setModalShow(false)}
                                                                                                        // GetEtudiant={()=>getStudents()}
                                                                                                        data={params}
                                                                                                        // formation={allcat}
                                                                                                    />

                                                                                                </>
                                                                                                
                                                                                            );
                                                                                        }
                                                                                            
                                                                                    })
                                                                                }
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </div>

                                                                    
                                                                </div>

                                                        </div>
                                                    </div>
                                                </div>
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
            
        </Container>
    );
};

export default Catégorie;