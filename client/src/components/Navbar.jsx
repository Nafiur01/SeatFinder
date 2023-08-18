import React from 'react';
import '../css/Navbar.css'; // Updated import path
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-blurry">
        <div className="container">
          <img src="/seatfinder.png" alt="SeatFinder Logo" className="navbar-logo" />
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} to="/terms">Terms</NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center ms-auto">
            <NavLink className={({isActive}) => isActive ? "sf-link active" : "sf-link"} exact to="/login">Login</NavLink>
            <i className='text-white'>/</i>
            <NavLink className="sf-link" to="/signup">Signup</NavLink>
            
          </div>
        </div>
      </nav>
      <div className="navbar-nav-mbl justify-content-center" id="">
        
          <span className="nav-item">
            <NavLink className={({isActive}) => isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl"} exact to="/">Home</NavLink>
          </span>
          <span className="nav-item">
            <NavLink className={({isActive}) => isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl"} to="/about">About</NavLink>
          </span>
          <span className="nav-item">
            <NavLink className={({isActive}) => isActive ? "nav-link-mbl active-link-mbl" : "nav-link-mbl"} to="/terms">Terms</NavLink>
          </span>
        
        </div>
    </>
  );
};

export default Navbar;
