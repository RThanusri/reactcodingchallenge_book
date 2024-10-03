import React, { useState } from "react";
import { FormField, Button, Form } from "semantic-ui-react";
import { Modal, Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ open, handleClose, openSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const nav = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const login = { email, password };

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", login);
      
     
      console.log("Login Response:", response.data);

      const { jwt, userId, role } = response.data; // Destructure the response

     
      localStorage.setItem("token", jwt);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("loginTime", Date.now());

      setSuccessMessage("Login Successful");
      handleClose();
     nav('/')
      
      

    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Login failed! Please check your credentials.");
    }
  };

  const handleSnackbarClose = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <span
            onClick={handleClose}
            className="close-btn"
            style={{ cursor: "pointer", color: "#cc0000" }}
          >
            X
          </span>
          <center>
            <h1 style={{ color: "#cc0000" }} className="title">Login</h1>
          </center>
          <Form onSubmit={handleSignIn}>
            <FormField>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <FormField>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormField>
            <Button type="submit" className="submit">Login</Button><br/>
            <div className="login" style={{ fontSize: "1.3rem", textAlign: 'center' }}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  handleClose();
                  openSignUp();
                }}
                className="login-navigation"
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#cc0000",
                  textDecoration: "underline",
                }}
              >
                Register Here
              </span>
            </div>
          </Form>
        </Box>
      </Modal>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
