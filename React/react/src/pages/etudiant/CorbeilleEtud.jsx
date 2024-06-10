import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleEtud from "../../component/BarreLateraleEtud.jsx";
import {BsSearch} from "react-icons/bs";
import React from 'react';
import axios, { all } from "axios";
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import {  Link, useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillDelete } from 'react-icons/ai';
import { FaTrashAlt, FaFileArchive, FaAngleLeft } from 'react-icons/fa';
import Swal from 'sweetalert';
import.meta.env.VITE_URL;

const CorbeilleEtud = () => {

    // const [etudiantdanslacorbeille, setetetudiantdanslacorbeille] = useState([])

    const [allstud, setallstud] = useState([])//tous les etudiants de la corbeille

    const [delstud, setdelstud] = useState(false)

    
    
    const history= useNavigate()
    
    async function getStudentsCorbeille() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-etudiant-corbeille`);
            setallstud(response.data);
            // console.log(response.data);
            //setallstudbydate(response.data.data) //ici on recupere tous les eleves stockes et qui vont subir les filtres
        } catch (error) {
            // console.error('Erreur lors de la recuperation des etudiants');
            console.error(error);
        }
    }
    
    console.log(allstud);
    // const dateDeleted = new Date(allstud.deleted_at)


    function alertForDeleteStudent(id) {
        swal({
            title: `Voulez-vous vraiment supprimer cet étudiant?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
            .then((willDelete)=>{
                if (willDelete) {
                    // async function delStudents(id) {
                    try {
                        const response = axios.delete(`${import.meta.env.VITE_URL}/force-delete-student/${id}`);
                        console.log(response);
                        setdelstud(!delstud);
                        setallstud(response.data)


                        setTimeout(() => {
                            window.location.reload() //pour actualiser la page automatiquement
                        }, 2000);

                        // getStudentsCorbeille()
                        swal("Etudiant supprimé definitivement !!!",{
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

    //fonction pour recuperer tous les etudiants qui sont dans la corbeille


    async function RestoreStudentsCorbeille(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/restore-student/${id}/corbeille`);
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

        // getStudentsCorbeille()
        getStudentsCorbeille()
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
                            <h1>Corbeille</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/etud/inscription">Etudiants</NavLink></li>
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
                                                <h3 className="card-title">Liste des etudiants dans la corbeille</h3>
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
                                                                        <th>Date de suppression</th>
                                                                        <th>Nom</th>
                                                                        <th>Prenom</th>
                                                                        <th>Sexe</th>
                                                                        {/* <th>Tél</th> */}
                                                                        <th>Whatsapp</th>
                                                                        <th>Formation</th>
                                                                        <th>Action</th>
                                                                        {/* <th></th> */}
                                                                    </tr>
                                                                    </thead>

                                                                    <tbody>
                                                                    {
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
                                                                                        
                                                                                        <td>{element.deleted_at.split(' ')[0]}</td>
                                                                                            <td>{element.nomEtud}</td>
                                                                                            <td>{element.prenomEtud}</td>
                                                                                            <td>{element.sexe}</td>
                                                                                            {/* <td>{element.telEtud}</td> */}
                                                                                            <td>{element.whatsappEtud}</td>
                                                                                            <td key={index}>{element.id && element.nomForm}</td>
                                                                                            <td>
                                                                                            <span>
                                                                                                <FaFileArchive className="text-warning" style={{ color:'red', cursor:'pointer' }} onClick={()=>RestoreStudentsCorbeille(element.id)}/>
                                                                                                <FaTrashAlt className="text-danger" style={{ color:'red', cursor:'pointer' }} onClick={()=>alertForDeleteStudent(element.id)}/>

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

export default CorbeilleEtud;