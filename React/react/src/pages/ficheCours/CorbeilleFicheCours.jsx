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
import.meta.env.VITE_URL;
import BarreLateraleEns from "../../component/BarreLateraleEns.jsx";

const CorbeilleFicheCours = () => {

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

    const [searchQuery, setSearchQuery] = useState('');
    const keys=['prenomEns', 'nomEns'];

    const [seRecords, setSeRecords] = useState([]);
    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let total=0

    const createdPerso = new Date(perso.created_at);
    const formatdate = createdPerso.toLocaleDateString();

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [currentDescriptionId, setCurrentDescriptionId] = useState(null);

// fonction pour lister les abscences

    async function getFicheCours() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/ficheCoursSupprimer`);
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
            getFicheCours()
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

    const handleDeleteSelected = () => {
        console.log(check)
        if (check.length==0 || selectedRecords.length==0){
            // swal({
            //     text: "Sélectionnez au moins un stage !!!",
            //     icon: "info",
            //     button: "OK",
            //     timer: 10000
            // });
        }else {
            axios.put(`${import.meta.env.VITE_URL}/ficheCour/element`, {
                data: selectedRecords,
            })
                .then(function (response) {
                    swal("Supprimées !", "Les fiches de cours sélectionnées ont été supprimé définitivement.", "success");
                    window.location.reload();
                    console.log(response.data)
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

        axios.put(`${import.meta.env.VITE_URL}/ficheCour/elementRestaure`, { ids: selectedRecords })
            .then(function (response) {
                swal("Restauré !", "Les fiches de cours sélectionnées ont été restauré.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const delFicheTravail = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimer ?",
            text: "Vous risquez de ne plus pouvoir restaurer cette fiche de cours !",
            icon: "warning",
            buttons: {
                confirm: "Oui, supprimer!",
                cancel: "Non, annuler!"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    axios
                        .delete(`${import.meta.env.VITE_URL}/ficheCour/` + id)
                        .then(function(response) {
                            swal("Supprimé!", "Votre fiche de cours a bien été supprimé.", "success");
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

    const restaurerFicheTravail = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimer ?",
            text: "Vous risquez de ne plus pouvoir restaurer cette fiche de cours !",
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
                        .put(`${import.meta.env.VITE_URL}/ficheCour/${id}/archiverRestaurer`, { archiver: 0 })
                        .then(function(response) {
                            swal("Restauré!", "Votre fiche de cours a été marqué comme Restaurée.", "success");
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

    const toggleDescription = (id) => {
        setShowFullDescription(!showFullDescription);
        setCurrentDescriptionId(id);
    };

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
                            <h1>Corbeille fiches cours</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/enseignant/fiche_cours">Fiches cours</NavLink></li>
                                    <li className="breadcrumb-item active">Corbeille fiches cours</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des fiches de cours dans la corbeille</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
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
                                                                                    <strong>Supprimer définitivement plusieurs fiches</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleDeleteSelected(selectedRecords)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }}/></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                    {['bottom'].map((placement) => (
                                                                        <OverlayTrigger
                                                                            key={placement}
                                                                            placement={placement}
                                                                            overlay={
                                                                                <Tooltip id={`tooltip-${placement}`}>
                                                                                    <strong>Restaurer plusieurs fiches</strong>.
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
                                                                        <th>Nom</th>
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
                                                                                const createdPerso = new Date(element.created_at);
                                                                                const formatdate = createdPerso.toLocaleDateString();

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
                                                                                                                <strong>Restaurer fiche</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>restaurerFicheTravail(element.id)}><AiFillCheckCircle className='text-success me-1' style={{ cursor:'pointer' }}/></Button>
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
                                                                                                                <strong>Supprimer fiche</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delFicheTravail(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td>{formatdate}</td>
                                                                                            <td key={index}>{element.nomEns +' '+element.prenomEns}</td>
                                                                                            <td key={index}>
                                                                                                {element.description.length > 15 ? (
                                                                                                    <>
                                                                                                        {showFullDescription && currentDescriptionId === element.id  ? (
                                                                                                            <>{element.description} </>
                                                                                                        ) : (
                                                                                                            <>{element.description.slice(0, 15)}... </>
                                                                                                        )}
                                                                                                        <Button
                                                                                                            variant="link"
                                                                                                            size="sm"
                                                                                                            onClick={() => toggleDescription(element.id)}
                                                                                                        >
                                                                                                            {showFullDescription && currentDescriptionId === element.id
                                                                                                                ? 'Voir moins'
                                                                                                                : 'Voir plus'}
                                                                                                        </Button>
                                                                                                    </>
                                                                                                ) : (
                                                                                                    <>{showFullDescription ? element.description : element.description.slice(0, 15) + '...'}</>
                                                                                                )}
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total Fiches de cours : {total} </p>
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

export default CorbeilleFicheCours;