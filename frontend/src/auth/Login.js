
import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    
        const {login,response,authtoken,getUserDetails}=useContext(AuthContext)
        const navigate=useNavigate()
        
         const [formData, setFormData] = useState({  email: '', password: '' });
       
         const handleChange = (e) => {
           const { name, value } = e.target;
           setFormData((prevData) => ({
             ...prevData,
             [name]: value,
           }));
         };
      
       
       
       
         const handleSubmit = async(e) => {
           e.preventDefault();
          await login(formData)
          //  console.log('Form Data:', formData);  // Replace with actual login logic
           setFormData({  email: '', password: '' });
         

         };

         useEffect(()=>{
              //  if(localStorage.getItem('token')) // for actual app
              if(sessionStorage.getItem('token')) // for testing
                {
         
                 navigate('/')
                 
               }
              
             
          //  },[localStorage.getItem('token')]) // for actual app
              },[sessionStorage.getItem('token')])
  return (
   
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Login User</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input autoComplete='off'
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          
        </form>
      </div>
    </div>
    
  )
}

export default Login