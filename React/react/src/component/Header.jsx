import React, {useContext, useEffect,useState} from 'react';
import {Nav} from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
// import { Token_Auth } from "../pages/connexion/Login";

const Header = () => {

    const [user, setuser] = useState([])
    const [auth, setauth] = useState([])
    const [profil, setprofil] = useState(null)

    // const {setuser, setprofil} = useContext(USER)

    const history = useNavigate()

    async function deconnexion(e) {
        e.preventDefault()
        try {
          localStorage.removeItem('user')
          history('/login')
    
          console.log('deconnexion reussi');
          //Rediriger l'utilisateur vers la page appropriee par exemple le tableau de bord
          
        } catch (error) {
            console.log('Erreur de connexion', error);
        }
      }
  
    //   console.log(Token_Auth);
       //Recuperer d'un utilisateur
        async function getUser() {
            try {
                const use = JSON.parse(localStorage.getItem('user'));
                setuser(use);
            } catch (error) {
                console.error('Error fetching profile photo:', error);
            }
        }

        console.log(user);

  
      useEffect(() => {
          getUser()
      }, [])


    return (
        <div>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <Nav.Link to="/" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" width='25' height='25'/>
                        <span className="d-none d-lg-block">ERP HTVTC</span>
                   </Nav.Link>

                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                            <Nav.Link className="nav-link nav-icon search-bar-toggle " to="/">
                                <i className="bi bi-search"></i>
                           </Nav.Link>
                        </li>

                        <li className="nav-item dropdown">

                            <Nav.Link className="nav-link nav-icon" to="/" data-bs-toggle="dropdown">
                                <i className="bi bi-bell"></i>
                                <span className="badge bg-primary badge-number">4</span>
                           </Nav.Link>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                                <li className="dropdown-header">
                                    You have 4 new notifications
                                    <Nav.Link to="/"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Nav.Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>Lorem Ipsum</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>30 min. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-x-circle text-danger"></i>
                                    <div>
                                        <h4>Atque rerum nesciunt</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>1 hr. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-check-circle text-success"></i>
                                    <div>
                                        <h4>Sit rerum fuga</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>2 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="notification-item">
                                    <i className="bi bi-info-circle text-primary"></i>
                                    <div>
                                        <h4>Dicta reprehenderit</h4>
                                        <p>Quae dolorem earum veritatis oditseno</p>
                                        <p>4 hrs. ago</p>
                                    </div>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li className="dropdown-footer">
                                    <Nav.Link to="/">Show all notifications</Nav.Link>
                                </li>

                            </ul>

                        </li>

                        <li className="nav-item dropdown">

                            <Nav.Link className="nav-link nav-icon" to="/" data-bs-toggle="dropdown">
                                <i className="bi bi-chat-left-text"></i>
                                <span className="badge bg-success badge-number">3</span>
                           </Nav.Link>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                                <li className="dropdown-header">
                                    You have 3 new messages
                                    <Nav.Link to="/"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Nav.Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="message-item">
                                    <Nav.Link to="/">
                                        <img src="assets/img/messages-1.jpg" alt="" className="rounded-circle"/>
                                        <div>
                                            <h4>Maria Hudson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>4 hrs. ago</p>
                                        </div>
                                   </Nav.Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="message-item">
                                    <Nav.Link to="/">
                                        <img src="assets/img/messages-2.jpg" alt="" className="rounded-circle"/>
                                        <div>
                                            <h4>Anna Nelson</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>6 hrs. ago</p>
                                        </div>
                                   </Nav.Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="message-item">
                                    <Nav.Link to="/">
                                        {/* <img src="assets/img/messages-3.jpg" alt="" className="rounded-circle"/> */}
                                        <img className='rounded-circle' width={'50px'} height={'80px'} src={`http://localhost:8000/uploadImage/${user.profil}`} alt="profil"/>
                                        <div>
                                            <h4>David Muldon</h4>
                                            <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                                            <p>8 hrs. ago</p>
                                        </div>
                                   </Nav.Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li className="dropdown-footer">
                                    <Nav.Link to="/">Show all messages</Nav.Link>
                                </li>

                            </ul>

                        </li>

                        <li className="nav-item dropdown pe-3">
                            <Nav.Link className="nav-link nav-profile d-flex align-items-center pe-0" to="/" data-bs-toggle="dropdown">
                                {/* <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/> */}
                                {
                                    // user.token?
                                    <div>
                                        <img className='rounded-circle' width={'40px'} height={'80px'} src={`http://localhost:8000/uploadImage/${user.profil}`} alt="profil"/>
                                        <span className="d-none d-md-block dropdown-toggle ps-2">{user.name}</span>

                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                            <li className="dropdown-header">
                                                <h6>{user.name}</h6>
                                                {/* <span>Web Designer</span> */}
                                            </li>
                                            
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>

                                            <li>
                                                <NavLink className="dropdown-item d-flex align-items-center" to="/profil">
                                                    <i className="bi bi-person"></i>
                                                    <span>My Profile</span>
                                            </NavLink>
                                            </li>
                                            
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>

                                            <li>
                                                <Nav.Link onClick={(e)=>deconnexion(e)} className="dropdown-item d-flex align-items-center" to="/">
                                                    <i className="bi bi-box-arrow-right"></i>
                                                    {
                                                        user.token?
                                                        <span>Sign Out</span>
                                                        :
                                                        <span className='text-danger fw-bold'>Pas Connecté</span>

                                                    }
                                            </Nav.Link>
                                            </li>

                                        </ul>
                                    </div>
                                    // :
                                    // <FaUserCircle style={{ height:'40px', width:'40px' }}/>
                                }
                                {/* <img className='rounded-circle' width={'40px'} height={'80px'} src={profil} alt="profil"/> */}
                           </Nav.Link>

                        </li>

                    </ul>
                </nav>

            </header>
        </div>
    );
};

export default Header;