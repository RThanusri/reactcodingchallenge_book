import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Alert,
} from "@mui/material";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 

  const addBook = async (e) => {
    e.preventDefault();

    // Log the input values to check for correctness
    console.log("Input Values: ", { title, author, isbn, publicationYear });

    // Validate user input
    if (!title || !author || !isbn || !publicationYear) {
      setAlertType('error');
      setAlertMsg('All fields are required.');
      setShowAlert(true);
      return; // Prevent the API call
    }

    const book = {
      title,
      author,
      isbn,
      publicationYear: Number(publicationYear), 
    };

    console.log("Adding Book with values:", book); 

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("http://localhost:8080/api/admin/addBook", book, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data); // Log response data for debugging
      setAlertType('success');
      setAlertMsg('Book added successfully!');
    } catch (error) {
      console.error("There was an error in adding the Book!", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        setAlertMsg(`Failed to add the Book: ${error.response.data}`);
      } else {
        setAlertMsg('Failed to add the Book');
      }
      setAlertType('error');
    } finally {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#F5F5F5',
        width: '100vw',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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

      <Card
        sx={{
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 1,
          border: '2px solid grey', 
          width: '100%', 
          maxWidth: 900,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cc0000' }} align="center" gutterBottom>
          Add New Book
        </Typography>
        <form onSubmit={addBook}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Book Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <TextField
              label="ISBN Number"
              variant="outlined"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <TextField
              label="Publication Year"
              variant="outlined"
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              required
              type="number"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#cc0000',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b30000',
                },
              }}
              type="submit"
            >
              Add Book
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddBook;
