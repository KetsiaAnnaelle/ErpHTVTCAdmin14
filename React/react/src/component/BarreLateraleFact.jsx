import React from 'react';
import {NavLink} from "react-router-dom";

const BarreLateraleFact = () => {
    return (
        <div>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <NavLink className="nav-link " to="/fact/dash">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                                 to="/fact">
                            <i className="bi bi-journal-text"></i><span>Facturations</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/fact">
                                    <i className="bi bi-circle"></i><span>Reçu(s)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fact/paie">
                                    <i className="bi bi-circle"></i><span>Paiement(s)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fact/choix_formation_facture">
                                    <i className="bi bi-circle"></i><span>Etat Paiement(s)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/fact/paie_archiver">
                                    <i className="bi bi-circle"></i><span>Brouillon</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse"
                                 to="/rembour">
                            <i className="bi bi-bar-chart"></i><span>Rembourssements</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </NavLink>
                        <ul id="charts-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <NavLink to="/rembour">
                                    <i className="bi bi-circle"></i><span>Rembourssements</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/rembour/rembour_supprimer">
                                    <i className="bi bi-circle"></i><span>Corbeille</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/rembour/rembour_archiver">
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

export default BarreLateraleFact;