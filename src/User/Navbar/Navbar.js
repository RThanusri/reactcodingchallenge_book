import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material"; 
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAlertType("success");
    setAlertMsg("Logged out successfully!");
    setShowAlert(true);
    nav("/");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="Navbar">
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "320px",
          }}
        >
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}

      <img src="https://i.postimg.cc/RVQtNqKk/books-logo-illustrated-isolated-design-53710670-1.webp" alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li className={menu === "home" ? "active" : ""}>
          <Link to="/" onClick={() => setMenu("home")}>Home</Link>
        </li>
        <li className={menu === "View books" ? "active" : ""}>
          <Link to="/AllBookCard" onClick={() => setMenu("View books")}>View Books</Link>
        </li>
        <li className={menu === "Add Books" ? "active" : ""}>
          <Link to="/AddBook" onClick={() => setMenu("Add Books")}>Add Books</Link>
        </li>
        <li className={menu === "Update Books" ? "active" : ""}>
          <Link to="/UpdateBook" onClick={() => setMenu("Update Books")}>Update Books</Link>
        </li>
        <li className={menu === "Delete Book" ? "active" : ""}>
          <Link to="/DeleteBook" onClick={() => setMenu("Delete Book")}>Delete Book</Link>
        </li>
        <li className={menu === "Get Book" ? "active" : ""}>
          <Link to="/GetBook" onClick={() => setMenu("Delete Book")}>Get Book</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <button className="full-width-button" onClick={() => setSignUpModalOpen(true)}>Sign Up</button>
        <button className="full-width-button" onClick={() => setSignInModalOpen(true)}>Sign In</button>
        <SignUp
          open={signUpModalOpen}
          handleClose={() => setSignUpModalOpen(false)}
          handleOpenSignIn={() => {
            setSignUpModalOpen(false);
            setSignInModalOpen(true);
          }}
        />
        <SignIn
          open={signInModalOpen}
          handleClose={() => setSignInModalOpen(false)}
          openSignUp={() => {
            setSignInModalOpen(false);
            setSignUpModalOpen(true);
          }}
        />
      </div>

      <div className="navbar-right1">
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
