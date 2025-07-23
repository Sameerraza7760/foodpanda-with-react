import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { signinFirebase, swal } from "../../Config/firebase/firebase";

import { TextField, button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Login function
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const resturent_Data = useSelector(
    (state) => state.resturentReducer.resturentData
  );
  console.log("resturentData=>", resturent_Data);

  let [whereToNavigate, setWhereToNavigate] = useState("/showResturent");
  const handleEmail = (e) => {
    resturent_Data?.forEach((item) => {
      if (item.restEmail === e.target.value) {
        setWhereToNavigate("/additem");

        return;
      }
    });
  };

  async function signin() {
    var email = document.getElementsByTagName("input")[0].value;
    var password = document.getElementsByTagName("input")[1].value;
    setLoading(true);
    try {
      await signinFirebase(email, password);
      await swal("Congratulations!", "Sussesfully Login", "success");

      navigate(whereToNavigate);
    } catch (e) {
      await swal(e.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="Accounts-container" >
        <h1 className="accounts-h1" style={{ color: "#e21b70" }}>
          {" "}
          log in by typing your name and password{" "}
        </h1>

        <TextField
          label="Enter Your Email"
          style={{ width: "90%", marginTop: "7%", fontFamily: "sans-serif" }}
          id="input"
          onChange={handleEmail}
        />
        <TextField
          label="Enter Your Password"
          style={{ width: "90%", marginTop: "7%", fontFamily: "sans-serif" }}
          type="password"
        />
       <button
          type="button"
          id="btn3"
          className="btn btn-primary"
          style={{
            color: "white",
            backgroundColor: "#e21b70",
            marginTop: "9%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px", // adds space between loader and text
          }}
          onClick={signin}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CircularProgress size={20} style={{ color: "white" }} />
              <span>Login...</span>
            </span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </>
  );
}

export default Login;
