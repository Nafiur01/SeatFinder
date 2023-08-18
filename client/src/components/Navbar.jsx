import React from 'react';
import '../css/Navbar.css'; // Updated import path
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-blurry">
      <div className="container">
        <img src="/seatfinder.png" alt="SeatFinder Logo" className="navbar-logo" />
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#terms">
                Terms
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center ms-auto">
          <a className="sf-link" href="#login">
            Login
          </a> <b className='text-white'>/</b> 
          <a className="sf-link" href="#signup">
            Signup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
