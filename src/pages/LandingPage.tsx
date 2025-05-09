//import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="title">Farmacia Salud Total</h1>
        <p className="subtitle">Bienestar y confianza para ti y tu familia</p>
        <a className="cta-button" href="https://farmacia-backend-1ahx.onrender.com/api/productos" target="_blank">
          Ver productos
        </a>
      </header>

      <section className="hero-split">
        <div className="hero-text">
          <h2>Confianza y salud</h2>
          <p>
            En esta oportunidad La farmacia Confianza y Salud esta incursionando en el mundo del desarrolo 
            y tuvimos la opurtunidad de poder crear su primer crud para su farmacia y asi poder seguir implementando cosas a futuro para su pagina web realizada y completa.
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="farmacia.png"
            alt="Medicinas"
            className="hero-image"
          />
        </div>
      </section>

      <footer className="landing-footer">
        &copy; 2025 Farmacia Salud Total
      </footer>
    </div>
  );
};

export default LandingPage;
