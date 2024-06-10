import React, {useEffect, useState, useContext} from 'react';
import '/public/assets/css/index.css'
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {USER} from '../../App.jsx';
import swal from 'sweetalert';
import.meta.env.VITE_URL;
import Swal from 'sweetalert2'

// export const Token_Auth

const Login = () => {

    const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const [Token, setToken] = useState(null) //etat pour stocker le token JWT
    const [isAuthentificated, setisAuthentificated] = useState(false) //etat pour gerer l'authentification

    // const [user, setuser] = useState(initialState)

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const [validationErrors, setvalidationErrors] = useState({})


    const history= useNavigate()

    const [user, setUser] = useContext(USER)
    const [auth, setauth] = useState([])
    const [errorMessage, setErrorMessage] = useState('');

    const Login = async () => {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        // if (user.email === email || user.password === password) {
            
            try {
                const response = await axios.post(`${import.meta.env.VITE_URL}/login`,formData)
                const Token_Auth = localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                if (!response.data.error) {
                    const {access_token } = response.data
                    setToken(access_token)
                    setisAuthentificated(true)
                    setauth(response.data)
                    console.log(response.data.user.email);
                    setemail('')
                    setpassword('')

                    swal({
                        title: "Connexion Reussi !!!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "OK",
                        timer: 2000
                    });

                    history('/')
                } 
                else{
                    setErrorMessage(response.data.message)
                    
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 5000);
                }

                
            } catch (error) {
                if (error.response && error.response.status ===422) {
                    const errors = error.response.data.errors;
                    setvalidationErrors(errors)
                    console.log('Erreur de connexion');
                    
                }

                if (error.response.status===401) {
                    swal({
                        title: "Identifiant Incorrect",
                        text: "You clicked the button!",
                        icon: "error",
                        button: "OK",
                        timer: 2000
                    })
                }
                

            }
        

    }

    console.log(user);

    useEffect(() => {
        if (auth.token) {
            setUser(auth)
            history('/')
        }
        if (user.token) {
            history('/')
        }else{
            history('/login')
        }
    }, [auth])



    return (

        <div className="container animated fadeInDown">
            <div className="row">

                <div className="col-md-5 mt-5">
                    <img src="public/assets/img/logo.png" alt="" />
                </div>


                <div className="col-md-4 mt-5 justify-content-center">
                    <form action="" onSubmit={handleSubmit(Login)} className='form'>
                        <p className="display-7 d-flex justify-content-center fw-bold">CONNECTEZ-VOUS</p>

                        <p className="display-7 d-flex justify-content-center text-danger fw-bold">{ errorMessage }</p>

                        <div className="mb-3">
                            <input type="email" className="form-control input" value={email} onChange={(e)=>setemail(e.target.value)} id="name" placeholder="email"/>
                        {/* {errors.email?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                        {validationErrors.email && (
                            <div className="error-message text-danger">{validationErrors.email[0]}</div>
                        )}
                        </div>
                        

                        <div className="mb-3">
                            <input type="password" className="form-control input" value={password} onChange={(e)=>setpassword(e.target.value)} id="password" placeholder="Mot de Passe"/>
                        {/* {errors.password?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                        {validationErrors.password && (
                            <div className="error-message text-danger">{validationErrors.password[0]}</div>
                        )}
                        
                        </div>

                        <div className="mb-3">
                            <p className="d-flex justify-content-center">Pas de compte? <Link to="/register" className="link-underline-primary ms-2"> Inscrivez-vous</Link></p>
                        </div>

                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor:'#5b08a5' }}>Connexion</button>
                        
                    </form>

                    
                </div>
                
            </div>
        </div>
    );
};

export default Login;