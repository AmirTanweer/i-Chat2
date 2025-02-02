import React, { useEffect,useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '.../public/logo.png'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
function NavBar() {
 const {logout,authtoken}=useContext(AuthContext)
const navigate=useNavigate()
useEffect(()=>{
  // if(!localStorage.getItem('token'))  // for actual app
   if(!sessionStorage.getItem('token')) // for testing
    {
    navigate('/login')
  }
  // console.log("authtoken -> ",authtoken)
},[authtoken])

const handleLogout=()=>{
  
  logout()
}

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          <img src='/logo5.png' alt="Logo" style={{width:'50px'}} className="" />
          i-Chat
        </Link>
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
              <Link className="nav-link active" aria-current="page" to={'/'}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About 
              </Link>
            </li>
            {
              authtoken?
              <>
               
                <li className="nav-item">
              <Link className="nav-link" to="/userdetails">
                User
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={handleLogout}  >
                Logout
              </Link>
            </li>
                </>
            :
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            </>
            }
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
