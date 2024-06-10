import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import HeaderGeneral from "../component/HeaderGeneral.jsx";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import BarreLateraleEtud from "../component/BarreLateraleEtud.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import swal from "sweetalert";
import {Doughnut} from "react-chartjs-2";

const Essaie = () => {
    return (
        <div>

            <div className="col-md-4">
                <div className="card info-card customers-card">
                    <div className="card-body">
                        <h5 className="card-title">Evolution des payements <span></span></h5>
                        <div>
                            <Doughnut data={data} />
                        </div>
                    </div>
                </div>

            </div>


            <main id="main" className="main">

                <div className="pagetitle">
                    <h1>Absences</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                            <li className="breadcrumb-item active">Absences</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="row">

                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">

                                        <div className="filter">
                                            <NavLink className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"></i></NavLink>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><NavLink className="dropdown-item" to="#">Today</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Month</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Sales <span>| Today</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-cart"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>145</h6>
                                                    <span className="text-success small pt-1 fw-bold">12%</span> <span
                                                    className="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">

                                        <div className="filter">
                                            <NavLink className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"></i></NavLink>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><NavLink className="dropdown-item" to="#">Today</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Month</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Revenue <span>| This Month</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-currency-dollar"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>$3,264</h6>
                                                    <span className="text-success small pt-1 fw-bold">8%</span> <span
                                                    className="text-muted small pt-2 ps-1">increase</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-12">

                                    <div className="card info-card customers-card">

                                        <div className="filter">
                                            <NavLink className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"></i></NavLink>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><NavLink className="dropdown-item" to="#">Today</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Month</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Customers <span>| This Year</span></h5>

                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>1244</h6>
                                                    <span className="text-danger small pt-1 fw-bold">12%</span> <span
                                                    className="text-muted small pt-2 ps-1">decrease</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">

                                        <div className="filter">
                                            <NavLink className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"></i></NavLink>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><NavLink className="dropdown-item" to="#">Today</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Month</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li>
                                            </ul>
                                        </div>

                                        <div className="card-body">
                                            <h5 className="card-title">Recent Sales <span>| Today</span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Customer</th>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row"><NavLink to="#">#2457</NavLink></th>
                                                    <td>Brandon Jacob</td>
                                                    <td><NavLink to="#" className="text-primary">At praesentium minu</NavLink>
                                                    </td>
                                                    <td>$64</td>
                                                    <td><span className="badge bg-success">Approved</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#">#2147</NavLink></th>
                                                    <td>Bridie Kessler</td>
                                                    <td><NavLink to="#" className="text-primary">Blanditiis dolor omnis
                                                        similique</NavLink></td>
                                                    <td>$47</td>
                                                    <td><span className="badge bg-warning">Pending</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#">#2049</NavLink></th>
                                                    <td>Ashleigh Langosh</td>
                                                    <td><NavLink to="#" className="text-primary">At recusandae
                                                        consectetur</NavLink></td>
                                                    <td>$147</td>
                                                    <td><span className="badge bg-success">Approved</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#">#2644</NavLink></th>
                                                    <td>Angus Grady</td>
                                                    <td><NavLink to="#" className="text-primar">Ut voluptatem id earum
                                                        et</NavLink></td>
                                                    <td>$67</td>
                                                    <td><span className="badge bg-danger">Rejected</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#">#2644</NavLink></th>
                                                    <td>Raheem Lehner</td>
                                                    <td><NavLink to="#" className="text-primary">Sunt similique
                                                        distinctio</NavLink></td>
                                                    <td>$165</td>
                                                    <td><span className="badge bg-success">Approved</span></td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card top-selling overflow-auto">

                                        <div className="filter">
                                            <NavLink className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"></i></NavLink>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Filter</h6>
                                                </li>

                                                <li><NavLink className="dropdown-item" to="#">Today</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Month</NavLink></li>
                                                <li><NavLink className="dropdown-item" to="#">This Year</NavLink></li>
                                            </ul>
                                        </div>

                                        <div className="card-body pb-0">
                                            <h5 className="card-title">Top Selling <span>| Today</span></h5>

                                            <table className="table table-borderless">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Preview</th>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Sold</th>
                                                    <th scope="col">Revenue</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <th scope="row"><NavLink to="#"><img src="assets/img/product-1.jpg"
                                                                                     alt=""/></NavLink></th>
                                                    <td><NavLink to="#" className="text-primary fw-bold">Ut inventore ipsa
                                                        voluptas nulla</NavLink></td>
                                                    <td>$64</td>
                                                    <td className="fw-bold">124</td>
                                                    <td>$5,828</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#"><img src="assets/img/product-2.jpg"
                                                                                     alt=""/></NavLink></th>
                                                    <td><NavLink to="#" className="text-primary fw-bold">Exercitationem
                                                        similique doloremque</NavLink></td>
                                                    <td>$46</td>
                                                    <td className="fw-bold">98</td>
                                                    <td>$4,508</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#"><img src="assets/img/product-3.jpg"
                                                                                     alt=""/></NavLink></th>
                                                    <td><NavLink to="#" className="text-primary fw-bold">Doloribus nisi
                                                        exercitationem</NavLink></td>
                                                    <td>$59</td>
                                                    <td className="fw-bold">74</td>
                                                    <td>$4,366</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#"><img src="assets/img/product-4.jpg"
                                                                                     alt=""/></NavLink></th>
                                                    <td><NavLink to="#" className="text-primary fw-bold">Officiis quaerat
                                                        sint rerum error</NavLink></td>
                                                    <td>$32</td>
                                                    <td className="fw-bold">63</td>
                                                    <td>$2,016</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"><NavLink to="#"><img src="assets/img/product-5.jpg"
                                                                                     alt=""/></NavLink></th>
                                                    <td><NavLink to="#" className="text-primary fw-bold">Sit unde debitis
                                                        delectus repellendus</NavLink></td>
                                                    <td>$79</td>
                                                    <td className="fw-bold">41</td>
                                                    <td>$3,239</td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

            </main>

            <Container fluid>
                <HeaderGeneral/>
                <Row>
                    <Col>
                        <BarreLateraleEtud/>
                    </Col>
                    <Col className='col-lg-12'>
                        <main id="main" className="main">

                            <div className="pagetitle">
                                <h1>Absences</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><NavLink to="/">Accueil</NavLink></li>
                                        <li className="breadcrumb-item active">Absences</li>
                                    </ol>
                                </nav>
                            </div>

                            <section className="section form">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="row">

                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Title</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="card">
                                                                <div className="card-body table-responsive p-0">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    Footer
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

            <table className="table table-borderless datatable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Reference</th>
                    <th scope="col">Filière</th>
                    <th scope="col">Etudiant</th>
                    <th scope="col">Montant</th>
                    <th scope="col">Moyen de paiement</th>
                    <th scope="col">Motif</th>
                    <th scope="col">Prochain Paiement</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row"><NavLink to="#">#2457</NavLink></th>
                    <td>Brandon Jacob</td>
                    <td><NavLink to="#" className="text-primary">At praesentium minu</NavLink>
                    </td>
                    <td>$64</td>
                    <td><span className="badge bg-success">Approved</span></td>
                    <td><NavLink to="#" className="text-primary">At praesentium minu</NavLink>
                    </td>
                    <td>$64</td>
                    <td><span className="badge bg-success">Approved</span></td>
                </tr>
                </tbody>
            </table>


            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                className="bi bi-arrow-up-short"></i></a>

        </div>
    );
};

export default Essaie;