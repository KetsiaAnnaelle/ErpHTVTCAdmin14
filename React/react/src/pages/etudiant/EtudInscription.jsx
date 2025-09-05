import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios, { all } from "axios";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import ReactLoading from 'react-loading';
import { Col, Container, Row, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { BsSearch, BsFillPencilFill, BsArrowDown, BsArrowUp, BsArrowDownUp } from 'react-icons/bs';
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { FaEdit, FaTrashAlt, FaFileArchive, FaEye, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert';
import {IoMdAddCircle} from "react-icons/io";
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {  BiArrowFromBottom, BiArrowFromTop, BiArrowToBottom, BiArrowToTop } from 'react-icons/bi';
import.meta.env.VITE_URL;
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CreateFicheFiliererPdf from './DetailsEtudiantsParFiliere.jsx';


function MyVerticallyCenteredModal(props) {
    // const {id}=useParams()

    const [nomEtud, setnomEtud] = useState('')
    const [prenomEtud, setprenomEtud] = useState('')
    const [sexe, setsexe] = useState('')
    // const [cni, setcni] = useState('')
    const [niveau, setniveau] = useState('')
    const [ville, setville] = useState('')
    const [pays, setpays] = useState('')
    const [telEtud, settelEtud] = useState('')
    const [whatsappEtud, setwhatsappEtud] = useState('')
    const [emailEtud, setemailEtud] = useState('')
    const [formation_id, setformation_id] = useState('')
    const [section, setsection] = useState('')

    const [form, setform] = useState([])
    const [nomForm, setnomForm] = useState('')

    const [idEtud, setidEtud] = useState()
    const [show1, setShow1] = useState(false);

    const [fres, setfres] = useState(false);

    const [allstudFiltered, setallstudFiltered] = useState([]) //pour avoir tous les etudiants
    const [allstudbydate, setallstudbydate] = useState([]) //tous les etudiants qui vont subir le filtre

    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

  

    useEffect(() => {

        if (props.data) {
            setnomEtud(props.data.nomEtud);
            setprenomEtud(props.data.prenomEtud);
            setsexe(props.data.sexe);
            setniveau(props.data.niveau);
            setville(props.data.ville);
            setpays(props.data.pays);
            settelEtud(props.data.telEtud);
            setwhatsappEtud(props.data.whatsappEtud);
            setemailEtud(props.data.emailEtud);
            setformation_id(props.data.formation_id);
            setsection(props.data.section)
        }
    }, [props])

   



    async function getStudents() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`);
            // setallstud(response.data);
            setallstudFiltered(response.data)
            // setnewarr(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    function EditStudent(e) {
        e.preventDefault();

        axios.put(`${import.meta.env.VITE_URL}/edit-student/${props.data.id}`,{
            'nomEtud':nomEtud,
            'prenomEtud':prenomEtud,
            'sexe':sexe,
            'niveau':niveau,
            'ville':ville,
            'pays':pays,
            'telEtud':telEtud,
            'whatsappEtud':whatsappEtud,
            'emailEtud':emailEtud,
            'formation_id':formation_id,
            'section':section
        })
            .then(function (response) {
                console.log(response.data);
                setfres(!fres)
                
                setTimeout(() => {
                    window.location.reload()
                }, 1000);

                // getStudents()
                swal("Modification Reussi!!!",{
                    icon:"success",
                });

                // getStudents()
                // setallstudFiltered(response.data)



            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        props.onHide()
    }, [fres])


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
                <p className='fw-bold fs-5'>Informations de l'étudiant</p>
                <Form onSubmit={(e) => {EditStudent(e)}}>
                    <>
                        <div className="container">
                            <div className="row">

                                <div className="col-md-6">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Nom de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={nomEtud} onChange={(e)=>setnomEtud(e.target.value)}/>
                                    </FloatingLabel>
                                </div>

                                <div className="col-md-6">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Prénom de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={prenomEtud} onChange={(e)=>setprenomEtud(e.target.value)}/>
                                    </FloatingLabel>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <FloatingLabel controlId="floatingSelect" label="Genre de l'étudiant">
                                        <Form.Select aria-label="Floating label select example" value={sexe} onChange={(e)=>setsexe(e.target.value)}>
                                            <option value="Masculin">Masculin</option>
                                            <option value="Feminin">Feminin</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>

                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Niveau d'étude de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={niveau} onChange={(e)=>setniveau(e.target.value)}/>
                                    </FloatingLabel>
                                </div>

                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Ville"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={ville} onChange={(e)=>setville(e.target.value)}/>
                                    </FloatingLabel>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Pays de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={pays} onChange={(e)=>setpays(e.target.value)}/>
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Numéro de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="tel" value={telEtud} onChange={(e)=>settelEtud(e.target.value)}/>
                                    </FloatingLabel>
                                </div>
                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Numéro Whatsapp de l'étudiant"
                                        className="mb-3"
                                    >
                                        <Form.Control type="tel" value={whatsappEtud} onChange={(e)=>setwhatsappEtud(e.target.value)}/>
                                    </FloatingLabel>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" value={emailEtud} onChange={(e)=>setemailEtud(e.target.value)}/>
                                    </FloatingLabel>
                                </div>

                                <div className="col-md-4">
                                    <FloatingLabel controlId="floatingSelect" label="Formation Choisie">
                                        <Form.Select aria-label="Floating label select example" value={formation_id} onChange={(e)=>setformation_id(e.target.value)}>
                                            {
                                                props.formation.map((element) =>{
                                                    // console.log(element);
                                                    return(
                                                        <option key={element.id} value={element.id}>{element.nomForm}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>

                                <div className="col-md-4">
                                    <Form.Label>Section</Form.Label>
                                    <FloatingLabel controlId="floatingSelect">
                                        <Form.Select aria-label="Floating label select example" value={section} onChange={(e)=>setsection(e.target.value)}>
                                            <option value="">Choisir une section</option>
                                            <option value="Francophone">Francophone</option>
                                            <option value="Anglophone">Anglophone</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>

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



const EtudInscription = () => {

    // const { register, formState: { errors }, handleSubmit } = useForm();


    const history= useNavigate()
    //pour ouvrir la modal de l'etudiant
    const [show, setShow] = useState(false);

    //pour ouvrir la modal d'editer un etudiant'
    const [show1, setShow1] = useState(false);

    const [typeEtud, settypeEtud] = useState('')
    const [nomEtud, setnomEtud] = useState('')
    const [prenomEtud, setprenomEtud] = useState('')
    const [birthday, setbirthday] = useState('')
    const [sexe, setsexe] = useState('')
    const [cni, setcni] = useState('')
    const [niveau, setniveau] = useState('')
    const [ville, setville] = useState('')
    const [pays, setpays] = useState('')
    const [telEtud, settelEtud] = useState('')
    const [whatsappEtud, setwhatsappEtud] = useState('')
    const [emailEtud, setemailEtud] = useState('')
    const [nomTuteur, setnomTuteur] = useState('')
    const [telTuteur, settelTuteur] = useState('')
    const [formation_id, setformation_id] = useState('')
    const [section, setsection] = useState('')
    const [motivation, setmotivation] = useState('')
    const [decouverte, setdecouverte] = useState('')
    const [profil, setprofil] = useState(null)
    const [diplome, setdiplome] = useState(null)
    const [photocopieCni, setphotocopieCni] = useState(null)
    const [filtreFiliere, setfiltreFiliere] = useState('')
    const [idL, setidL] = useState('id')

    const [load, setload] = useState(false) //permet d'eviter les appels d'api lors de la fonction getFormation
    // const [fresh, setfresh] = useState(false)

    //Pour creer une filiere
    const [nomForm, setnomForm] = useState('')

    const [allstud, setallstud] = useState([]) //permet d'avoir tous les etudiants
    const [allstudbydate, setallstudbydate] = useState([]) //pour avoir les etudiants en fonction de la date d'inscription //pour afficher tous les etudiants issus du filtre de la filiere  dans le tableau
    const [allstudFiltered, setallstudFiltered] = useState([]) //tous les filtres d'une filiere qu'on affiche dans le select du filtre des etudiants
    const [params, setparams] = useState([])

    // const [tableFiltered, settableFiltered] = useState(initialState)
    const [fres, setfres] = useState(false)

    const [modalShow, setModalShow] = React.useState(false);

    // //Pour montrer la modal la filiere
    const handleShow1 = () => setShow1(true);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);

    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);

    //search general

    const [searchQuery, setSearchQuery] = useState('');
    const [newarr, setnewarr] = useState([]);
    const keys=['typeEtud', 'nomEtud','prenomEtud', 'pays', 'sexe', 'ville', 'nomForm'];

    //Pour la gestion des erreurs

    const [validationErrors, setvalidationErrors] = useState({})

    

    //Recuperer tous les etudiants pour les afficher dans le tableau
    async function getStudents() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/etud/inscription/inscription`);
            setallstud(response.data);
            setallstudFiltered(response.data)
            setnewarr(response.data);
            setload(false)
        } catch (error) {
            console.error(error);
        }
    }

    //ajouter un etudiant
    function AddEtudiants(e) {
        e.preventDefault();

        const fData = new FormData()
        fData.append('typeEtud',typeEtud)
        fData.append('nomEtud',nomEtud)
        fData.append('prenomEtud',prenomEtud)
        fData.append('birthday',birthday)
        fData.append('sexe',sexe)
        fData.append('cni',cni)
        fData.append('niveau',niveau)
        fData.append('ville',ville)
        fData.append('pays',pays)
        fData.append('telEtud',telEtud)
        fData.append('whatsappEtud',whatsappEtud)
        fData.append('emailEtud',emailEtud)
        fData.append('nomTuteur',nomTuteur)
        fData.append('telTuteur',telTuteur)
        fData.append('formation_id',formation_id)
        fData.append('section',section)
        fData.append('motivation',motivation)
        fData.append('decouverte',decouverte)
        fData.append('profil',profil)
        fData.append('diplome',diplome)
        fData.append('photocopieCni',photocopieCni)

        axios.post(`${import.meta.env.VITE_URL}/etud/inscription`,fData)
            .then(function (response) {
                console.log(response.data);
                // JSON.stringify(response.data)
                setShow(false)
                // setallstud(response.data.data)

                // setTimeout(() => {
                //     window.location.reload() //pour actualiser la page automatiquement
                // }, 2000);

                swal({
                    title: "Ajouté Avec Succès !!!",
                    icon: "success",
                    button: "OK",
                });


                setnomEtud('')
                setprenomEtud('')
                setsexe('')
                setville('')
                setpays('')
                setformation_id('')
                settelEtud('')
                settelTuteur('')
                setwhatsappEtud('')
                setemailEtud('')
                setmotivation('')
                setdecouverte('')
                setprofil('')
                setdiplome('')
                setphotocopieCni('')
                setbirthday('')
                setcni('')
                settypeEtud('')
                setniveau('')
                setnomTuteur('')

                getStudents()

                allstud(response.data)

            })
            .catch(function(error)  {

                //gestion des erreurs de validation

                if (error.response && error.response.status ===422) {
                    const errors = error.response.data.errors;

                    setvalidationErrors(errors)

                } else {

                    console.error('Erreur non geres : ',error.message);
                }
            })
    }

    function MettreDansLaCorbeille(id) {

        swal({
            title: `Voulez-vous vraiment mettre cet étudiant dans la corbeille?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
        .then((willTrash)=>{
            if (willTrash) {
                try {
                    const response = axios.delete(`${import.meta.env.VITE_URL}/delete-student/${id}/corbeille`);
                    // setTimeout(() => {
                    //     window.location.reload() //pour actualiser la page automatiquement
                    // }, 2000);
                        
                    swal("Etudiant mis dans la corbeille !!!",{
                        icon:"success",
                    });

                    getStudents()

                    setallstud(response.data)

                    console.log('Cet etudiant a ette mis dans la corbeille');

                } catch (error) {
                    console.error(error);
                }
            }
            else{
                swal("Impossible dw mettre dans la corbeille")
            }
        })

    }

    // const {id}=useParams()
    function Archiver(id) {

        swal({
            title: `Voulez-vous vraiment archiver cet étudiant?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
        .then((willArchive)=>{
            if (willArchive) {
                // async function delStudents(id) {
                try {
                    const response = axios.put(`${import.meta.env.VITE_URL}/archive-student/${id}`);
                    setallstud(response.data)
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
            else{
                swal("Impossible d'archiver")
            }
        })
        
    }

    //Recuperer toutes les formations pour afficher le nom de la formation dans le select
    const [form, setform] = useState([])
    const [etudfil, setetudfil] = useState([])

    async function getFormations() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/getFormation`);
            setform(response.data);
            setetudfil(response.data)
        } catch (error) {
            console.error(`Erreur : ${error}`);
        }
    }

    async function FilterStudentsByClass() {
        if (filtreFiliere) {
            try {
                // const response = await axios.get(`${import.meta.env.VITE_URL}/students/${filiere}`);
                const filteredStudents = allstudbydate.filter(et => et.formation.id == filtreFiliere)
                setallstud(filteredStudents);
                // console.log();
            } catch (error) {
                console.error(error);
            }
        }
    }

    function setFiltreAllFiliere(mot) {

        const filteredStudents = newarr.filter(et => et.nomForm == mot)
        setallstud(filteredStudents);
    }


    useEffect(() => {
        FilterStudentsByClass()
    }, [filtreFiliere])

    
    useEffect(() => {
        getStudents()
        getFormations()
    },  [fres])

    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }
    }, [fres])


    //Modifier les infos d'un etudiant

    function modalElla(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }

    const [filtreEtudiant, setfiltreEtudiant] = useState('')

    const [dateDebut, setdateDebut] = useState('')
    const [dateFin, setdateFin] = useState('')

    
    const filterDate = () => {
        const filteredRecords = newarr.filter((record) => {
            
            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.created_at.split(' ')[0]);
    
            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!dateDebut || recordDate >= new Date(dateDebut)) &&
                (!dateFin || recordDate <= new Date(dateFin));
    
            // Combinez toutes les conditions de filtrage
            return dateFilter;
        });
    
        setallstudFiltered(filteredRecords);
        console.log(allstudFiltered);
    };
    
    useEffect(() => {
        filterDate();
    }, [dateDebut, dateFin]);

    //supprimer plusieurs etudiants a la fois

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
                title: "Cocher au moins un étudiant",
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

                        axios.post('${import.meta.env.VITE_URL}/element-etudiant', {
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

                        // setallstud(response.data)

                    }
                    else{
                        swal("Impossible de supprimer")
                    }
                })


        }
    };

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

    const [state, setstate] = useState(true)


    //reinitialiser les filtres
    function ResetFilter() {
        setdateDebut('')
        setdateFin('')
        getStudents()
    }

    const [isAsc, setisAsc] = useState(false)

    function TrieDateDescendant() {
        let t = allstud;
        if (isAsc === false) {
            
            t.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))
            // console.log(t);
        }else{
            t.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        }
        setisAsc(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setallstud(t)
    }

    const [isCrois, setisCrois] = useState(false)

    function TrieNom() {
        let t = allstud;
        console.log(t);     
        if (isCrois === false) {
            
            t.sort((a,b) => a.nomEtud.localeCompare(b.nomEtud)) //tri croissant
            // console.log(t);
        }else{
            t.sort((a,b) => b.nomEtud.localeCompare(a.nomEtud))
        }
        setisCrois(v => !v) //ici on affecte l'inverse de la valeur. ca fonctionne seulement avec les booleens
        setallstud(t)
    }


    const [NewFiliere, setNewFiliere] = useState('')
    useEffect(() => {
        const etudFiltered = allstud.filter((element) =>
                        keys.some((key) => {
                            const value = element[key];
                            if (typeof value === 'string') {
                                return value.includes(searchQuery);
                            }
                            return false;
                        }),
                        //si ls etuiants ont ete filtres
                       
                    )

        setallstudFiltered(etudFiltered)
        if (allstudFiltered.length > 0) {
            setNewFiliere(allstudFiltered[0].formation_id && allstudFiltered[0].nomForm)       
        } else {
            setNewFiliere('')
        }
    }, [searchQuery])

    // console.log(NewFiliere);

    useEffect(() => {
        setallstud(allstud)
    }, [isCrois,isAsc])

    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col className='d-md-none d-lg-block'>
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Etudiants</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Etudiants</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des etudiants</h3>
                                            </div>

                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-body ">
                                                                   
                                                             

                                                                <Form className='d-flex justify-content-center my-3'>
                                                                    <p className='text-danger fs-3 fw-3 mx-5'>Total: {allstudFiltered.filter((element) =>
                                                                                    keys.some((key) => {
                                                                                        const value = element[key];
                                                                                        if (typeof value === 'string') {
                                                                                            return value.includes(searchQuery);
                                                                                        }
                                                                                        return false;
                                                                                    })
                                                                                ).length}
                                                                    </p>
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
                                                                                    <strong>Supprimer plusieurs étudiants</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={handleDeleteSelected}><FaTrashAlt className="text-danger" size={24} style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}

                                                                    {['right'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Filtrer les étudiants</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="light" className='mb-3 ms-3' onClick={handleShowFilter} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaFilter className="text-primary" size={24} style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}         

                                                                    {['right'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Télécharger la fiche des Etudiants d'une Filiere</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Button variant="transparent" >
                                                                                    <PDFDownloadLink fileName='fiche_absence'/>
                                                                                    <PDFDownloadLink document={<CreateFicheFiliererPdf form={allstudFiltered} nom_formation={NewFiliere}/>} fileName='fiche des etudiants de la filiere'>
                                                                                        <AiOutlineDownload size={32} className='text-primary mb-3 mx-3'/>
                                                                                    </PDFDownloadLink>
                                                                                </Button>
                                                                            </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                <Row className='d-flex'>

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
                                                                                        <Row className='d-flex'>
                                                                                            <Col className='col'>
                                                                                                <label htmlFor="">Période de:</label>
                                                                                            </Col>
                                                                                            <Col className='col-md-12'>

                                                                                                <Form.Group className="mb-3" controlId="dateDeb">
                                                                                                        <Form.Control type="date" value={dateDebut} onChange={(e)=>setdateDebut(e.target.value)}/>
                                                                                                </Form.Group>

                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Col>

                                                                                    <Col className='col-md-4'>
                                                                                        <span>A</span>

                                                                                        <Form.Group className="mb-3" controlId="dateFin">
                                                                                            <Form.Control type="date" value={dateFin} onChange={(e)=>setdateFin(e.target.value)}/>
                                                                                        </Form.Group>
                                                                                    </Col>

                                                                                    <Col className='col-md-4 mt-4'>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={filtreFiliere} onChange={(e)=>setFiltreAllFiliere(e.target.value)}>
                                                                                            <option value=''>Choisir la filière</option>
                                                                                            {
                                                                                                form.map((element) =>{
                                                                                                    return(
                                                                                                        <option key={element.id} value={element.nomForm}>{element.nomForm}</option>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </Form.Select>
                                                                                    </Col>

                                                                                </Row>
                                                                            </Form>
                                                                        </Modal.Body>

                                                                        <Modal.Footer>
                                                                            <Button variant="primary" onClick={ResetFilter}>Reinitialiser</Button>
                                                                            <Button variant="secondary" onClick={handleCloseFilter}>
                                                                                Annuler
                                                                            </Button>
                                                                        </Modal.Footer>
                                                                    </Modal>

                                                                </Row>

                                                             

                                                                <Table responsive>

                                                                    <thead style={{backgroundColor: '#1A3C30' , height:'100px', width:'350%'}} className='text-white fs-6 items-center'>
                                                                        <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}}>
                                                                            {['right'].map((placement) => (
                                                                                <OverlayTrigger
                                                                                    key={placement}
                                                                                    placement={placement}
                                                                                    overlay={
                                                                                        <Tooltip id={`tooltip-${placement}`}>
                                                                                            <strong>Inscrire une Etudiant</strong>.
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
                                                                            <th>Date <BsArrowDownUp className='fw-bold ms-1'onClick={TrieDateDescendant} style={{ cursor:'pointer' }}/> </th>
                                                                            <th>Nom<BsArrowDownUp className='fw-bold ms-1' onClick={TrieNom} style={{ cursor:'pointer' }}/></th>
                                                                            <th>Prenom</th>
                                                                            <th>Sexe</th>
                                                                            <th>Formation</th>
                                                                            <th>Niveau d'étude</th>
                                                                            <th>Section</th>
                                                                            <th>Tél</th>
                                                                            <th>Ville</th>
                                                                            <th>Pays</th>
                                                                            <th>Whatsapp</th>
                                                                            <th>Email</th>
                                                                            <th></th>
                                                                            <th></th>
                                                                            <th></th>
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

                                                                            allstudFiltered.map((element, index)=>{
                                                                                // const date = new Date(element.created_at);
                                                                                // const year = date.getFullYear();
                                                                                // const month = (date.getMonth() + 1).toString().padStart(2,'0');
                                                                                // const day = date.getDate().toString().padStart(2,'0');
                                                                                // const formattedDate = `${year}-${month}-${day}`;
                                                                                const isChecked = selectedRecords.includes(element.id);

                                                                                // console.log(allstud);
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
                                                                                                        <strong>Voir étudiant</strong>.
                                                                                                        </Tooltip>
                                                                                                    }
                                                                                                    >
                                                                                                    <div className="d-inline-block"> {/* Ajout d'un wrapper div */}
                                                                                                        <Link to={`/etud/details/${element.id}`}>
                                                                                                        <Button variant="transparent" className="mb-3">
                                                                                                            <FaEye className="text-warning me-5" style={{ cursor: 'pointer' }} />
                                                                                                        </Button>
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>

                                                                                            <td className="me-5">{element.created_at.split('T')[0]}</td>

                                                                                            <td>{element.nomEtud}</td>
                                                                                            <td>{element.prenomEtud}</td>
                                                                                            <td>{element.sexe}</td>
                                                                                            <td key={index}>{element.nomForm}</td>
                                                                                            <td>{element.niveau}</td>
                                                                                            <td>{element.section}</td>
                                                                                            <td>{element.telEtud}</td>
                                                                                            <td>{element.ville}</td>
                                                                                            <td>{element.pays}</td>
                                                                                            <td>{element.whatsappEtud}</td>
                                                                                            <td>{element.emailEtud}</td>
                                                                                            {/* <td><img className='rounded-circle' width={'50px'} height={'50px'} src={`http://localhost:8000/uploadImage/${element.profil}`} alt="profil"/></td>
                                                        <td><img className='rounded-circle' width={'50px'} height={'50px'} src={`http://localhost:8000/uploadImage/${element.diplome}`} alt="diplome"/></td>
                                                        <td><img className='rounded-circle' width={'50px'} height={'50px'} src={`http://localhost:8000/uploadImage/${element.photocopieCni}`} alt="photocopieCni"/></td> */}
                                                                                            <td>
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
                                                                                                                <strong>Archiver étudiant</strong>.
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
                                                                                                                <strong>Supprimer un étudiant</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3'><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} onClick={()=>MettreDansLaCorbeille(element.id)}/></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>

                                                                                        </tr>

                                                                                        <MyVerticallyCenteredModal
                                                                                            show={idL==element.id && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            formation={form}
                                                                                            // formation={form}
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

                                            {/* <div className="card-footer">
                                                
                                            </div> */}
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

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Inscrire un Etudiant</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <p className='fw-bold fs-5'>Informations de l'étudiant</p>

                    <Form onSubmit={ AddEtudiants } encType='multipart/form-data'>
                        <>
                            <div className="container">
                                <div className="row">

                                    <div className="col-md-3">
                                        <FloatingLabel controlId="floatingSelect" label="Type de l'étudiant">
                                            <Form.Select aria-label="Floating label select example" value={typeEtud} onChange={(e)=>settypeEtud(e.target.value)}>
                                                <option value="">Choix du type</option>
                                                <option value="Particulier">Particulier</option>
                                                <option value="Entreprise">Entreprise</option>
                                            </Form.Select>
                                        </FloatingLabel>

                                        {validationErrors.typeEtud && (
                                            <div className=" error-message text-danger">{validationErrors.typeEtud[0]}</div>
                                        )}
                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Nom de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={nomEtud} onChange={(e)=>setnomEtud(e.target.value)}/>
                                            {validationErrors.nomEtud && (
                                                <div className=" error-message text-danger">{validationErrors.nomEtud[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Prénom de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={prenomEtud} onChange={(e)=>setprenomEtud(e.target.value)}/>
                                            {validationErrors.prenomEtud && (
                                                <div className="error-message text-danger">{validationErrors.prenomEtud[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Date de naissance"
                                            className="mb-3"
                                        >
                                            <Form.Control type="date" value={birthday} onChange={(e)=>setbirthday(e.target.value)}/>
                                            {validationErrors.birthday && (
                                                <div className="error-message text-danger">{validationErrors.birthday[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-3">
                                        <FloatingLabel controlId="floatingSelect" label="Genre de l'étudiant">
                                            <Form.Select aria-label="Floating label select example" value={sexe} onChange={(e)=>setsexe(e.target.value)}>
                                                <option value="">Choix du sexe</option>
                                                <option value="Masculin">Masculin</option>
                                                <option value="Feminin">Feminin</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="N° CNI de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={cni} onChange={(e)=>setcni(e.target.value)}/>
                                            {validationErrors.cni && (
                                                <div className=" error-message text-danger">{validationErrors.cni[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Niveau d'étude de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={niveau} onChange={(e)=>setniveau(e.target.value)}/>
                                            {validationErrors.niveau && (
                                                <div className=" error-message text-danger">{validationErrors.niveau[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Ville"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={ville} onChange={(e)=>setville(e.target.value)}/>
                                            {validationErrors.ville && (
                                                <div className=" error-message text-danger">{validationErrors.ville[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Pays de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={pays} onChange={(e)=>setpays(e.target.value)}/>
                                            {validationErrors.pays && (
                                                <div className=" error-message text-danger">{validationErrors.pays[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Numéro de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="tel" value={telEtud} onChange={(e)=>settelEtud(e.target.value)}/>
                                            {validationErrors.telEtud && (
                                                <div className=" error-message text-danger">{validationErrors.telEtud[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Numéro Whatsapp de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="tel" value={whatsappEtud} onChange={(e)=>setwhatsappEtud(e.target.value)}/>
                                            {validationErrors.whatsappEtud && (
                                                <div className=" error-message text-danger">{validationErrors.whatsappEtud[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-3">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email"
                                            className="mb-3"
                                        >
                                            <Form.Control type="email" value={emailEtud} onChange={(e)=>setemailEtud(e.target.value)}/>
                                            {validationErrors.emailEtud && (
                                                <div className=" error-message text-danger">{validationErrors.emailEtud[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-md-4">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Nom du Tuteur de l'étudiant"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" value={nomTuteur} onChange={(e)=>setnomTuteur(e.target.value)}/>
                                            {validationErrors.nomTuteur && (
                                                <div className=" error-message text-danger">{validationErrors.nomTuteur[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-4">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Numéro du Tuteur"
                                            className="mb-3"
                                        >
                                            <Form.Control type="tel" value={telTuteur} onChange={(e)=>settelTuteur(e.target.value)}/>
                                            {validationErrors.telTuteur && (
                                                <div className=" error-message text-danger">{validationErrors.telTuteur[0]}</div>
                                            )}
                                        </FloatingLabel>

                                    </div>

                                    <div className="col-md-4">
                                        <FloatingLabel controlId="floatingSelect" label="Formation Choisie">
                                            <Form.Select aria-label="Floating label select example" value={formation_id} onChange={(e)=>setformation_id(e.target.value)}>
                                                <option value="">Choix de la Filière</option>

                                                {
                                                    form.map((element) =>{
                                                        console.log(form);
                                                        return(
                                                            <option key={element.id} value={element.id}>{element.nomForm}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </FloatingLabel>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <Form.Label>Section</Form.Label>
                                            <FloatingLabel controlId="floatingSelect">
                                                <Form.Select aria-label="Floating label select example" value={section} onChange={(e)=>setsection(e.target.value)}>
                                                    <option value="">Choisir une section</option>
                                                    <option value="Francophone">Francophone</option>
                                                    <option value="Anglophone">Anglophone</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </div>


                                        <div className="col-md-4">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Motivation</Form.Label>
                                                <Form.Control as="textarea" rows={2} value={motivation} onChange={(e)=>setmotivation(e.target.value)}/>
                                                {validationErrors.motivation && (
                                                    <div className="error-message text-danger">{validationErrors.motivation[0]}</div>
                                                )}
                                            </Form.Group>

                                        </div>

                                        <div className="col-md-4">
                                            <Form.Label>Découverte du Centre</Form.Label>
                                            <FloatingLabel controlId="floatingSelect">
                                                <Form.Select aria-label="Floating label select example" value={decouverte} onChange={(e)=>setdecouverte(e.target.value)}>
                                                    <option value="">Choisir une decouverte</option>
                                                    <option value="Site Web">Site Web</option>
                                                    <option value="Réseaux Sociaux">Réseaux Sociaux</option>
                                                    <option value="Recommandation">Recommandation</option>
                                                    <option value="Réseaux Sociaux">Réseaux Sociaux</option>
                                                    <option value="Panneaux Publicitaires">Panneaux Publicitaires</option>
                                                    <option value="Autres Médias">Autres Médias</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </div>
                                    </div>


                                </div>

                                <div className="row">

                                    <div className="row mt-5">
                                        <h6>PIECES JOINTES</h6>
                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Photo de Profil</Form.Label>
                                                <Form.Control type="file" onChange={(e)=>setprofil(e.target.files[0])}/>
                                                {validationErrors.profil && (
                                                    <div className=" error-message text-danger">{validationErrors.profil[0]}</div>
                                                )}
                                            </Form.Group>

                                        </div>

                                        <div className="col-md-4">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Dernier Diplome</Form.Label>
                                                <Form.Control type="file" onChange={(e)=>setdiplome(e.target.files[0])}/>
                                                {validationErrors.diplome && (
                                                    <div className=" error-message text-danger">{validationErrors.diplome[0]}</div>
                                                )}
                                            </Form.Group>

                                        </div>

                                        <div className="col-md-4">
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>Photocopie CNI</Form.Label>
                                                <Form.Control type="file" onChange={(e)=>setphotocopieCni(e.target.files[0])}/>
                                                {validationErrors.photocopieCni && (
                                                    <div className=" error-message text-danger">{validationErrors.photocopieCni[0]}</div>
                                                )}
                                            </Form.Group>

                                        </div>
                                    </div>


                                </div>

                                <div className="row d-flex justify-content-center">
                                    {/* <div className="col-md-6"> */}
                                    <Button variant="warning" className='w-25 me-2' type='submit' onClick={(e) => {AddEtudiants(e)} }>Inscrire</Button>
                                    <Button variant="primary" className='w-25' type='reset' onClick={() => {handleClose()} } >Annuler</Button>
                                    {/* </div> */}
                                </div>


                            </div>
                        </>

                        {/* <Modal.Footer className='d-flex justify-content-center'>

                        </Modal.Footer> */}
                    </Form>

                </Modal.Body>

            </Modal>

        </Container>
    );
}

export default EtudInscription;