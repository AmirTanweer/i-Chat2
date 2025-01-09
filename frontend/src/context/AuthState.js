import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from 'axios';

const AuthState = (props) => {
  const [response, setResponse] = useState({});
  const [userdetails,setUserDetails]=useState({});
  const [authtoken, setAuthtoken] = useState('');
    // console.log("userdetails empty or not ",Object.keys(userdetails).length === 0)
  useEffect(()=>{
    // setAuthtoken(localStorage.getItem('token')) // for actual app 
    setAuthtoken(sessionStorage.getItem('token')) //for testing 
    if(authtoken && Object.keys(userdetails).length === 0){
       getUserDetails()
    }
   
    
  },[authtoken,userdetails])
  
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
      // localStorage.setItem('token', result.data.token); // for actual app
      sessionStorage.setItem('token', result.data.token); // for testing 

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
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` //for actual app
          'Authorization':`Bearer ${sessionStorage.getItem('token')}`  // for testing
        },
      });
      // console.log('User Details:', result.data);
      setUserDetails(result.data.user) // Store user details if needed
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  const logout=()=>{
    // console.log("logging out")
    // localStorage.removeItem('token')  // for actual app
     sessionStorage.removeItem('token') //for testing app
    setAuthtoken('')

  }

  return (
    <AuthContext.Provider value={{ signup, response, login, authtoken, getUserDetails,logout ,userdetails}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
