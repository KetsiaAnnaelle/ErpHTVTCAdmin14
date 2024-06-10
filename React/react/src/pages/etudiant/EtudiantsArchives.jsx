import React from 'react';
import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import {Col, Container, Form, Row, Table} from "react-bootstrap";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {NavLink} from "react-router-dom";
import {BsSearch} from "react-icons/bs";
import axios from "axios";
import { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import.meta.env.VITE_URL;

const EtudiantsArchives = () => {

    const [allstud, setallstud] = useState([])//tous les etudiants de la corbeille
    const [load, setload] = useState(false)

    async function getStudentsArchives() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-etudiant-archives`);
            setallstud(response.data);
            setload(false)
            //setallstudbydate(response.data.data) //ici on recupere tous les eleves stockes et qui vont subir les filtres
        } catch (error) {
            console.error('Erreur lors de la recuperation des etudiants');
        }
    }

    async function RestaurerEtudiantArchivé(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/restore-student/${id}/archivé`);
            setallstud(response.data);

            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            swal("Etudiant Restauré avec succès !!!",{
                icon:"success",
            });
            // history('/etud/inscription')
        } catch (error) {
            console.error('Erreur lors de la restauration de l etudiant');
        }
    }

    useEffect(() => {
        getStudentsArchives()
        // getStudents()
    }, [])

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
                            <h1>Archives</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/inscription">Etudiants</NavLink></li>
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
                                                <h3 className="card-title">Liste des etudiants archivé</h3>
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
                                                                    <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th>Date d'archivage</th>
                                                                        <th>Nom</th>
                                                                        <th>Prenom</th>
                                                                        <th>Sexe</th>
                                                                        <th>Tél</th>
                                                                        <th>Whatsapp</th>
                                                                        <th>Formation</th>
                                                                        <th>Action</th>
                                                                        {/* <th></th> */}
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
                                                                            allstud.map((element, index)=>{
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
                                                                                            <td>{element.archived_at}</td>
                                                                                            <td>{element.nomEtud}</td>
                                                                                            <td>{element.prenomEtud}</td>
                                                                                            <td>{element.sexe}</td>
                                                                                            <td>{element.telEtud}</td>
                                                                                            <td>{element.whatsappEtud}</td>
                                                                                            <td>{element.nomForm}</td>
                                                                                            {/* <td key={index}>{element.nomForm}</td> */}
                                                                                            <td>
                                                <span>
                                                    {/* <FaFileArchive className="text-warning" style={{ color:'red', cursor:'pointer' }} onClick={()=>RestaurerEtudiantArchivé(element.id)}/>                                                */}
                                                    <button className=" btn btn-info text-light" style={{ color:'red', cursor:'pointer' }} onClick={()=>RestaurerEtudiantArchivé(element.id)}> Restaurer </button>
                                                </span>
                                                                                            </td>

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
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{allstud.length}</p>
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

export default EtudiantsArchives;