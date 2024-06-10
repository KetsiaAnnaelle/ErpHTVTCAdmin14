import React from 'react';
import {NavLink} from "react-router-dom";

const BarreLateralePerso = () => {
    return (
        <div>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <NavLink className="nav-link " to="/dashboard_perso">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                                 to="/recrutement_personnel">
                            <i className="bi bi-journal-text"></i><span>Recrutement</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/recrutement_personnel">
                                    <i className="bi bi-circle"></i><span>Recrutement</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/personnel_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/personnel_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse"
                                 to="/personnel/fiche_travail">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Fiche de travail</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/personnel/fiche_travail">
                                    <i className="bi bi-circle"></i><span>Fiche de travail</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fiche_travail_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fiche_travail_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse"
                                 to="/performance">
                            <i className="bi bi-bar-chart"></i><span>Performances</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/performance">
                                    <i className="bi bi-circle"></i><span>Performances</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/performance_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/performance_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse"
                                 to="/paiement_personnel">
                            <i className="bi bi-bar-chart"></i><span>Paiements</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/paiement_personnel">
                                    <i className="bi bi-circle"></i><span>Paiements</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/paiement_personnel_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/paiement_personnel_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#slides-nav" data-bs-toggle="collapse"
                                 to="/conge">
                            <i className="bi bi-bar-chart"></i><span>Congés</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="slides-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/conge">
                                    <i className="bi bi-circle"></i><span>Congés</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/conge_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/conge_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#logo-nav" data-bs-toggle="collapse"
                                 to="/carriere">
                            <i className="bi bi-bar-chart"></i><span>Carrière</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="logo-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/carriere">
                                    <i className="bi bi-circle"></i><span>Carrière</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/carriere_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/carriere_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
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

                </ul>

            </aside>
        </div>
    );
};

export default BarreLateralePerso;