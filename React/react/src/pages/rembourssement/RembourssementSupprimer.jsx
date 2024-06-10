import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import swal from "sweetalert";
import {Button, Col, Container, Form, Row, Table, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BsSearch} from "react-icons/bs";
import {AiFillCheckCircle} from "react-icons/ai";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";
import { IoMdAddCircle } from "react-icons/io";

const RembourssementSupprimer = () => {

    const [records, setRecords] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [fresh, setfresh] = useState(false)
    const [load, setload] = useState(false)

    const [selectedRecords, setSelectedRecords] = useState([]);

    const [check, setcheck] = useState([]);
    const [checkAll, setcheckAll] = useState(false);

    const keys=['echeance', 'status','nomEtud', 'nomForm'];

    const [pageNumber, setPageNumber] = useState(0);
    const perPage = 20; // Nombre d'éléments par page

    let totals=0
    let payee=0
    let reste=0

    async function getRembourssementSupprimer() {
    try {
    const response = await axios.get(`${import.meta.env.VITE_URL}/rembourssementsSupprimer`);
    setRecords(response.data);
    } catch (error) {
    console.error(error);
    }
    }

    useEffect(() => {
    if (!load===true){
    getRembourssementSupprimer()
    }
    },[fresh])

    const delRembourssement = async (id) => {
    swal({
    title: "Etes-vous certains de vouloir supprimer ?",
    text: "Vous risquez de ne plus pouvoir restaurer ce rembourssement !",
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
    .delete(`${import.meta.env.VITE_URL}/rembourssement/` + id)
    .then(function(response) {
    swal("Supprimé!", "Votre rembourssement a bien été supprimée.", "success");
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

    const restaurerRembourssement = async (id) => {
    swal({
    title: "Etes-vous certains de vouloir supprimer ?",
    text: "Vous risquez de ne plus pouvoir restaurer ce rembourssement !",
    icon: "warning",
    buttons: {
    confirm: "Oui, Restaurer!",
    cancel: "Non, Supprimer!"
    },
    dangerMode: true
    })
    .then((isConfirm) => {
    if (isConfirm) {
    // Pour mettre à jour le champ 'supprimer' de l'rembourssement en le mettant à 1
    axios
    .put(`${import.meta.env.VITE_URL}/rembourssement/${id}/archiverRestaurer`, { archiver: 0 })
    .then(function(response) {
    swal("Restauré!", "Votre rembourssement a été marquée comme Restaurée.", "success");
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

    // fonction pour selectionner plusieurs cases à la fois

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

    axios.put(`${import.meta.env.VITE_URL}/rembourssement/elementRestaure`, { ids: selectedRecords })
    .then(function (response) {
    swal("Restaurées !", "Les rembourssements sélectionnées ont été restaurées.", "success");
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
    // text: "Sélectionnez au moins une abscence !!!",
    // icon: "info",
    // button: "OK",
    // timer: 10000
    // });
    }else {
    axios.post(`${import.meta.env.VITE_URL}/rembourssement/element`, {
    data: selectedRecords,
    })
    .then(function (response) {
    swal("Supprimées !", "Les rembourssements sélectionnées ont été supprimées définitivement.", "success");
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
        <BarreLateraleFact/>
        </Col>
        <Col className='col-lg-12'>
        <main id="main" className="main">

        <div className="pagetitle">
        <h1>Corbeille</h1>
        <nav>
        <ol className="breadcrumb">
        <li className="breadcrumb-item"><NavLink to="/rembour">Rembourssement</NavLink></li>
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
        <h3 className="card-title">Liste des rembourssements dans la corbeille</h3>
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
        <strong>Supprimer définitivement plusieurs remboursements</strong>.
        </Tooltip>
        }
        >
        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleDeleteSelected}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }}/></Button>
        </OverlayTrigger>
        ))}
        {['bottom'].map((placement) => (
        <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={
        <Tooltip id={`tooltip-${placement}`}>
        <strong>Restaurer plusieurs remboursements</strong>.
        </Tooltip>
        }
        >
        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestaureSelected(selectedRecords)}><AiFillCheckCircle className="text-success" size={24} style={{ cursor:'pointer' }} /></Button>
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
        <th>Total</th>
        <th>Payer</th>
        <th>Restant</th>
        <th>Echeance</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {
        records.filter((element) =>
        keys.some((key) => {
        const value = element[key];
        if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery);
        }
        return false;
        })
        ).map((element,index) => {
        totals=totals+element.total
        payee=payee+element.paye
        reste=reste+element.restant
        const isChecked = selectedRecords.includes(element.id);
        const createdDate = new Date(element.created_at);
        const formatdate = createdDate.toLocaleDateString();
        return(
        <>
        <tr key={index}>
        <td>
        {['checkbox'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
        <Form.Check
        inline
        type="checkbox"
        className="mb-3"
        checked={isChecked}
        onClick={() => checkedAll(element.id)}
        />
        </div>
        ))}
        </td>
        <td>
        {['bottom'].map((placement) => (
        <OverlayTrigger
        key={placement}
        placement={placement}
        overlay={
        <Tooltip id={`tooltip-${placement}`}>
        <strong>Restaurer rembourssement</strong>.
        </Tooltip>
        }
        >
        <Button variant="transparent" className='mb-3 ms-3' onClick={()=>restaurerRembourssement(element.id)} ><AiFillCheckCircle className='text-primary me-1' style={{ cursor:'pointer' }}/></Button>
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
        <strong>Supprimer rembourssement</strong>.
        </Tooltip>
        }
        >
        <Button variant="transparent" className='mb-3 ms-3' onClick={delRembourssement(element.id)}><FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /></Button>
        </OverlayTrigger>
        ))}
        </td>
        <td>{element.echeance}</td>
        <td key={index}>{element.nomEtud}</td>
        <td key={index}>{element.nomForm}</td>
        <td key={index}>{element.total}</td>
        <td>{element.paye}</td>
        <td>{element.total - element.paye}</td>
        <td>{element.echeance}</td>
        <td>{element.status}</td>
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
        <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures : <span className='text-primary'>{totals}</span> FCFA </p>
        <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures payé : <span className='text-success'>{payee}</span> FCFA </p>
        <p className='fw-bold fs-5 fw-3 mt-3'>Total des factures restant : <span className='text-danger'>{reste}</span> FCFA </p>
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

export default RembourssementSupprimer;