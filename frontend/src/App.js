import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Signup from './auth/Signup';
import Login from './auth/Login';
import AuthState from './context/AuthState';
const socket = io('http://localhost:5000');  // Replace with your server URL if necessary

function App() {
  
  const [data, setData] = useState({message:'',username:'',isAdmin:true});
  const [userMessage,setUserMessage]=useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('data', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('data');
    };
  }, []);

  const sendMessage = () => {
    if (data.message) {
      socket.emit('data', data);
      setMessages((prevMessages) => [...prevMessages, data]);
      setData({message:'',username:''});
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;  // Destructure name and value from the event target
    setData((prevData) => ({ ...prevData, [name]: value }));  // Correctly update the corresponding field
  };
  return (
    <>
      {/* <input type="text" name="username" id="username" value={data.username} onChange={handleOnChange} /> */}
      <AuthState>

      <Router>
      <NavBar/>
       <Routes>


      <Route path='/' element={<Home messages={messages} data={data} setData={setData} sendMessage={sendMessage} handleOnChange={handleOnChange}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      

      
      
     
       </Routes>
      </Router>
      </AuthState>
    </>
  );
}

export default App;
