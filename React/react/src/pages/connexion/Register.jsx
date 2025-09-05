import React, {useEffect, useState} from 'react';
import '/public/assets/css/index.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
// import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import.meta.env.VITE_URL;
import Swal from 'sweetalert2'
// import { useStateContext } from './ContextProvider';



const Register = () => {

    // const { register, handleSubmit,reset, formState: { errors } } = useForm();

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [passwordconfirm, setpasswordconfirm] = useState('')
    const [profil, setprofil] = useState('')

    const [role, setrole] = useState('')
    

    const [validationErrors, setvalidationErrors] = useState({})

    const history= useNavigate()



    const Register = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profil', profil);
        formData.append('role', role);

        if (password === passwordconfirm) {
            
            axios.post(`${import.meta.env.VITE_URL}/register`,formData)
            
            .then(function (response) {
                // const {access_token } = response.data
                console.log(response.data)
                // JSON.stringify(response.data)

                // localStorage.setItem('token', access_token)

                // setUser(response.user.name)
                // setToken(response.token)
                
                // reset('')

                setemail('')
                setrole('')
                setname('')
                setpassword('')
                setpasswordconfirm('')

                swal({
                    title: "Compte Crée Avec Succès !!!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "OK",
                    timer: 2000
                });

                
                history('/login')
            })
            .catch(function(error)  {

                //gestion des erreurs de validation
    
                if (error.response && error.response.status ===422) {
                    const errors = error.response.data.errors;
                    
                    console.log(errors);
                    setvalidationErrors(errors)
                    
                    console.log(validationErrors);
                } 
                // else {
                    
                //     console.error('Erreur non geres : ',error.message);
                // }
            })
        }
        else{

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Les mots de passe ne sont pas correct !!!',
                timer: 2000
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    }



    return (

        <div className="container animated fadeInDown">
            <div className="row">

                <div className="col-md-5 mt-5">
                    <img src="public/assets/img/logo.png" alt="" />
                </div>


                    <div className="col-md-4 mt-5 justify-content-center">
                        <form action="post" onSubmit={(e) => {Register(e)}} className='form' encType='multipart/form-data'>
                            <p className="display-7  d-flex justify-content-center fw-bold">INSCRIVEZ-VOUS</p>

                            <div className="mb-3">
                                <input type="text" className="form-control input" id="name" placeholder="Nom" value={name} onChange={(e)=>setname(e.target.value)}/>
                            {/* {errors.name?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                            {validationErrors.name && (
                                <div className="error-message text-danger">{validationErrors.name[0]}</div>
                            )}
                            
                            </div>

                            <div className="mb-3">
                                <input type="email" className="form-control input" id="email" placeholder="Email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                            {/* {errors.email?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                            
                            {validationErrors.email && (
                                <div className="error-message text-danger">{validationErrors.email[0]}</div>
                            )}
                            </div>

                            <div className="mb-3">
                                <label for='image'>Photo de Profil</label>
                                <input type="file" className="form-control input" id='image' onChange={(e)=>setprofil(e.target.files[0])}/>
                                {validationErrors.profil && (
                                    <div className=" error-message text-danger">{validationErrors.profil[0]}</div>
                                )}
                               
                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control input" id="password" placeholder="Entrer votre mot de passe" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                                {/* {errors.password?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                                {validationErrors.password && (
                                    <div className="error-message text-danger">{validationErrors.password[0]}</div>
                                )}

                            </div>

                            <div className="mb-3">
                                <input type="password" className="form-control" id="passwordconfirm" placeholder="Confirmer votre mot de passe" value={passwordconfirm} onChange={(e)=>setpasswordconfirm(e.target.value)}/>
                                {/* {errors.passwordconfirm?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                                
                                {validationErrors.passwordconfirm && (
                                    <div className="error-message text-danger">{validationErrors.passwordconfirm[0]}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input type="text" className="form-control input" id="role" placeholder="Entrer le role de l'uitlisateur" value={role} onChange={(e)=>setrole(e.target.value)}/>
                                {/* {errors.password?.type==='required' && <span className='text-danger'>Ce Champ est Obligatoire</span>} */}
                                {validationErrors.role && (
                                    <div className="error-message text-danger">{validationErrors.password[0]}</div>
                                )}
                            
                            </div>



                            <div className="mb-3">
                                <p className="d-flex justify-content-center">Déjà un compte? <Link to="/login" className="link-underline-primary ms-2"> Connectez-vous</Link></p>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor:'#5b08a5' }}>Inscription</button>
                            
                        </form>
                    </div>
            </div>
        </div>
    );
};



export default Register;