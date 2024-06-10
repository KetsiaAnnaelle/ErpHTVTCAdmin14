import HeaderGeneral from "../../component/HeaderGeneral.jsx";
import BarreLateraleForm from "../../component/BarreLateraleForm.jsx";
import {BsSearch} from "react-icons/bs";
import React from 'react';
import axios from "axios";
import { Col, Container, Row, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import {  Link, useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillDelete } from 'react-icons/ai';
import { FaTrashAlt, FaFileArchive, FaAngleLeft } from 'react-icons/fa';
import Swal from 'sweetalert';
import.meta.env.VITE_URL;
import ReactLoading from 'react-loading';

const CorbeilleCours = () => {

    const [allcours, setallcours] = useState([])//tous les Courss de la corbeille

    const [delstud, setdelstud] = useState(false)

    const keys=['nomEtud','nomForm','nomCours',];
    const [load, setload] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    const history= useNavigate()

    async function getcoursCorbeille() {
        try {
            setload(true)
            const response = await axios.get(`${import.meta.env.VITE_URL}/get-cours-corbeille`);
            setallcours(response.data);
            setload(false)
            // console.log(response.data);
            //setallcoursbydate(response.data.data) //ici on recupere tous les eleves stockes et qui vont subir les filtres
        } catch (error) {
            console.error('Erreur lors de la recuperation des Courss');
        }
    }

    console.log(allcours);

    function alertForDeleteStudent(id) {
        swal({
            title: `Voulez-vous vraiment supprimer ce cours?`,
            icon: "warning",
            buttons: true,
            dangerMode:true,
        })
            .then((willDelete)=>{
                if (willDelete) {
                    // async function delStudents(id) {
                    try {
                        const response = axios.delete(`${import.meta.env.VITE_URL}/force-delete-cours/${id}`);
                        console.log(response);
                        setdelstud(!delstud);
                        setallcours(response.data)


                        setTimeout(() => {
                            window.location.reload() //pour actualiser la page automatiquement
                        }, 2000);

                        // getcoursCorbeille()
                        swal("Cours supprimé definitivement !!!",{
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

    //fonction pour recuperer tous les Courss qui sont dans la corbeille


    async function RestoreStudentsCorbeille(id) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_URL}/restore_note/${id}/corbeille`);
            setallcours(response.data);

            setTimeout(() => {
                window.location.reload() //pour actualiser la page automatiquement
            }, 2000);

            swal("Cours Restauré avec succès !!!",{
                icon:"success",
            });
            // history('/etud/inscription')
        } catch (error) {
            console.error('Erreur lors de la restauration de l Cours');
        }
    }

    useEffect(() => {

        getcoursCorbeille()
    }, [])


    return (
        <Container fluid>
            <HeaderGeneral/>
            <Row>
                <Col>
                    <BarreLateraleForm/>
                </Col>
                <Col className='col-lg-12'>
                    <main id="main" className="main">

                        <div className="pagetitle">
                            <h1>Corbeille</h1>
                            <nav>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/note">Note</NavLink></li>
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
                                                <h3 className="card-title">Liste des cours dans la corbeille</h3>
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
                                                                        <th>Nom Cours</th>
                                                                        <th>Nom Formation</th>
                                                                        <th>Description</th>
                                                                        <th></th>
                                                                        <th>Action</th>
                                                                        <th></th>

                                                                        {/* <th></th> */}
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

                                                                            allcours.filter((element) =>
                                                                                keys.some((key) => {
                                                                                    const value = element[key];
                                                                                    if (typeof value === 'string') {
                                                                                        return value.toLowerCase().includes(searchQuery);
                                                                                    }
                                                                                    return false;
                                                                                })
                                                                            )

                                                                                .map((element, index)=>{
                                                                                    const createdDate = new Date(element.deleted_at);
                                                                                    const formatdate = createdDate.toLocaleDateString();
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
                                                                                                <td>{formatdate}</td>
                                                                                                <td>{element.nomCours}</td>
                                                                                                <td>{element.nomForm}</td>
                                                                                                <td>{element.description}</td>

                                                                                                <td>
                                                                                                    {/* <span> */}
                                                                                                    <Button variant="info" className='mb-3 ms-3' style={{ cursor:'pointer' }} onClick={()=>RestoreStudentsCorbeille(element.id)}>Restaurer</Button>
                                                                                                    {/* </span> */}
                                                                                                </td>

                                                                                                <td>

                                                                                                    <Button variant="danger" className='mb-3 ms-3' style={{ cursor:'pointer' }} onClick={()=>alertForDeleteStudent(element.id)}>Supprimer</Button>
                                                                                                </td>

                                                                                            </tr>

                                                                                        </>

                                                                                    )
                                                                                })

                                                                    }
                                                                    {/* <tr className='text-danger fs-3 fw-3 mt-3'>Total:{allcours.length}</tr> */}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <p className='text-danger fs-3 fw-3 mt-3'>Total:{allcours.length}</p>
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

export default CorbeilleCours;