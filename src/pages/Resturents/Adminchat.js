import React, { useState, useEffect } from "react";
import { Button, Input, Avatar } from "antd";
import {
  addDoc,
  db,
  collection,
  serverTimestamp,
  getDocs,
  auth,
  query,
  where,
  onSnapshot,
  onAuthStateChanged,
  getAuth,
} from "./../../Config/firebase/firebase";
import "./style.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
function Adminchat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [slidebarName, setSlidebarName] = useState([]);
  const [constumerName, setConstumerName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userUID = auth.currentUser?.uid;
    localStorage.setItem("Yourid", userUID);
    const userEmail = auth.currentUser?.email;
    localStorage.setItem("yourEmail", userEmail);
    const constumerNames = async () => {
      const Email = localStorage.getItem("yourEmail");
      if (Email) {
        try {
          const querySnapshot = await getDocs(
            collection(db, "messeges"),
            where("costumerEmail", "!=", Email)
          );
          const constumer = [];
          querySnapshot.forEach((doc) => {
            constumer.push({ id: doc.id, ...doc.data() });
          });
          setSlidebarName(constumer);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        console.error("Email is undefined or null.");
      }
    };

    constumerNames();
  });

  let yoursID;
  let chatRoomId;
  let friendid;
  let youremail;

  let chatId = localStorage.getItem("chatid");
  let recieverid = localStorage.getItem("friendid");

  const handleSidebarItemClick = (item) => {
    const id = localStorage.getItem("Yourid");
    yoursID = id;
    friendid = item.senderid;
    youremail = auth.currentUser.email;
    console.log(yoursID, friendid, youremail);

    if (yoursID && friendid) {
      chatRoomId = yoursID < friendid ? yoursID + friendid : friendid + yoursID;
      localStorage.setItem("chatid", chatRoomId);
      localStorage.setItem("friendid", friendid);
    } else {
      console.log("yoursID or friendid is undefined. Cannot set chatRoomId.");
    }

    console.log("dost==>", friendid);

    setConstumerName(item.costumerEmail);

    const q = query(
      collection(db, "messeges"),
      where("chatRoomId", "==", chatRoomId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messeges = [];
      querySnapshot.forEach((doc) => {
        messeges.push(doc.data());
      });

      displayMesseges(messeges);
    });
  };

  // getAllMesseges();

  const displayMesseges = (messege) => {
    setMessages(messege);
  };

  const sendMessege = async () => {
    if (chatId) {
      try {
        const docref = await addDoc(collection(db, "messeges"), {
          messege: newMessage,
          chatRoomId: chatId,
          timestamp: serverTimestamp(),
          costumerEmail: auth.currentUser.email,
          recieverid: recieverid,
          senderid: auth.currentUser.uid,
        });
        setNewMessage("");
      } catch (error) {
        console.log("Error sending message:", error.message);
      }
    } else {
      console.log("chatRoomId is undefined. Cannot send message.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="chatContainer"
        style={{ display: "flex", height: "100vh", backgroundColor: "#2b001f" }}
      >
        {/* Sidebar */}
        <div
          className="slidebarContainer"
          style={{
            width: "200px",
            backgroundColor: "#4a0040",
            padding: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "19px",
              color: "#ff66b2",
              fontFamily: "sans-serif",
              marginBottom: "19px",
            }}
          >
            Users
          </h2>
          {Array.from(new Set(slidebarName.map((item) => item.costumerEmail)))
            .filter((email) => email !== auth.currentUser.email)
            .map((email, index) => {
              const item = slidebarName.find(
                (item) => item.costumerEmail === email
              );

              return (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    style={{ marginRight: "5px" }}
                    size="small"
                    icon={<UserOutlined />}
                  />
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                      fontFamily: "sanserif",
                      fontWeight: "bold",
                      backgroundColor: "#ff66b2",
                      borderColor: "#ff66b2",
                    }}
                    onClick={() => handleSidebarItemClick(item)}
                  >
                    {email}
                  </Button>
                </div>
              );
            })}
        </div>

        {/* Main Content */}
        <div
          style={{ flex: 1, padding: "20px", backgroundColor: "#2b001f" }}
          className="chatc"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                margin: "auto",
                fontFamily: "sans-serif",
                fontWeight: "500",
                color: "#e21b70",
              }}
            >
              {constumerName}
            </h2>
            {/* <Button type="primary" onClick={sendMessage}>Send</Button> */}
          </div>
          <div style={{ textAlign: "right", paddingBottom: "4px" }}>
            <button
              onClick={() => navigate("/additem")}
              style={{
                backgroundColor: "#ff66b2", // Dark Pink
                color: "#fff", // White text
                padding: "8px 16px", // Adjust padding for a better appearance
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              Back
            </button>
          </div>
          <div
            style={{
              height: "80%",
              overflowY: "auto",
              border: "1px solid #ff66b2",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            {messages.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "8px",
                  borderRadius: "5px",
                  backgroundColor: "#4a0040",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  color: "#ff66b2",
                }}
              >
                {item.messege}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ marginRight: "10px", flex: 1 }}
              onPressEnter={sendMessege}
            />
            <Button
              type="primary"
              onClick={sendMessege}
              style={{ backgroundColor: "#ff66b2" }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminchat;
