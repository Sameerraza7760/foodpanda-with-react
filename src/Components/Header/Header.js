import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged, auth, swal } from "../../Config/firebase/firebase";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const resturents = useSelector(state => state.resturentReducer.resturentData);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const userName = user ? user.email.replace(/\d+/g, "").split("@")[0] : null;

  const tabNavigate = () => {
    if (!user) {
      return navigate("/account");
    }

    const isRestaurentUser = resturents?.some(item => user.email === item.restEmail);
    navigate(isRestaurentUser ? "/tabs" : "/tabuser");
  };

  const handleLogout = async () => {
    await auth.signOut();

    await swal({
      icon: "success",
      title: "Logout!",
      text: "Logged Out Successfully.",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });

    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <div className="header-image">
          <img
            src="https://cdn.worldvectorlogo.com/logos/foodpanda-logo.svg"
            alt="FoodPanda Logo"
          />
        </div>

        <div className="login-heading" style={{ marginTop: "20px", display: "flex", alignItems: "center",gap:"5px" }}>
          {user ? (
            <div className="dropdown">
              <button
                className="login-name"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  fontWeight: "bold",
                 
                }}
              >
                {userName}
              </button>
              <ul className="dropdown-menu"  style={{ color: "pink",  }}>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <h2
              className="login-heading"
              onClick={() => navigate("/account")}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Login
            </h2>
          )}

          <div className="profile-image">
            <i className="fa-regular fa-user" style={{ color: "white" }}></i>
          </div>

          <div className="shoping-icon-div">
            <i
              className="fa-solid fa-basket-shopping"
              onClick={tabNavigate}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
