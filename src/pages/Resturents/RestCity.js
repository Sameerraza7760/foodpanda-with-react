import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Config/firebase/firebase";
import Header from "../../Components/Header/Header";
import RestaurantCard from "./RestaurantCard";
import "./style.css";

function RestCity() {
  const navigate = useNavigate();
  const cityName = useSelector((state) => state.cityResturent.e);
  const [resturents, setRestuents] = useState([]);
  useEffect(() => {
    const getRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, "Resturants"));
      const restaurantArray = [];
      querySnapshot.forEach((doc) => {
        restaurantArray.push({ id: doc.id, ...doc.data() });
      });
      setRestuents(restaurantArray);
    };
    getRestaurants();
  }, []);

  return (
    <>
      <Header />
      <h1 className="restCity">Resturents In {cityName}</h1>
      <div className="cardContainer" style={{ marginTop: "7%" }}>
        {resturents
          .filter((item) => item.restCity === cityName)
          .map((item, index) => (
            <RestaurantCard key={index} item={item} onClick={navigate} />
          ))}
      </div>
    </>
  );
}

export default RestCity;
