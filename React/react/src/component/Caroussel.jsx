import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Caroussel = () => {
    return (
        <main>
            <Carousel>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="./assets/img/imagedefond.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h5 className="fw-2 h1">"L'EDUCATION EST LA VOIE <br/> VERS LE SUCCES."</h5>
                        <p>Kofi Annan</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="./assets/img/imagedefond.png"
                        alt="second slide"
                    />
                    <Carousel.Caption>
                        <h5 className="fw-2 h1">"LE SUCCES VIENT A CEUX QUI , <br/> TRAVAILLENT DUR ET RESTENT CONCENTRES."</h5>
                        <p>Colin Powell</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                        className="d-block w-100"
                        src="./assets/img/imagedefond.png"
                        alt="third slide"
                    />
                    <Carousel.Caption>
                        <h5 className="fw-2 h1">"OUVREZ DES ECOLES , <br/> VOUS FERMEREZ DES PRISONS."</h5>
                        <p>Victor Hugo</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </main>
    );
};

export default Caroussel;