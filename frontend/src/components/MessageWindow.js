import React from 'react'

const MessageWindow = (props) => {
    const {data,messages,setData,sendMessage,username}=props
  return (
    <div style={{backgroundColor:"#f8f9fa",height:'100%'}}>
        {
            messages.map((msg,index)=>(
                msg.isAdmin===false?<div key={index} className='User-block' style={{width:'100%',height:'auto',display:'flex'}}>
                <div className="left-message m-2 p-2" style={{border:'1px solid black',borderRadius:"0px 20px 20px 0px",width:"50%",float:"left", textAlign:'left' ,backgroundColor: '#5d6625',color:"white"}} >{msg.message}</div>
                 <div className="left-User m-2 p-2" style={{border:'1px solid black',borderRadius:"22px",float:"left", textAlign:'left', display:'flex' ,alignItems: 'center' ,backgroundColor: '#5d6625',color:'white'}}>{msg.username}</div>
                </div> 
                :
                <div key={index} className='User-block' style={{width:'100%',height:'auto',display:'flex', justifyContent:'end'}}>
                <div className="left-User m-2 p-2" style={{border:'1px solid black',borderRadius:"22px",float:"right", display:'flex' ,alignItems: 'center' , textAlign:'right' ,backgroundColor: '#30bfaa',color:'white'}}>{username}</div>
                 <div className="right-message m-2 p-2" style={{border:'1px solid black',borderRadius:"20px 0px 0px 20px",width:"50%",float:"right", textAlign:'right' ,backgroundColor: '#30bfaa',color:'white'}}>{msg.message}</div>
                 </div>
                
            ))
        }
       
    </div>
  )
}

export default MessageWindow