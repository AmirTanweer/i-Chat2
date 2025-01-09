import React from 'react'
import MessageWindow from './MessageWindow'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const Home = (props) => {
  const navigate=useNavigate()
  
  const {userdetails}=useContext(AuthContext)
  const {data,messages,setData,sendMessage,handleOnChange,setOtherUserName}=props
  const [showInput, setShowInput] = useState(false);
  console.log("userdetails from home -> ",userdetails)
  
  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //     navigate('/')
  //       // setData({username:userdetails.username})
  //     }
  //     else{
  //       navigate('/login')
  //     }
  //     setOtherUserName(userdetails.username)
  // }, [localStorage.getItem('token')])
  useEffect(() => {
    // if(!localStorage.getItem('token')) // for actual app
    if (!sessionStorage.getItem('token'))  // for testing
      {
      navigate('/login');
    } else {
      if (userdetails && userdetails.username) {
        setData((prevData) => ({ ...prevData, username: userdetails.username }));
        setOtherUserName(userdetails.username);
      }
    }
  }, [userdetails, setData, setOtherUserName, navigate]);
  

  return (
    <>
    <h3 style={{display:"flex",justifyContent:"center", margin:'10px', padding:"5px",backgroundColor:"#f8f9fa"}}>i-Chat (messaging app)</h3>
    <section style={{width:"100%",height:"86.7vh"}}>
       <MessageWindow username={userdetails.username} messages={messages} data={data} setData={setData} />
    </section>
    <div 
      style={{ position: 'fixed', bottom: '0', width: '100%' ,height:'60px' }}
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
    >
      {showInput && (
        <div 
          className="mb-3 d-flex align-items-center" 
          style={{ padding: '10px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}
        >
          <input 
            onChange={handleOnChange}
            name="message"
            value={data.message}
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            style={{ flex: '1', borderRadius: '20px' }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={sendMessage}
            style={{ borderRadius: '20px' }}
          >
            Send
          </button>
        </div>
       )} 
    </div>

   
    

    </>
  )
}

export default Home