import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import ReactLoading from 'react-loading';
import { Col, Container, Row, Button, Form, Table, Modal } from 'react-bootstrap';
import {BsSearch, } from "react-icons/bs";
import {FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import axios from "axios";
import BarreLateraleFact from "../../component/BarreLateraleFact.jsx";

const CorbeillePaiement = () => {

    const [delpaiement, setdelpaiement] = useState(false)
    const [allPaiement, setallPaiement] = useState([])

    const [load, setload] = useState(false);
    const [fresh, setfresh] = useState(false)

    async function getPaiementsCorbeille() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-paiement-corbeille`);
            setallPaiement(response.data);
            // console.log(response.data);
            setload(false)
            // setallstudbydate(response.data.data) //ici on recupere tous les eleves stockes et qui vont subir les filtres
        } catch (error) {
            console.error('Erreur lors de la recuperation des paiements');
        }
    }


    async function RestaurerPaiementDansLaCorbeille(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/restore-paiement/${id}/corbeille`);
            getPaiementsCorbeille()
            setallPaiement(response.data);

            // setTimeout(() => {
            //     window.location.reload() //pour actualiser la page automatiquement
            // }, 2000);

            swal("Paiement Restauré avec succès !!!",{
                icon:"success",
            });
            // history('/etud/inscription')
        } catch (error) {
            console.error('Erreur lors de la restauration de le paiement');
        }
    }


    // console.log(allPaiement);

    function alertForDeleteStudent(id) {
        swal({
            title: `Voulez-vous vraiment supprimer ce paiement?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
            .then((willDelete)=>{
                if (willDelete) {
                    // async function delStudents(id) {
                    try {
                        const response = axios.delete(`${import.meta.env.VITE_URL}/force-delete-paiement/${id}`);
                        console.log(response);
                        setdelpaiement(!delpaiement);
                        setallPaiement(response.data)


                        setTimeout(() => {
                            window.location.reload() //pour actualiser la page automatiquement
                        }, 2000);

                        // getStudentsCorbeille()
                        swal("Paiement supprimé definitivement !!!",{
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

    useEffect(() => {

        if (!load===true) {
            getPaiementsCorbeille()
        }
    }, [])

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
                                    <li className="breadcrumb-item"><NavLink to="/fact/paie">Paiements</NavLink></li>
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
                                                <h3 className="card-title">Liste des paiements dans la corbeille</h3>
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
                                                                </Form>

                                                                <Table responsive>
                                                                    <thead style={{backgroundColor: '#1A3C30' , height:'100px'}} className='text-white fs-6 items-center' >
                                                                    <tr>
                                                                        <th></th>
                                                                        <th></th>
                                                                        <th></th>
                                                                        <th>Date de Suppression</th>
                                                                        <th>Date Du Paiement</th>
                                                                        <th>Reference</th>
                                                                        <th>Filière</th>
                                                                        <th>paiement</th>
                                                                        <th>Montant</th>
                                                                        <th>Moyen de Paiement</th>
                                                                        <th>Motif</th>
                                                                        <th>Prochain Paiement</th>
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
                                                                            allPaiement.map((element, index)=>{
                                                                                return(
                                                                                    <>
                                                                                        <tr key={element.id} style={{ cursor: 'pointer' }} onClick={()=>console.log(element.deleted_at)}>
                                                                                            <td>
                                                                                                {

                                                                                                    ['checkbox'].map((type) => (

                                                                                                        <div key={`inline-${type}`} className="mb-3">
                                                                                                            <Form.Check
                                                                                                                inline
                                                                                                                label=""
                                                                                                                name="group1"
                                                                                                                type={type}
                                                                                                                id={`inline-${type}-1`}

                                                                                                            />
                                                                                                        </div>
                                                                                                    ))
                                                                                                }
                                                                                            </td>
                                                                                            <td>
                                                                                            <button className="btn btn-transparent text-light"  onClick={()=>alertForDeleteStudent(element.id)}> <FaTrashAlt className="text-danger" style={{ cursor:'pointer' }} /> </button>
                                                                                            </td>
                                                                                            <td>
                                                                                            <button className="btn btn-transparent text-light"  onClick={()=>RestaurerPaiementDansLaCorbeille(element.id)}><AiFillCheckCircle className="text-success" style={{ cursor:'pointer' }} /></button>
                                                                                            </td>
                                                                                            <td>{element.deleted_at.split(' ')[0]}</td>
                                                                                            <td>{element.created_at.split(' ')[0]}</td>
                                                                                            <td>{element.RefPaiement}</td>
                                                                                            <td key={index}>{element.nomForm}</td>
                                                                                            <td key={index}>{element.nomEtud}</td>
                                                                                            <td key={index}>{element.MontantPaiement} FCFA</td>
                                                                                            <td>{element.MoyenPaiement}</td>
                                                                                            <td>{element.MotifPaiement}</td>
                                                                                            <td>{element.ProchainPaiement}</td>
                                                                                        </tr>

                                                                                    </>

                                                                                )
                                                                            })

                                                                    }
                                                                    {/* <tr className='text-danger fs-3 fw-3 mt-3'>Total:{allstud.length}</tr> */}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{allPaiement.length}</p>
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

export default CorbeillePaiement;