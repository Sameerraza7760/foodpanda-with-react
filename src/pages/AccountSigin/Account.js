import React from "react";
import Header from "../../Components/Header/Header";
import "./style.css";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  addUserToDB,
  swal,
} from "../../Config/firebase/firebase";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInGoogle = async () => {
    try {
      var provider = new GoogleAuthProvider();
      const result = await auth;
      await signInWithPopup(auth, provider);
      await addUserToDB();
      await swal({
        icon: "success",
        title: "Successfully Registered",
        text: "You have been successfully registered!",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
      localStorage.setItem("uid", auth.currentUser.uid);

      navigate("/showResturent");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <Header />

      <div className="Accounts-container" style={{ height: "auto" }}>
        <h1 className="accounts-h1">Welcome!</h1>
        <p className="accounts-para" onClick={() => navigate("/Signup")}>
          Sign up or log in to continue
        </p>
        <button
          type="button"
          className="btn btn-dark"
          style={{ backgroundColor: "#000" }}
        >
          Continue With Apple
        </button>
        <button
          type="button"
          className="btn btn-dark"
          style={{ backgroundColor: "lightgray", color: "black" }}
          onClick={signInGoogle}
        >
          Continue With Google
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ color: "white", backgroundColor: "#1877f2" }}
        >
          Continue With Facebook
        </button>
        <button
          type="button"
          id="btn3"
          className="btn btn-primary"
          style={{ color: "white", backgroundColor: "#e21b70" }}
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
        <button
          type="button"
          id="btn4"
          className="btn btn-primary"
          onClick={() => navigate("/Signup")}
          style={{
            color: "#e21b70",
            backgroundColor: "white",
            border: "#e21b70 1px solid",
          }}
        >
          Sign up
        </button>{" "}
        <br />
        <span style={{ color: "#e21b70", textalign: "centre" }}>OR</span> <br />
        <button
          type="button"
          id="btn4"
          className="btn btn-primary"
          style={{
            color: "#e21b70",
            backgroundColor: "white",
            border: "#e21b70 1px solid",
          }}
          onClick={() => navigate("/SignupR")}
        >
          Signup as a Resturent
        </button>{" "}
        <br />
        <p className="accounts-para2">
          By signing up, you agree to our{" "}
          <span color="pink"> Terms and Conditions</span> and{" "}
          <span color="#e21b70">Privacy Policy</span>.
        </p>
      </div>
    </>
  );
}

export default Account;
