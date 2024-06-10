import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";
import { Col, Container, Row, Button, Modal, Form, Table, Alert, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';
import swal from 'sweetalert';
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";
import {IoMdAddCircle} from "react-icons/io";
import ReactPaginate from 'react-paginate';
import HeaderGeneral from '../../../component/HeaderGeneral.jsx';
import.meta.env.VITE_URL;
import BarreLateraleDepense from '../../../component/BarreLateraleDepense.jsx';


const Entree = () => {
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
                            <h1>Entrées</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                    <li className="breadcrumb-item active">Entrées</li>
                                </ol>
                            </nav>
                        </div>

                        <section className="section form">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="row">

                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Listes des Entrées</h3>
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
                                                                                    <strong>Supprimer plusieurs Entrées</strong>.
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
                                                                                    <strong>Restaurer plusieurs Entrées</strong>.
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Button variant="transparent" className='mb-3 ms-3' onClick={()=>handleRestauresSelected(selectedRecords)}><AiFillCheckCircle className="text-success"  size={24} style={{ cursor:'pointer' }} /></Button>
                                                                        </OverlayTrigger>
                                                                    ))}
                                                                </Form>

                                                                {/* <Form>
                                                                    <Row className='d-flex justify-content-center mb-3'>
                                                                        <Col className='col-md-2'>
                                                                            <Form.Group className="mb-3" controlId="dateDeb">
                                                                                <span>Periode de</span>
                                                                                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <Form.Group className="mb-3" controlId="dateFin">
                                                                                <span>à</span>
                                                                                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Filière</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedFormation} onChange={(e) => setSelectedFormation(e.target.value)}>
                                                                                <option>Choisir la filière</option>
                                                                                {
                                                                                    // fact.length !== 0 && (
                                                                                    //     [...new Set(fact.map((element) => element.nomForm))].map((nom, index) => {
                                                                                    //         return (
                                                                                    //             <option key={index} value={nom}>{nom}</option>
                                                                                    //         );
                                                                                    //     })
                                                                                    // )

                                                                                    leon.length!==0 && (
                                                                                        leon.Fileres.map((element,index) => {
                                                                                            return(
                                                                                                <option key={index} value={element.nomForm}>{element.nomForm}</option>
                                                                                            )
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Etudiant</span>
                                                                            <Form.Select aria-label="Default select example" className='mb-3' value={selectedEtudiant} onChange={(e) => setSelectedEtudiant(e.target.value)}>
                                                                                <option>Choisir l'étudiant</option>
                                                                                {
                                                                                    // fact.length !== 0 && (
                                                                                    //     [...new Set(fact.map((element) => element.nomEtud+' '+element.prenomEtud))].map((nom, index) => {
                                                                                    //         return (
                                                                                    //             <option key={index} value={nom}>{nom}</option>
                                                                                    //         );
                                                                                    //     })
                                                                                    // )

                                                                                    leon.length!==0 && (
                                                                                        leon.etudiants.map((element,index) => {
                                                                                            return(
                                                                                                <option key={index} value={element.nomEtud}>{element.nomEtud}</option>
                                                                                            )
                                                                                        })
                                                                                    )
                                                                                }
                                                                            </Form.Select>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Echéance</span>
                                                                            <Form.Group className="mb-3" >
                                                                                <Form.Control type="date"  value={echeanceDate} onChange={(e) => setecheanceDate(e.target.value)}/>
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col className='col-md-2'>
                                                                            <span>Statut</span>
                                                                            <Form.Select value={selectedstatus} onChange={(e) => setSelectedstatus(e.target.value)} aria-label="Default select example" className='mb-3'>
                                                                                <option>Choisir le statut</option>
                                                                                <option value="Réglé">Réglé</option>
                                                                                <option value="Partiellement Réglé">Partiellement Réglé</option>
                                                                                <option value="Rembourssement">Rembourssement</option>
                                                                                <option value="Brouillon">Brouillon</option>

                                                                            </Form.Select>
                                                                        </Col>
                                                                    </Row>
                                                                </Form> */}

                                                                
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

export default Entree;