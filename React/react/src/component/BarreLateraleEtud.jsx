import React, { useState } from 'react';
import {NavLink} from "react-router-dom";

const BarreLateraleEtud = () => {
    const [expandedLink, setExpandedLink] = useState(null);

    const handleToggle = (link) => {
        setExpandedLink(expandedLink === link ? null : link);
    };

    

    

    return (
        <div>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/etud/dash">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className={`nav-link ${expandedLink === 'etudiants' ? 'active' : ''}`} onClick={() => handleToggle('etudiants')} to="#">
                            <i className="bi bi-menu-button-wide"></i><span>Etudiants</span><i
                            className={`bi bi-chevron-down ms-auto ${expandedLink === 'etudiants' ? 'expanded' : ''}`}></i>
                        </NavLink>
                        <ul className={`nav-content collapse ${expandedLink === 'etudiants' ? 'show' : ''}`} data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/etud/inscription">
                                    <i className="bi bi-circle"></i><span>Etudiants</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/etud/corbeille">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/etud/archive">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" aria-expanded='false'
                                 to="/etud/abscence">
                            <i className="bi bi-journal-text"></i><span>Absences</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>

                        <ul id="forms-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/etud/abscence">
                                    <i className="bi bi-circle"></i><span>Absence</span>
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/choix_formation_fiche_absence">
                                    <i className="bi bi-circle"></i><span>Fiche Absence</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/abscence_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/abscence_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" aria-expanded='false'
                                 to="/conduite">
                            <i className="bi bi-layout-text-window-reverse"></i><span>Conduites</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/conduite">
                                    <i className="bi bi-circle"></i><span>Conduites</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/conduite_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/conduite_archiver">
                                    <i className="bi bi-circle"></i><span>Archives</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" aria-expanded='false'
                                 to="/stage">
                            <i className="bi bi-bar-chart"></i><span>Stages</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/stage">
                                    <i className="bi bi-circle"></i><span>Stages</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/choix_formation_stage">
                                    <i className="bi bi-circle"></i><span>Liste Stage(s)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stage_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stage_archiver">
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

export default BarreLateraleEtud;