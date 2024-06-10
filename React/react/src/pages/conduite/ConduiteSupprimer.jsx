import React, {useEffect, useState} from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, OverlayTrigger, Row, Table, Tooltip} from "react-bootstrap";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {NavLink} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import {FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import ReactLoading from "react-loading";
import ReactPaginate from "react-paginate";
import axios from "axios";
import.meta.env.VITE_URL;
import swal from "sweetalert";

const ConduiteSupprimer = () => {

    const [records, setRecords] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const keys=['comprCond', 'nomEtud', 'nomForm',];
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)

    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let total=0

    const mentions = ['Mauvais', 'Moyen', 'Bon', 'Très Bien', 'Excellent']

    async function getConduiteSupprimer() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/conduitesSupprimer`);
            setRecords(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!load===true){
           getConduiteSupprimer()
        }
    },[fresh])

    const delConduite = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimer ?",
            text: "Vous risquez de ne plus pouvoir restaurer cette conduite !",
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
                        .delete(`${import.meta.env.VITE_URL}/conduite/` + id)
                        .then(function(response) {
                            swal("Supprimé!", "Votre conduite a bien été supprimé.", "success");
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

    const restaurerConduite = async (id) => {
        swal({
            title: "Etes-vous certains de vouloir supprimé ?",
            text: "Vous risquez de ne plus pouvoir restauré cette conduite !",
            icon: "warning",
            buttons: {
                confirm: "Oui, Restaurer!",
                cancel: "Non, Supprimer!"
            },
            dangerMode: true
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    // Pour mettre à jour le champ 'supprimer' la conduite en le mettant à 1
                    axios
                        .put(`${import.meta.env.VITE_URL}/conduite/${id}/archiverRestaurer`, { archiver: 0 })
                        .then(function(response) {
                            swal("Restauré!", "Votre conduite a été marqué comme Restaurée.", "success");
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

        axios.put(`${import.meta.env.VITE_URL}/conduite/elementRestaure`, { ids: selectedRecords })
            .then(function (response) {
                swal("Restauré !", "Les conduites sélectionnées ont été restauré.", "success");
                window.location.reload();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

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
            axios.put(`${import.meta.env.VITE_URL}/conduite/element`, {
                data: selectedRecords,
            })
                .then(function (response) {
                    swal("Supprimé !", "Les conduites sélectionnées ont été supprimé définitivement.", "success");
                    window.location.reload();
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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
                    <BarreLateraleEtud/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Corbeille</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/conduite">Conduite</NavLink></li>
                                    <li className="breadcrumb-item active">Corbeille</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Liste des rapports de conduite dans la corbeille</h3>
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
                                                                                    <strong>Supprimer plusieurs conduites définitivement</strong>.
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
                                                                                    <strong>Restaurer plusieurs conduites</strong>.
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
                                                                        <th>Nom Etudiant</th>
                                                                        <th>Filière</th>
                                                                        <th>Comprehension</th>
                                                                        <th>Assiduité</th>
                                                                        <th>Travail personnel</th>
                                                                        <th>Savoir vivre</th>
                                                                        <th>Avis formateur</th>
                                                                        <th>note</th>
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
                                                                                                                <strong>Restaurer conduite</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>restaurerConduite(element.id)} ><AiFillCheckCircle className="text-success" style={{ cursor:'pointer' }} /></Button>
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
                                                                                                                <strong>Supprimer conduite</strong>.
                                                                                                            </Tooltip>
                                                                                                        }
                                                                                                    >
                                                                                                        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>delConduite(element.id)} ><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
                                                                                                    </OverlayTrigger>
                                                                                                ))}
                                                                                            </td>
                                                                                            <td>{element.dateCond}</td>
                                                                                            <td key={index}>{element.nomEtud +' '+element.prenomEtud}</td>
                                                                                            <td key={index}>{element.nomForm}</td>
                                                                                            <td>{mentions[element.comprCond-1]}</td>
                                                                                            <td>{mentions[element.assuidCond-1]}</td>
                                                                                            <td>{mentions[element.travailPersoCond-1]}</td>
                                                                                            <td>{mentions[element.savoirVivrCond-1]}</td>
                                                                                            <td>{element.avisFormcond}</td>
                                                                                            <td>{element.notecond}</td>
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
                                                <p className='text-danger fs-4 fw-3 mt-3'>Total de conduites : {total} </p>
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

export default ConduiteSupprimer;