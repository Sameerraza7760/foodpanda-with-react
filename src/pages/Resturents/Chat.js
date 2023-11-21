import React, { useEffect, useState } from 'react';
import { Button, Input, Avatar } from 'antd';
import { addDoc,db,collection,serverTimestamp,getDocs,auth,query,where,onSnapshot,onAuthStateChanged,getAuth } from './../../Config/firebase/firebase';
import Header from '../../Components/Header/Header';

import { UserOutlined } from '@ant-design/icons';
function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [sidebarItems, setSidebarItems] = useState(['Restaurant 1', 'Restaurant 2', 'User 1', 'User 2']);
    const [selectedItem, setSelectedItem] = useState('');
    const [resturentName,setResturentName]=useState(null)





useEffect(()=>{
    const getResturentName=async()=>{
        const querySnapshot = await getDocs(collection(db, "Resturants"))
        const resturent_array=[]
        querySnapshot.forEach((doc) => {
          resturent_array.push({ id: doc.id, ...doc.data()})
        })
  
        console.log(resturent_array);

        setResturentName(resturent_array)

       
    }

    getResturentName()
},[])

let yoursID;
let chatRoomId;
let friendid;
let youremail;





const handleSidebarItemClick = (item) => {
  setSelectedItem(item);
if(selectedItem !=null){
  
  yoursID = auth.currentUser.uid;
  friendid = item.id;
  youremail=auth.currentUser.email
  console.log(yoursID,friendid,youremail);

  if (yoursID && friendid) {
    chatRoomId = yoursID < friendid ? yoursID + friendid : friendid + yoursID;
    localStorage.setItem('chatid', chatRoomId);
    localStorage.setItem('friendid',friendid)
  
  } else {
    console.log("yoursID or friendid is undefined. Cannot set chatRoomId.");
  }
}
};

let chatId = localStorage.getItem('chatid');
let recieverid=localStorage.getItem('friendid')


const sendMessage = async () => {
  if (chatId) {
    try {
      const docref = await addDoc(collection(db, "messeges"), {
        messege: newMessage,
        chatRoomId: chatId,
        timestamp: serverTimestamp(),
        costumerEmail:auth.currentUser.email,
        recieverid:recieverid,
        senderid:auth.currentUser.uid
      });

      
      setNewMessage('')

   
    } catch (error) {
      console.log("Error sending message:", error.message);
    }
  } else {
    console.log("chatRoomId is undefined. Cannot send message.");
  }

};

const getAllMesseges = () => {
  const q = query(collection(db, 'messeges'), where("chatRoomId", '==', chatId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messeges = [];
    querySnapshot.forEach((doc) => {
      messeges.push(doc.data());
    });

    displayMesseges(messeges);
  });

};

getAllMesseges();

const displayMesseges = (messege) => {
//   console.log("here ==> ", messege);
  setMessages(messege);
};



  return (
   <>
    <Header />
    <div style={{ display: 'flex', height: '100vh' }}>
    {/* Sidebar */}
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{fontSize:'19px',color:'#e21b70',fontFamily:'sans-serif',marginBottom:'19px'}} >Returents names</h2>
      {   resturentName?.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => handleSidebarItemClick(item)}>
          <Avatar style={{ marginRight: '5px' }} size="small" icon={<UserOutlined />} />
       <Button type="primary" style={{paddingTop:'4%', fontFamily:'sanserif',width:'200px',fontWeight:'bold',color:'white',fontSize:'15px' }}  > {item.restName}</Button> 
        </div>
      ))}
    </div>

    {/* Main Content */}
    <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{selectedItem.restName}</h2>
        {/* <Button type="primary" onClick={sendMessage}>Send</Button> */}
      </div>
      <div style={{ height: '600px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
        {messages.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
            {item.messege}
          </div>
        ))} 
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ marginRight: '10px', flex: 1 }}
          onPressEnter={sendMessage}
        />
        <Button type="primary" onClick={sendMessage}>Send</Button>
      </div>
    </div>
  </div>
   </>

  )
}

export default Chat