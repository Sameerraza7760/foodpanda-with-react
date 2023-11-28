import React from "react";

import { TextField } from "@mui/material";
import {
  auth,
  swal,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  collection,
  getDocs,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "../../Config/firebase/firebase";
import { ResturentData } from "../../Redux/useraction/useraction";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";
<TextField id="filled-basic" label="Filled" variant="filled" />;
function SignupResturent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createResturent = async () => {
    try {
      const restName = document.getElementById("resturentname").value;
      const restCountry = document.getElementById("country").value;
      const restCity = document.getElementById("city").value;
      const restContact = document.getElementById("contactnumber").value;
      const restEmail = document.getElementById("email").value;
      const restPassword = document.getElementById("password").value;
      const restImage = await uploadImage(
        document.getElementById("image").files[0]
      );
      let resturentData = {
        restCountry,
        restCity,
        restName,
        restContact,
        restEmail,
        restImage,
      };
      for (let i in resturentData) {
        if (resturentData[i].length === 0) {
          await swal("Please Fill All Inputs");
          return;
        }
      }
      if (restContact.length < 11) {
        await swal("Phone Number is Less then 11");
        return;
      }
      await createUserWithEmailAndPassword(auth, restEmail, restPassword);
      await setDoc(doc(db, "Resturants", auth.currentUser.uid), resturentData);
      await swal("Congratulations!", "Company Account Created", "success");
      const querySnapshot = await getDocs(collection(db, "Resturants"));
      const resturent_array = [];
      querySnapshot.forEach((doc) => {
        resturent_array.push({ id: doc.id, ...doc.data() });
      });

      console.log(resturent_array);
      dispatch(ResturentData(resturent_array));

      navigate("/login");
    } catch (e) {
      swal({
        icon: "error",
        title: "Oops...",
        text: e.message,
      });
    }
  };
  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  return (
    <div className="siginupResturent-container" style={{height:'100%'}} >
      <div className="signupResturent-para">
        <h1>Partner with us</h1>
        <p>
          We’re hungry for the best things in life: bringing the best food and
          redefining the shopping experience to our customers.
        </p>
        <p>
          foodpanda is multi-national, fast-growing business that maintains its
          appeal as localised service with community ambition.
        </p>
      </div>
      <div className="signupResturent-form" style={{height:'97%'}} >
        <h3>
          Interested? Fill in the form below to become our partner and increase
          your revenue!
        </h3>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg  "
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "7%",
            height: "60px",
          }}
          placeholder="Resturent Name"
          id="resturentname"
        />
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg  "
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "7%",
            height: "60px",
          }}
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg  "
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "7%",
            height: "60px",
          }}
          placeholder="Password"
          id="password"
        />

        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg  "
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "7%",
            height: "60px",
          }}
          placeholder="ContactNumber"
          id="contactnumber"
        />
       <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          style={{ width: '80%', margin: 'auto', marginTop: '7%' }}
          id="city"
          defaultValue="Select City"
        >
          <option disabled>Select City</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

    
        <select
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example"
          id="country"
          style={{ width: "80%", margin: "auto", marginTop: "7%" }}
        >
          <option value="Pakistan">Pakistan</option>
        </select>
        <div
          className="input-group mb-3"
          style={{ width: "80%", margin: "auto", marginTop: "7%" }}
        >
          <label className="input-group-text" >
            Upload
          </label>
          <input type="file" className="form-control" id="image" />
        </div>
        <button
          type="button"
          id="btn3"
          className="btn btn-primary"
          style={{
            color: "white",
            backgroundColor: "#e21b70",
            marginTop: "3%",
            width: "80%",
            border: "none",
          }}
          onClick={createResturent}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignupResturent;
