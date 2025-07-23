import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import { TextField, CircularProgress } from "@mui/material";
import { SignupFirebase, swal, auth } from "../../Config/firebase/firebase";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function signUp() {
    var userName = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    setLoading(true);
    try {
      await SignupFirebase({ email, password, userName });
      await swal("Congratulations!", "Sussesfully Signup", "success");
      navigate("/login");
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
      <div className="Accounts-container" style={{ height: "auto" }} >
        <h1 className="accounts-h1" style={{ color: "#e21b70" }}>
          SIGIN BY TYPING YOUR Username AND Email
        </h1>
        <TextField
          label="Enter Your username"
          style={{ width: "90%", marginTop: "7%", fontFamily: "sans-serif" }}
          id="username"
        />
        <TextField
          label="Enter Your Email"
          style={{ width: "90%", marginTop: "7%", fontFamily: "sans-serif" }}
          id="email"
        />
        <TextField
          label="Enter Your Password"
          style={{ width: "90%", marginTop: "7%", fontFamily: "sans-serif" }}
          type="password"
          id="password"
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
          onClick={signUp}
        >
          {loading ? (
            <>
              <CircularProgress size={20} style={{ color: "white" }} />
              <span>Signing up...</span>
            </>
          ) : (
            "Sign up"
          )}
        </button>

      </div>
    </>
  );
}

export default Signup;
