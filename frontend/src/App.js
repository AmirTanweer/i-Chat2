import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Home from './components/Home';

const socket = io('http://localhost:4000');  // Replace with your server URL if necessary

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
    <div >
      <input type="text" name="username" id="username" value={data.username} onChange={handleOnChange} />
      <Home messages={messages} data={data} setData={setData} sendMessage={sendMessage} handleOnChange={handleOnChange}/>
      {/* <h1>Socket.io Chat</h1>
      <div>
        <input
          type="text"
          value={data.message} name='message'
          onChange={handleOnChange}
          placeholder="Type a message"
        />
        <input
          type="text"
          value={data.username} name='username'
          onChange={handleOnChange}
          placeholder="Type user name"
        />

        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((msg,index) => (
         <li key={index}>
         <strong>{msg.username}: </strong>
         {msg.message}
       </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
