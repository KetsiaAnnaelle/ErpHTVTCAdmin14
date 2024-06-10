import React from 'react';
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <main>
            <div className="container">

                <section
                    className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>Cette page n'existe pas.</h2>
                    <NavLink className="btn" to="/">Retourner à la page d'accueil</NavLink>
                    <img src="/assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found"/>
                </section>

            </div>
        </main>
    );
};

export default Error;