import React,{useState,useEffect} from 'react'
import { Button, Input, Avatar } from 'antd';
import { addDoc,db,collection,serverTimestamp,getDocs,auth,query,where,onSnapshot,onAuthStateChanged,getAuth } from './../../Config/firebase/firebase';
import { UserOutlined } from '@ant-design/icons';
import Header from '../../Components/Header/Header';
function Adminchat() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [slidebarName,setSlidebarName]=useState([])
  const [constumerName,setConstumerName]=useState([])


useEffect(()=>{
  const userUID = auth.currentUser?.uid;
  localStorage.setItem('Yourid',userUID)
  const userEmail = auth.currentUser?.email;
  localStorage.setItem('yourEmail',userEmail)
  const constumerNames = async () => {
    const Email = localStorage.getItem('yourEmail');
    if (Email) {
      try {
        const querySnapshot = await getDocs(collection(db, 'messeges'), where('costumerEmail', '!=', Email));
        const constumer = [];
        querySnapshot.forEach((doc) => {
          constumer.push({ id: doc.id, ...doc.data() });
        });
        setSlidebarName(constumer);

       
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    } else {
      console.error('Email is undefined or null.');
    }
  };

  constumerNames()
  
})



let yoursID;
let chatRoomId;
let friendid;
let youremail;

let chatId = localStorage.getItem('chatid');
let recieverid=localStorage.getItem('friendid')


const handleSidebarItemClick=(item)=>{

  const id = localStorage.getItem('Yourid');
  yoursID =id;
  friendid = item.senderid;
  youremail=auth.currentUser.email
  console.log(yoursID,friendid,youremail);

  if (yoursID && friendid) {
    chatRoomId = yoursID < friendid ? yoursID + friendid : friendid + yoursID;
    localStorage.setItem('chatid', chatRoomId);
    localStorage.setItem('friendid',friendid)
  
  } else {
    console.log("yoursID or friendid is undefined. Cannot set chatRoomId.");
  }

  console.log("dost==>",friendid);



  setConstumerName(item.costumerEmail)


  const q = query(collection(db, 'messeges'), where("chatRoomId", '==', chatRoomId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messeges = [];
    querySnapshot.forEach((doc) => {
      messeges.push(doc.data());
    });

    displayMesseges(messeges)
  });
}


// getAllMesseges();

const displayMesseges = (messege) => {

  setMessages(messege);
  

};



const sendMessege=async()=>{

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
  
  
}



  return (
    <>
    <Header />
   
   <div style={{ display: 'flex', height: '100vh' }}>
   {/* Sidebar */}
   <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '10px', height:'100%' , boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
     <h2 style={{fontSize:'19px',color:'#e21b70',fontFamily:'sans-serif',marginBottom:'19px'}} >Users</h2>
     {Array.from(new Set(slidebarName.map(item => item.costumerEmail)))
       .filter(email => email !== auth.currentUser.email)
       .map((email, index) => {
         const item = slidebarName.find(item => item.costumerEmail === email);
   
         return (
           <div key={index} style={{ marginBottom: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
             <Avatar style={{ marginRight: '5px' }} size="small" icon={<UserOutlined />} />
             <Button
               type="primary"
               style={{ paddingTop: '4%', fontFamily: 'sans-serif', width: '200px', fontWeight: 'bold', color: 'white', fontSize: '15px' }}
               onClick={() => handleSidebarItemClick(item)}
             >
               {email}
             </Button>
           </div>
         );
       })}
   </div>
   
   {/* Main Content */}
   <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
       <h2 style={{margin:'auto',fontFamily:'sans-serif',fontWeight:'500',color:'#e21b70'}} >{constumerName}</h2>
       {/* <Button type="primary" onClick={sendMessage}>Send</Button> */}
     </div>
     <div style={{ height: '70%', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
       {messages.map((item, index) => (
         <div key={index} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', backgroundColor: '#fff', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
           {item.messege}
         </div>
       ))} 
     </div>
     <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
       <Input
         // value={newMessage}
         onChange={(e) => setNewMessage(e.target.value)}
         placeholder="Type a message..."
         style={{ marginRight: '10px', flex: 1 }}
         // onPressEnter={sendMessage}
       />
       <Button type="primary" onClick={sendMessege} >Send</Button>
     </div>
   </div>
   </div>
   
    </>
  )
}

export default Adminchat



