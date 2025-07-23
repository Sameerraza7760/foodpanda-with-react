import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  auth,
  swal,
  setDoc,
  doc,
  db,
  getDocs,
  collection,
} from "../../Config/firebase/firebase";
import Button from "@mui/material/Button";
import { getDoc } from "firebase/firestore";
import Drawer from "@mui/material/Drawer";
import Header from "../../Components/Header/Header";
import "./style.css";

import { TextField ,CircularProgress} from "@mui/material";

const ResturentsDetail = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const params = useParams();
  const { id } = params;

  const [restItem, setRestItem] = useState([]);
  const [restShow, setRestShow] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [item, setItem] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  fetchCurrentLocation();
  useEffect(() => {
    const fetchRestItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ResturentsItems"));
        const itemsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestItem(itemsArray);
      } catch (error) {
        console.error("Error fetching restaurant items:", error);
      }
    };

    const filterRestItems = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const filteredItems = restItem.filter(
            (item) => id === item.id.slice(0, 28)
          );
          setRestShow(filteredItems);
        }
      });
    };

    const getRestaurants = async () => {
      try {
        const querySnapshot = await getDoc(doc(db, "Resturants", id));
        const restaurantArray = querySnapshot.data();

        setImage(restaurantArray.restImage);
        setName(restaurantArray.restName);
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    };

    fetchRestItems();
    filterRestItems();
    getRestaurants();
  }, [restItem, id]);

  const addItem = (itemName, itemPrice) => {
    swal("Item Added in Dashboard");
    setItem([...item, { itemName, itemPrice: parseInt(itemPrice) }]);
  };

  const totalItemPrice = item.reduce(
    (total, currentItem) => total + currentItem.itemPrice,
    0
  );

  const userData = async () => {
    try {
      const userName = document.getElementById("username").value;
      const userPhoneNumber = document.getElementById("userphonenumber").value;
      const { id } = params;
      const idRest = id;
      const location = [{ ...currentLocation }];
      const order = "Pending";

      const userDataObj = {
        userName,
        userPhoneNumber,
        item,
        idRest,
        order,
        location,
      };

      for (const key in userDataObj) {
        if (userDataObj[key].length === 0) {
          await swal("Please Fill All Inputs");
          return;
        }
      }

      console.log("auth==>", auth.currentUser.uid);
      setLoading(true);
      await setDoc(
        doc(db, "userBuyItems", `${auth.currentUser.uid}${Date.now()}`),
        userDataObj
      );
      await swal("Congratulations!", "Item Successfully Ordered", "success");
    } catch (error) {
      await swal(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...item];

    updatedItems.splice(index, 1);

    setItem(updatedItems);
  };

  return (
    <>
      <Header />
      <div className="resturents-Show-container">
        <div
          className="image-detail-container"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <h3 className="headingOFResturesnt">
          <span className="res-Name animated">{name?.toUpperCase()} ITEMS</span>
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "colunm",
            paddingLeft: "10%",
          }}
        >
          <Button
            variant="outlined"
            onClick={toggleDrawer}
            style={{
              color: "white",
              backgroundColor: "#e21b70",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Dashboard
          </Button>
          <Button
            variant="outlined"
            style={{
              color: "white",
              backgroundColor: "#e21b70",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10%",
              margin: 0,
              marginLeft: "4px",
            }}
            onClick={() => navigate("/chatpage")}
          >
            Messege
          </Button>
        </div>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <div style={{ padding: 20 }} className="Drawer">
            <h1 className="dashboardTitle">Dashboard</h1>

            <hr />
            {/* Add your content here */}
            <TextField
              id="username"
              label="Enter Your Username"
              multiline
              maxRows={4}
              variant="standard"
              style={{ width: "90%" }}
            />
            {/* <hr /> */}
            <TextField
              id="userphonenumber"
              label="Enter Your Phonenumber"
              multiline
              maxRows={4}
              variant="standard"
              style={{ width: "90%", marginTop: "5%" }}
            />
            {/* <hr /> */}
            <TextField
              id="address"
              label="Enter Your Address"
              multiline
              maxRows={4}
              variant="standard"
              style={{ width: "90%", marginTop: "5%" }}
            />
            {/* <hr /> */}
            <div className="select-container">
              <select
                className="custom-select"
                aria-label="Payment Method"
                style={{ width: "100%" }}
                defaultValue="" // Set the default selected value here
              >
                <option disabled>Payment Method</option>
                <option value="on_delivery">On Delivery</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div className="selected-items">
              <h1>Selected Items:</h1>
              <ol>
                {item.map((item, index) => (
                  <li key={index}>
                    {item.itemName} - {item.itemPrice}
                    <button
                      onClick={() => deleteItem(index)}
                      style={{
                        backgroundColor: "#e21b70",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginLeft: "40%",
                      }}
                    >
                      Delete item
                    </button>
                  </li>
                ))}
              </ol>
              <p>Total Item Price: {totalItemPrice}</p>
            </div>

            <div className="modal-footer">
              <Button variant="outlined" onClick={toggleDrawer}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={userData}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CircularProgress size={20} style={{ color: "white" }} />
                    <span>Ordering...</span>
                  </span>
                ) : (
                  "Order Now"
                )}
              </Button>
            </div>
          </div>
        </Drawer>
      </div>

      <div className="cardContainer" style={{ marginTop: "35px" }}>
        {restShow.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.itemImage} alt="Card Image" />
            <div className="card-content">
              <h2>{item.itemName}</h2>
              <p href="#">{item.itemPrice}</p>
              <p>{item.itemDescribtion}</p>
              <i
                className="fa-solid fa-cart-plus"
                style={{ color: "#e21b70" }}
                onClick={() => addItem(item.itemName, item.itemPrice)}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div></div>
      </div>
    </>
  );
};

export default ResturentsDetail;
