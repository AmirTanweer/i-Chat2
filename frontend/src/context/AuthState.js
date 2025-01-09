import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from 'axios';

const AuthState = (props) => {
  const [response, setResponse] = useState({});
  const [authtoken, setAuthtoken] = useState('');

  
  const signup = async (formData) => { 
    try {
      const result = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.status);  // Adjust based on actual API response
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const login = async (formData) => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', result.data.token);
      setAuthtoken(result.data.token);
      await getUserDetails();
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getUserDetails =async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/auth/getdetails', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      console.log('User Details:', result.data);
      setResponse(result.data);  // Store user details if needed
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const logout=()=>{
    console.log("logging out")
    localStorage.removeItem('token')
    setAuthtoken('')

  }

  return (
    <AuthContext.Provider value={{ signup, response, login, authtoken, getUserDetails,logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
