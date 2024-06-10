import React from 'react';
import {NavLink} from "react-router-dom";

const BarreLateraleDepense = () => {
    return (
        <div>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    {/* <li className="nav-item">
                        <NavLink className="nav-link " to="/fact/dash">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                                 to="/depense/dashboard">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Tableau de Bord</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/depense/dashboard">
                                    <i className="bi bi-circle"></i><span>Tableau de Bord</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                                 to="/depense/Catégorie">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Catégories</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/depense/Catégorie">
                                    <i className="bi bi-circle"></i><span>Catégories</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>


                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                                 to="/depense/transaction">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Transaction</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/depense/transaction">
                                    <i className="bi bi-circle"></i><span>Transaction</span>
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/entree_corbeille">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/entree_Archives">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li> */}
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse"
                                 to="/depense/sortie">
                            <i className="bi bi-bar-chart"></i><span>Sorties</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/depense/sortie">
                                    <i className="bi bi-circle"></i><span>Sorties</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-heading">Pages</li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="/profil">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="pages-faq.html">
                            <i className="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="pages-contact.html">
                            <i className="bi bi-envelope"></i>
                            <span>Contact</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="/register">
                            <i className="bi bi-card-list"></i>
                            <span>Register</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="/login">
                            <i className="bi bi-box-arrow-in-right"></i>
                            <span>Login</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="pages-error-404.html">
                            <i className="bi bi-dash-circle"></i>
                            <span>Error 404</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" to="pages-blank.html">
                            <i className="bi bi-file-earmark"></i>
                            <span>Blank</span>
                        </NavLink>
                    </li>

                </ul>

            </aside>
        </div>
    );
};

export default BarreLateraleDepense;