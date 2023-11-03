import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDocs,collection } from "firebase/firestore";
import { db } from "../../Config/firebase/firebase";
import './style.css'
import Header from "../../Components/Header/Header";
import Image from "./../../Components/Image/Image";
import RestaurantCard from "./RestaurantCard";

function RestaurantShow() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const getRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, "Resturants"));
      const restaurantArray = [];
      querySnapshot.forEach((doc) => {
        restaurantArray.push({ id: doc.id, ...doc.data() });
      });
      setRestaurants(restaurantArray);
    };

    getRestaurants();
  }, []);

  return (
    <>
      <Header />
      <Image />
      <h1>Popular Restaurant</h1>
      <div
        className="restaurants-show-container"
        style={{
          display: "flex",
          width: "80%",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto",
          gap: "20px",
        }}
      >
        {restaurants.length &&
          restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} item={restaurant} onClick={navigate} />
          ))}
      </div>
    </>
  );
}

export default RestaurantShow;
