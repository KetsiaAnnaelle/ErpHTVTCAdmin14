import React from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { FaGraduationCap } from 'react-icons/fa';
import { PiMoneyBold } from 'react-icons/pi';
import { BiUser, BiMoney, BiSolidBookAlt } from 'react-icons/bi';
import { BsFillBriefcaseFill, BsSearch } from 'react-icons/bs';
import { AiOutlineLineChart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Header from "./component/Header.jsx";
import Caroussel from "./component/Caroussel.jsx";
const Acceil = () => {
    return (
        <main>
            <Header />
            <Container>
                <Row className='d-flex justify-content-center'>
                    <Col className='col-md-6'>
                        <Form>
                            <Form.Group className="mb-3" controlId="module" style={{ position: 'relative', marginLeft:'-30px' }}>
                                <Form.Control size="lg" type="text" placeholder="Entrer un module" />
                                <BsSearch className='fs-5' style={{ position: 'absolute', top: '12px', left: '92%' }}/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Caroussel />
            </Container>
            <Container fluid>
                <Row className='d-flex justify-content-center mt-5' >
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/etud/abscence' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><FaGraduationCap size={70} style={{color: "#3066e4"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Elèves</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/recrutement_enseignant' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><BiUser size={70} style={{color: "#e8a214"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Enseignants</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/fact' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><BiMoney size={70} style={{color: "#0da79c"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Facturation</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/form' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><BiSolidBookAlt size={70} style={{color: "#8f3393"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Classes</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/depense/Catégorie' className='fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center>
                                    <PiMoneyBold size={70} style={{color: "#488ee1"}} />
                                </center>
                                <Card.Body>
                                    <center className='text-dark'>Depenses</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/recrutement_personnel' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><BsFillBriefcaseFill size={70} style={{color: "#27c76c"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Personnels</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col className='col-md-3 col-lg-2 mb-3'>
                        <Link to='/dashboard_general' className='text-center fw-1 fs-5text-dark' style={{ textDecoration:'none' }}>
                            <Card className='border-0'>
                                <center><AiOutlineLineChart size={70} style={{color: "#d6953a"}} /></center>
                                <Card.Body>
                                    <center className='text-dark'>Dashboard</center>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Acceil;