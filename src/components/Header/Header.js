import React from 'react';
import logo from '../../assets/logo.svg'
const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'var(--bs-primary)' }}>
        <div className="container">
          <a className="navbar-brand" href="/"><img src={logo} alt='discover-resorts-logo' style={{ height: '40px', marginRight: '10px' }}/></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
