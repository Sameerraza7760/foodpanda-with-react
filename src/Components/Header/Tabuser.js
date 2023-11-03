import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

import Header from "./Header";
import { auth, getDocs, collection, db } from "../../Config/firebase/firebase";
import { useEffect } from "react";
const useStyles = makeStyles((theme) => ({
  centeredTabs: {
    display: "flex",
    justifyContent: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabs: {
    margin: "20px",
    [theme.breakpoints.down('400')]: {
      margin: "10px",       
      fontSize: "14px",    
    },
  },
}));


function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
function CustomTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userUid, setUseruid] = useState("");

  const [useritems, setUserItems] = useState([]);
  
  const [pendingOrder, setPendingOrder] = useState([]);
  const [accseptedOrder,setAccseptedOrder]=useState([])
  const[deleveredOrder,setDeleveredOrder]=useState([])
  const [rejectedOrder,setRejectedOrder]=useState([])

  useEffect(() => {
    async function getItems() {
      const querySnapshot = await getDocs(collection(db, "userBuyItems"));

      const usersOrder = [];
      querySnapshot.forEach((doc) => {
        usersOrder.push({ id: doc.id, ...doc.data() });
      });

      setUserItems(usersOrder);
    }
    getItems();
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUseruid(user.uid);
        console.log(user.uid)
      }
    });
    setPendingOrder(useritems.filter((item) => item.id.slice(0,28) === userUid && item.order==="Pending"));
    setAccseptedOrder(useritems.filter((item)=>  item.id.slice(0,28)=== userUid && item.order==="Accepted"))
    setDeleveredOrder(useritems.filter((item) =>item.id.slice(0,28) === userUid && item.order==="Delevered"));
    setRejectedOrder(useritems.filter((item) => item.id.slice(0,28) === userUid && item.order==="Rejected"));
    console.log(useritems)
  }, [userUid, useritems]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
const calculateTotalPrice=(items)=>{
let totalPrice=0
items.item.forEach((item)=>{
  totalPrice+=Number(item.itemPrice)
})
return totalPrice
}
  return (
    <>
      <Header />
      <Box className={classes.centeredTabs}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className={classes.tabs}
        >
          <Tab label="Pending" />
          <Tab label="On the Way" />
          <Tab label="Delevered" />
           <Tab label="Rejected" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="cardContainer">
          {pendingOrder.map((items, index) => (
            <div
              key={items.idRest}
              style={{
                height: "100%",
                boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                paddingTop: "25px",
                width: "300px",
              }}
              className="orderShow"
            >
              <h1 style={{ fontFamily: "sans-serif" }}>Order :{index + 1}</h1>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {items.userName} n  
              </p>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {" "}
                {items.userPhoneNumber}
              </p>

              {/* Rendering the nested item array */}
              {items?.item?.map((item, index) => (
                <div key={index}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {item?.itemName}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {" "}
                    
                    {item.itemPrice}
                   
                  </p>      </div>
                    ))}
                  Total Price: {calculateTotalPrice(items)}
              {/* Button to accept the order */}
             

              <br />

            
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="cardContainer">
          {accseptedOrder.map((items, index) => (
            <div
              key={items.idRest}
              style={{
                height: "100%",
                boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                paddingTop: "25px",
                width: "300px",
              }}
              className="orderShow"
            >
              <h1 style={{ fontFamily: "sans-serif" }}>Order :{index + 1}</h1>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {items.userName} n  
              </p>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {" "}
                {items.userPhoneNumber}
              </p>

              {/* Rendering the nested item array */}
              {items?.item?.map((item, index) => (
                <div key={index}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {item?.itemName}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {" "}
                    
                    {item.itemPrice}
                   
                  </p>      </div>
                    ))}
                  Total Price: {calculateTotalPrice(items)}
            

              <br />

              {/* Button to reject the order */}
              
            </div>
          ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="cardContainer">
          {deleveredOrder.map((items, index) => (
            <div
              key={items.idRest}
              style={{
                height: "100%",
                boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                paddingTop: "25px",
                width: "300px",
              }}
              className="orderShow"
            >
              <h1 style={{ fontFamily: "sans-serif" }}>Order :{index + 1}</h1>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {items.userName} n  
              </p>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {" "}
                {items.userPhoneNumber}
              </p>

              {/* Rendering the nested item array */}
              {items?.item?.map((item, index) => (
                <div key={index}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {item?.itemName}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {" "}
                    
                    {item.itemPrice}
                   
                  </p>      </div>
                    ))}
                  Total Price: {calculateTotalPrice(items)}
              {/* Button to accept the order */}
           
              <br />

              {/* Button to reject the order */}
           
            </div>
          ))}
        </div>
      </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
        <div className="cardContainer">
          {rejectedOrder.map((items, index) => (
            <div
              key={items.idRest}
              style={{
                height: "100%",
                boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                paddingTop: "25px",
                width: "300px",
              }}
              className="orderShow"
            >
              <h1 style={{ fontFamily: "sans-serif" }}>Order :{index + 1}</h1>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {items.userName} n  
              </p>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {" "}
                {items.userPhoneNumber}
              </p>

              {/* Rendering the nested item array */}
              {items?.item?.map((item, index) => (
                <div key={index}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {item?.itemName}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {" "}
                    
                    {item.itemPrice}
                   
                  </p>
                  </div>
                    ))}
                  Total Price: {calculateTotalPrice(items)}
              {/* Button to accept the order */}
            
              <br />
            
            </div>
          ))}
        </div>
      </CustomTabPanel>
         <CustomTabPanel value={value} index={4}>
         <div className="cardContainer">
          {pendingOrder.map((items, index) => (
            <div
              key={items.idRest}
              style={{
                height: "100%",
                boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                paddingTop: "25px",
                width: "300px",
              }}
              className="orderShow"
            >
              <h1 style={{ fontFamily: "sans-serif" }}>Order :{index + 1}</h1>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {items.userName} n  
              </p>
              <p style={{ fontSize: "20px", fontFamily: "sans-serif" }}>
                {" "}
                {items.userPhoneNumber}
              </p>

              {/* Rendering the nested item array */}
              {items?.item?.map((item, index) => (
                <div key={index}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {item?.itemName}
                  </p>
                  <p
                    style={{
                      fontSize: "20px",
                      fontFamily: 'Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    {" "}
                    
                    {item.itemPrice}
                   
                  </p>      </div>
                    ))}
                  Total Price: {calculateTotalPrice(items)}
              <br />
            </div>
          ))}
        </div>
      </CustomTabPanel>
    </>
  );
}
export default CustomTabs;
