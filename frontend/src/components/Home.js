import React from 'react'
import MessageWindow from './MessageWindow'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const Home = (props) => {
  const navigate=useNavigate()
  
  const {getUserDetails}=useContext(AuthContext)
  const {data,messages,setData,sendMessage,handleOnChange}=props
  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/')
        // getUserDetails()
      }
      else{
        navigate('/login')
      }
  }, [localStorage.getItem('token')])
  
  

  return (
    <>
    <h3 style={{display:"flex",justifyContent:"center", margin:'10px', padding:"5px",backgroundColor:"#f8f9fa"}}>i-Chat (messaging app)</h3>
    <section style={{width:"100%",height:"86.7vh"}}>
       <MessageWindow  messages={messages} data={data} setData={setData} />
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

   {/* <div className="mb-3 d-flex align-items-center"  style={{ position: 'fixed', bottom: '0', width: '100%', padding: '10px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
  <input  onChange={handleOnChange} name='message' value={data.message}
    type="text" 
    className="form-control me-2" 
    id="exampleFormControlInput1" 
    placeholder="Type a message..." 
    style={{ flex: '1', borderRadius: '20px' }}
    />
  <button type='button' className='btn btn-primary' onClick={sendMessage} style={{ borderRadius: '20px' }}>
    Send
  </button>
</div> */}
    

    </>
  )
}

export default Home