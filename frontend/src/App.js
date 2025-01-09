import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Signup from './auth/Signup';
import Login from './auth/Login';
import AuthState from './context/AuthState';
import UserDetails from './components/UserDetails';
import AuthContext from './context/AuthContext';
import { useContext } from 'react';
const socket = io('http://localhost:5000');  // Replace with your server URL if necessary
function App() {
  
  // const {userdetails}=useContext(AuthContext)
  // console.log("Userdetails -> ",userdetails)
  const [otherUserName,setOtherUserName]=useState('')
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
    // setData({username:otherUserName})
    console.log("otherusername -> ",otherUserName)
    if (data.message) {
      
      socket.emit('data', data);
      setMessages((prevMessages) => [...prevMessages, data]);
      
      setData((prevData)=>({
        ...prevData,
        message:'' // reset only the message field
      }))
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;  // Destructure name and value from the event target
    setData((prevData) => ({ ...prevData, [name]: value }));  // Correctly update the corresponding field
    // setData({username:otherUserName})
  };
  return (
    <>
      {/* <input type="text" name="username" id="username" value={data.username} onChange={handleOnChange} /> */}
      <AuthState>

      <Router>
      <NavBar/>
       <Routes>


      <Route path='/' element={<Home setOtherUserName={setOtherUserName} messages={messages} data={data} setData={setData} sendMessage={sendMessage} handleOnChange={handleOnChange}/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/userdetails' element={<UserDetails/>}/>
      

      
      
     
       </Routes>
      </Router>
      </AuthState>
    </>
  );
}

export default App;
