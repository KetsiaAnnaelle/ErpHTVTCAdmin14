import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BsSearch, BsFillPencilFill } from 'react-icons/bs';
import {Col, Container, Row, Button, Form, Table, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {FaEdit, FaEye, FaTrashAlt, FaFileArchive, FaFilter} from "react-icons/fa";
import {useForm, Controller} from "react-hook-form";
import ReactLoading from 'react-loading';
import {IoMdAddCircle} from "react-icons/io";



function MyVerticallyCenteredModal(props) {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    // const [leon, setleon] = useState([]);
    const dateActuelle = new Date()


    const history= useNavigate()
    const updatePaiement = async (data) => {

        await axios.put(`${import.meta.env.VITE_URL}/update-paiement/${props.data.id}`,{
            'RefPaiement': data.RefPaiement,
            'formation_id': data.formation_id,
            'Etudiant_id': data.Etudiant_id,
            'MontantPaiement': data.MontantPaiement,
            'MoyenPaiement': data.MoyenPaiement,
            'MotifPaiement': data.MotifPaiement,
            'ProchainPaiement': data.ProchainPaiement
        })
            .then(function (response) {
                console.log(response.data);
                se
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
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"className='fw-4'>
                    Modifier un Paiement
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form onSubmit={handleSubmit(updatePaiement)}>

                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Reference</Form.Label>
                        <Form.Control type="text" {...register("RefPaiement", { required: true, min:0 })} defaultValue={props.data.RefPaiement} />
                        {errors.RefPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
                    </Form.Group>

                    <Form.Select aria-label="Default select example" {...register("formation_id", { required: true })} className='mb-3'controlId="fil" defaultValue={props.data.formation_id}>
                        <option>Choisir la filière</option>
                        {
                            props.paiement.length!=0 && (
                                props.paiement.Fileres.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id} selected={element.formation_id == props.data.formation_id}>{element.nomForm}</option>
                                    );
                                })
                            )
                        }
                    </Form.Select>
                    {errors.formation_id?.type==='required' && <span className='text-danger'>Le nom de la filière est Obligatoire</span>}


                    <Form.Select aria-label="Default select example" {...register("Etudiant_id", { required: true })} className='mb-3' controlId="fil" defaultValue={props.data.Etudiant_id}>
                        <option>Choisir l'étudiant</option>
                        {
                            props.paiement.length!=0 && (
                                props.paiement.etudiants.map((element, index) => {
                                    return (
                                        <option key={index} value={element.id} selected={element.Etudiant_id == props.data.Etudiant_id}>{element.nomEtud}</option>
                                    );
                                })
                            )
                        }
                    </Form.Select>
                    {errors.Etudiant_id?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}


                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Montant Du Paiement</Form.Label>
                        <Form.Control type="number" {...register("MontantPaiement", { required: true, min:0 })}  defaultValue={props.data.MontantPaiement}/>
                        {errors.MontantPaiement?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
                        {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
                    </Form.Group>


                    <Form.Select aria-label="Default select example" {...register("MoyenPaiement", { required: true })} className='mb-3'controlId="" defaultValue={props.data.MoyenPaiement}>
                        <option>Moyen De Paiement</option>
                        <option value="Orange Money">Orange Money</option>
                        <option value="MTN Monney">MTN Money</option>
                        <option value="Virement Bancaire">Virement Bancaire</option>
                        <option value="Espèce">Espèce</option>
                    </Form.Select>
                    {errors.MoyenPaiement?.type==='required' && <span className='text-danger'>Le statut est Obligatoire</span>}

                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Motif</Form.Label>
                        <Form.Control type="text" {...register("MotifPaiement", { required: true, min:0 })} defaultValue={props.data.MotifPaiement} />
                        {errors.MotifPaiement?.type==='required' && <span className='text-danger'>La Referemce est Obligatoire</span>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="" >
                        <Form.Label>Prochain Paiement</Form.Label>
                        <Form.Control type="date" {...register("ProchainPaiement", { required: true,
                            validate:(value) => new Date(value) > dateActuelle})} defaultValue={props.data.ProchainPaiement}/>
                        {errors.ProchainPaiement?.type==='required' && <span className='text-danger'>La date du prochain paiement est Obligatoire</span>}
                        {errors.ProchainPaiement?.type==='validate' && <span className='text-danger'>Cette date doit être supérieure à la date d'aujourd'hui </span>}
                    </Form.Group>

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
        </Modal>
    );
}

const PaieFact = () => {

    const history= useNavigate()
    const [show1, setShow1] = useState(false);
    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);

    const [leon, setleon] = useState([]);

    const [allPaiement, setallPaiement] = useState([])
    const [newarr, setnewarr] = useState([]); //pour conserver la valeur de allpaiements lors du filtre (c'est valable pour tous les autres components ou il ya ce state)
    const [records, setRecords] = useState(allPaiement)

    const [params, setparams] = useState([])

    const [idL, setidL] = useState(0)
    const [modalShow, setModalShow] = React.useState(false);

    //Pour montrer la modal la filiere
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const { register, handleSubmit,control,getFieldState,watch,setValue,reset, formState: { errors } } = useForm();
    const keys=['nomEtud', 'prenomEtud'];
    const [searchQuery, setSearchQuery] = useState('');

    //modal pour le filtre
    const [showFilter, setShowFilter] = useState(false);
    const handleCloseFilter = () => setShowFilter(false);

    const [initialFilters, setInitialFilters] = useState({
        startDate: '',
        endDate: '',
        selectedEtudiant: 'Choisir l\'étudiant',
    });

    let totalPaie = 0 //on initialise la somme pour calculer le total des paiements effectues


    const dateActuelle = new Date()

    const [selectedEtudiant, setSelectedEtudiant] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [seRecords, setSeRecords] = useState([]);

    //ajouter un paiement



    const [allpaiebydate, setallpaiebydate] = useState([]) //pour avoir les etudiants en fonction de la date d'inscription //pour afficher tous les etudiants issus du filtre de la filiere  dans le tableau

    async function GetPaiement() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement-Facture`);
            setallPaiement(response.data);
            console.log(response.data)
            JSON.stringify(response.data)
            setnewarr(response.data);
            setallpaiebydate(response.data)
            setSeRecords(response.data)
            setload(false)
        } catch (error) {
            console.log(error);
        }
    }

    async function GetEtudiantsAndFiliere() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/GetEtudiantsAndFiliere`);
            setleon(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }


    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append('Etudiant_id', data.Etudiant_id);
        formData.append('MontantPaiement', data.MontantPaiement);

        axios.post(`${import.meta.env.VITE_URL}/create-paiementFacture`,{
            'Etudiant_id':data.Etudiant_id,
            'MontantPaiement':data.MontantPaiement,
        })
            .then(function (response) {
                console.log(response.data);
                setShow1(false)

                swal({
                    title: "Paiement Créée Avec Succès !!!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "OK",
                    timer: 2000
                });
                GetPaiement()
            })
            .catch(function(error)  {
                console.log(error);
            })
    }

    function setFiltreAllEtudiant(mot) {

        const filteredStudents = newarr.filter(et => et.nomEtud == mot)
        setallPaiement(filteredStudents);
        setShowFilter(false)
    }

    const [dateDebut, setdateDebut] = useState('')
    const [dateFin, setdateFin] = useState('')
    const [state, setstate] = useState(true)


    useEffect(() => {
        if (!load===true){
            GetPaiement()
            GetEtudiantsAndFiliere()
            // GetFiliere()
        }
    },[fresh])


    useEffect(() => {
        if (params.length!==0) {
            setModalShow(true)
        }

    }, [fresh])

    //Modifier les infos d'un paiement

    function handleMan(element) {
        setidL(element.id)
        setparams(element)
        setModalShow(true)
    }


    async function MettreDansLaCorbeille(id) {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_URL}/delete-paiement/${id}/corbeille`);
            // getStudents()
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            setallPaiement(response.data)

            console.log(response.data);
            // history('/etud/inscription')

            swal("Paiement mis dans la corbeille !!!",{
                icon:"success",
            });
            console.log('Cet etudiant a ette mis dans la corbeille');
        } catch (error) {
            console.log('echec de l operation de mise en corbeille du paiement');
        }
    }

    async function Archiver(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/archive-paiement/${id}`);
            setallPaiement(response.data)
            // console.log(response.data);
            // getStudents()
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            swal("Paiement Archivé avec succès !!!",{
                icon:"success",
            });
            console.log(' Paiement Archive ');
        } catch (error) {
            console.log('Paiement Non Archive');
        }
    }

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
                title: "Cocher au moins un paiement",
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

                        axios.post(`${import.meta.env.VITE_URL}/element-paiement`, {
                            data: check,
                        })
                            .then(function (response) {
                                console.log(response.data);

                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000);

                                // getStudentsCorbeille()
                                swal("Etudiant(s) supprimé(s) definitivement !!!",{
                                    icon:"success",
                                });
                                GetPaiement()
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

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
            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);
            setcheck(newArray)


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

    const filterPaiements = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchEtudiant =
                selectedEtudiant === '' ||
                (record.etudiant_id) === parseInt(selectedEtudiant);

            const recordDate = new Date(record.created_at.split(' ')[0]);

            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchEtudiant && dateFilter;
        });

        setallPaiement(filteredRecords);
    };

    useEffect(() => {
        filterPaiements();
    }, [selectedEtudiant, startDate, endDate]);

    const handleShowFilter = () => {
        // Sauvegarde des valeurs actuelles des filtres dans initialFilters
        setInitialFilters({
            startDate,
            endDate,
            selectedEtudiant,
        });

        // Affichage du modal
        setShowFilter(true);
    };

    const resetFilters = () => {
        setStartDate('');
        setEndDate('');
        setSelectedEtudiant('Choisir l\'étudiant');
        GetPaiement()
    };

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
                            <h1>Paiements</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Paiements</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Listes paiements effectué</h3>
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
                                                                                    <strong>Supprimer plusieurs paiements</strong>.
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
                                                                                    <strong>Filtrer les paiements</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={handleShowFilter} data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaFilter className="text-primary" size={24} style={{ cursor:'pointer' }}/></Button>
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

                                                                                <Row className='d-flex justify-content-center mb-3'>

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
                                                                                        <span>Etudiant</span>
                                                                                        <Form.Select aria-label="Default select example" className='mb-3' value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)}>
                                                                                            <option>Choisir l'étudiant</option>
                                                                                            {
                                                                                                leon.length !== 0 && (
                                                                                                    leon.etudiants.map((element, index)=> {
                                                                                                        return (
                                                                                                            <option key={index} value={element.id}>{element.nomEtud+' '+element.prenomEtud}</option>
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

                                                                    <thead style={{backgroundColor: '#1A3C30' , height:'100px', width:'350%'}} className='text-white fs-6 items-center'>
                                                                    <tr style={{backgroundColor: '#1A3C30', borderBottomColor:'transparent'}}>
                                                                        {['right'].map((placement) => (
                                                                            <OverlayTrigger
                                                                                key={placement}
                                                                                placement={placement}
                                                                                overlay={
                                                                                    <Tooltip id={`tooltip-${placement}`}>
                                                                                        <strong>Creer un paiement</strong>.
                                                                                    </Tooltip>
                                                                                }
                                                                            >
                                                                                <Button variant="transparent" size="lg" className='mb-3' onClick={handleShow1} ><IoMdAddCircle className="text-white" size={36} style={{ cursor:'pointer' }}/></Button>
                                                                            </OverlayTrigger>
                                                                        ))}

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
                                                                        <th>Date</th>
                                                                        <th>Noms</th>
                                                                        <th>Montant</th>
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
                                                                            allPaiement.filter((element) =>
                                                                                keys.some((key) => {
                                                                                    const value = element[key];
                                                                                    if (typeof value === 'string') {
                                                                                        return value.toLowerCase().includes(searchQuery);
                                                                                    }

                                                                                    return false;


                                                                                }),
                                                                            ).map((element,index) => {
                                                                                const isChecked = selectedRecords.includes(element.id);
                                                                                totalPaie = totalPaie + element.MontantPaiement
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

                                                                                            <td></td>
                                                                                            <td>{element.created_at.split(' ')[0]}</td>
                                                                                            <td key={index}>{element.nomEtud+' '+element.prenomEtud}</td>
                                                                                            <td key={index}>{element.MontantPaiement} FCFA</td>
                                                                                        </tr>
                                                                                        <MyVerticallyCenteredModal
                                                                                            show={(idL===element.id) && modalShow}
                                                                                            onHide={() => setModalShow(false)}
                                                                                            data={params}
                                                                                            paiement={leon}
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
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{totalPaie} FCFA</p>
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

            <Modal show={show1} size="lg" onHide={handleClose1} aria-labelledby="contained-modal-title-vcenter" centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='fw-4'>Ajouter un Paiement</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <Form.Select aria-label="Default select example" {...register("Etudiant_id", { required: true })} className='mb-3' controlId="fil" >
                            <option>Choisir l'étudiant</option>
                            {
                                leon.length!=0 && (
                                    leon.etudiants.map((element, index) => {
                                        return (
                                            <option key={index} value={element.id}>{element.nomEtud+' '+element.prenomEtud}</option>
                                        );
                                    })
                                )
                            }
                        </Form.Select>
                        {errors.Etudiant_id?.type==='required' && <span className='text-danger'>Le nom de l'etudiant est Obligatoire</span>}

                        <Form.Group className="mb-3" controlId="" >
                            <Form.Label>Montant Du Paiement</Form.Label>
                            <Form.Control type="number" {...register("MontantPaiement", { required: true, min:0 })}  />
                            {errors.MontantPaiement?.type==='required' && <span className='text-danger'>Le montant est Obligatoire</span>}
                            {/* {errors.paye?.type === 'min' && <span>Le montant total ne peut pas être inférieur à 0</span>} */}
                        </Form.Group>


                        <Row className='text-center mt-5'>
                            <Col className='col-md-6'>
                                <Button type={"submit"} variant="primary" size="lg" className='mb-3 w-75' >Créer</Button>{' '}
                            </Col>

                            <Col className='col-md-6'>
                                <Button type={"reset"} variant="warning" size="lg" className='mb-3 w-75' >Annuler</Button>{' '}
                            </Col>
                        </Row>
                    </Form>

                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default PaieFact;