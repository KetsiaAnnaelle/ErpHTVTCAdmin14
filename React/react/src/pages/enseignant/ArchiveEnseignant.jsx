import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";
import.meta.env.VITE_URL;

const ArchiveEnseignant = () => {

    const [show, setShow] = useState(false);
    const [fresh, setfresh] = useState(false);
    const [load, setload] = useState(false);
    const [done, setdone] = useState(false)
    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const history=useNavigate()

    const [perso, setperso] = useState([])
    const [records, setRecords] = useState(perso)

    const [params, setparams] = useState([])
    const [modalShow, setModalShow] = React.useState(false);
    const [idL, setidL] = useState(0)

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['nivEtudEns', 'dernDiplEns','typeContratEns', 'nomEns','prenomEns'];

    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedPoste, setSelectedPoste] = useState('');
    const [selectedPerso, setSelectedPerso] = useState('');
    const [selectedTypeContrat, setSelectedTypeContrat] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [seRecords, setSeRecords] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let total=0

    const createdPerso = new Date(perso.created_at);
    const formatdate = createdPerso.toLocaleDateString();

// fonction pour lister les abscences

    async function getEnseignants() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/penseignantsArchiver`);
            setperso(response.data);
            setRecords(response.data);
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

    const handleSupprimeSelected = () => {
        if (selectedRecords.length === 0) {
            // Afficher un message d'erreur car rien n'est sélectionné
            return;
        }

        axios.put(`${import.meta.env.VITE_URL}/enseignant/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimé !", "Les recrutements sélectionnées ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const handleRestauresSelected = () => {
        if (selectedRecords.length === 0) {
            // Afficher un message d'erreur car rien n'est sélectionné
            return;
        }

        axios.put(`${import.meta.env.VITE_URL}/enseignant/elementRestaure`, { ids: selectedRecords })
            .then(function (response) {
                swal("Restauré !", "Les enseignants sélectionnés ont été restauré.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const delPersonnel = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimer ?",
            text: "Vous risquez de ne plus pouvoir restaurer cet enseignant !",
            icon: "warning",
            buttons: {
                confirm: "Oui, supprimer!",
                cancel: "Non, annuler!"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Pour mettre à jour le champ 'supprimer' de le stage en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/enseignant/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre recrutement a bien été supprimé.", "success");
                            // Rechargez la page après la suppression
                            window.location.reload();
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    const restaurerPersonnel = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimer ?",
            text: "Vous risquez de ne plus pouvoir restaurer ce recrutement !",
            icon: "warning",
            buttons: {
                confirm: "Oui, Restaurer!",
                cancel: "Non, Supprimer!"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Pour mettre à jour le champ 'supprimer' le stage en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/enseignant/${id}/archiverRestaurer`, { archiver: 0 })
                        .then(function(response) {
                            swal("Restauré!", "Votre recrutement a été marquée comme Restauré.", "success");
                            window.location.reload()
                        })
                        .catch(function(error) {
                            console.error(error);
                        });
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    }

//filtrer les personnels

    const filterPersonnels = () => {
        const filteredRecords = seRecords.filter((record) => {
            const matchPerso =
                selectedPerso === '' ||
                (record.nomPerso + ' ' + record.prenomPerso) === selectedPerso;
            const matchPoste =
                selectedPoste === '' || record.postePerso === selectedPoste;

            const matchTypeContrat =
                selectedTypeContrat === '' || record.typeContratPerso === selectedTypeContrat;

            // Obtenez la date de l'enregistrement sous forme de date JavaScript
            const recordDate = new Date(record.created_at);

            // Vérifiez si la date de l'enregistrement est comprise entre startDate et endDate
            const dateFilter =
                (!startDate || recordDate >= new Date(startDate)) &&
                (!endDate || recordDate <= new Date(endDate));

            // Combinez toutes les conditions de filtrage
            return matchPerso && matchPoste && matchTypeContrat && dateFilter;
        });

        setRecords(filteredRecords);
    };

    useEffect(() => {
        filterPersonnels()
    }, [selectedPoste, selectedTypeContrat, selectedPerso, startDate, endDate]);

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
                            <h1>Archives</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/enseignant/fiche_cours">Recrutements</NavLink></li>
                                    <li className="breadcrumb-item active">Archives</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des recrutements dans l'archive</h3>
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
                                                                                    <strong>Supprimer plusieurs recrutements</strong>.
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
                                                                                    <strong>Restaurer plusieurs recrutements</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                <Table responsive>
                                                                    <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
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
                                                                                                                <strong>Restaurer personnel</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>restaurerPersonnel(element.id)}><AiFillCheckCircle className='text-success me-1' style={{ cursor:'pointer' }}/></Button>
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
                                                                                                                <strong>Supprimer personnel</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delPersonnel(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total Enseignants : {total} </p>
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

        </Container>
    );
};

export default ArchiveEnseignant;