import React from 'react';
import {NavLink} from "react-router-dom";
import {useSidebar} from "./SidebarContext.jsx";

const BarreLateraleForm = () => {

    const { sidebarVisible } = useSidebar();

    return (
        <div>
            <aside id="sidebar" className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>

                <ul className="sidebar-nav" id="sidebar-nav-form">

                    <li className="nav-item">
                        <NavLink className="nav-link " to="/dashboard_form">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse"
                                 to="/form">
                            <i className="bi bi-menu-button-wide"></i><span>Formations</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/form">
                                    <i className="bi bi-circle"></i><span>Formations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/form/corbeille">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/form/archive">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                                 to="/cours">
                            <i className="bi bi-journal-text"></i><span>Cours</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/cours">
                                    <i className="bi bi-circle"></i><span>Cours</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cours_corbeille">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cours_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#note-nav" data-bs-toggle="collapse"
                                 to="/note">
                            <i className="bi bi-journal-text"></i><span>Notes</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="note-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/note">
                                    <i className="bi bi-circle"></i><span>Notes</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/note_corbeille">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/note_archive">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/choix_formation">
                            <i className="bi bi-grid"></i>
                            <span>Emploi du Temps</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/choix_formation_Examen">
                            <i className="bi bi-grid"></i>
                            <span>Examen</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/planingGlobal">
                            <i className="bi bi-grid"></i>
                            <span>Planing Global</span>
                        </NavLink>
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

export default BarreLateraleForm;