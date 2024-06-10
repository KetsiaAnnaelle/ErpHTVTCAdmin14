import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import {Container, Col, Row, Form, Table, Button, OverlayTrigger, Tooltip, Nav} from 'react-bootstrap'
import {BsSearch} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import {FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import axios from "axios";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';
import ReactLoading from 'react-loading';
import BarreLateralePerso from "../../component/BarreLateralePerso.jsx";
import.meta.env.VITE_URL;

const ArchiveCarriereEns = () => {

    const [records, setRecords] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const keys=['prenomPerso', 'nomPerso', 'AncienPostePerso','NouveauPostePerso','MotifPromotionPerso'];
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)

    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let total=0

    async function getCarrieresArchiver() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/carrieresArchiver`);
            setRecords(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        if (!load===true){
            getCarrieresArchiver()
        }
    },[fresh])

    const delCarriere = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimé ?",
            text: "Vous risquez de ne plus pouvoir restauré cette carriere!",
            icon: "warning",
            buttons: {
                confirm: "Oui, supprimer!",
                cancel: "Non, annuler!"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Pour mettre à jour le champ 'supprimer' de l'carriere en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/carriere/${id}/supprimer`, { supprimer: 1 })
                        .then(function(response) {
                            swal("Supprimé!", "Votre carriere a bien été supprimé.", "success");
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

    const restaurerCarriere = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir restauré ?",
            text: "Elle reviendra dans la liste de carriere !",
            icon: "warning",
            buttons: {
                confirm: "Oui, Restaurer!",
                cancel: "Non"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Pour mettre à jour le champ 'supprimer' de l'carriere en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/carriere/${id}/archiverRestaurer`, { archiver: 0 })
                        .then(function(response) {
                            swal("Restauré!", "Votre carriere a été marqué comme Restaurée.", "success");
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

    const handleRestaureSelected = () => {
        if (selectedRecords.length === 0) {
            // Afficher un message d'erreur car rien n'est sélectionné
            return;
        }

        axios.put(`${import.meta.env.VITE_URL}/carriere/elementRestaure`, { ids: selectedRecords })
            .then(function (response) {
                swal("Restaurées !", "Les carrieres sélectionnées ont été restauré.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/carriere/elementSupprime`, { ids: selectedRecords })
            .then(function (response) {
                swal("Supprimées !", "Les carrieres sélectionnées ont été supprimé.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

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
                            <h1>Archives</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/carriere">Carriere</NavLink></li>
                                    <li className="breadcrumb-item active">Archives</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <section className="content">
                                            <div className="card">
                                                <div className="card-header my-3">
                                                    <h3 className="card-title">Liste des carrieres archivées</h3>
                                                </div>
                                                <div className="card-body">
                                                    <Form className='d-flex justify-content-center'>
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
                                                                        <strong>Supprimer plusieurs carrieres</strong>.
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
                                                                        <strong>Restaurer plusieurs carrieres</strong>.
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestaureSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                            </OverlayTrigger>
                                                        ))}
                                                    </Form>
                                                    <Table responsive>
                                                        <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center'>
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
                                                                    <td colSpan={9} align='center'>
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
                                                                                                    <strong>Restaurer carrière</strong>.
                                                                                                </Tooltip>
                                                                                            }
                                                                                        >
                                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>restaurerCarriere(element.id)} ><AiFillCheckCircle className='text-success me-1'  style={{ cursor:'pointer' }}/></Button>
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
                                                                                                    <strong>Supprimer carrière</strong>.
                                                                                                </Tooltip>
                                                                                            }
                                                                                        >
                                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delCarriere(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                        </OverlayTrigger>
                                                                                    ))}
                                                                                </td>
                                                                                <td>{formatdate}</td>
                                                                                <td key={index}>{element.nomPerso +' '+element.prenomPerso}</td>
                                                                                <td key={index}>{element.AncienPostePerso}</td>
                                                                                <td key={index}>{element.NouveauPostePerso}</td>
                                                                                <td key={index}>{element.salairePerso}</td>
                                                                                <td key={index}>{element.NouveauSalairePerso}</td>
                                                                                <td key={index}>{element.MotifPromotionPerso}</td>
                                                                            </tr>
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                        </tbody>

                                                    </Table>
                                                </div>
                                                <div className="card-footer">
                                                    <p className='text-danger fs-4 fw-3 mt-3'>Total de carrières : {total}  </p>
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

                                        </section>

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

export default ArchiveCarriereEns;