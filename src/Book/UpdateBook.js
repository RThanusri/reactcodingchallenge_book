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

const UpdateBook = () => {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  
  const [alertMsg, setAlertMsg] = useState(''); 
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false); 

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shared/getBookByIsbn/${isbn}`);
      console.log("Fetched book data:", response.data); // Log fetched data
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublicationYear(response.data.publicationYear || ''); // Ensure a string is set
    } catch (error) {
      console.error("Error fetching book:", error);
      setAlertMsg("Book not found.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();

    if (!title || !author || !publicationYear) {
      setAlertMsg("All fields are required.");
      setAlertType("error");
      setShowAlert(true);
      return;
    }

    const book = {
      title,
      author,
      publicationYear: Number(publicationYear), // Convert to number
    };

    console.log("Book to update:", book); // Log the book object to be updated

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8080/api/admin/updateBook/${isbn}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Update response:", response.data); // Log the response from the update
      setAlertType('success');
      setAlertMsg('Book updated successfully!');
    } catch (error) {
      console.error("Error updating book:", error);
      if (error.response) {
        setAlertMsg(`Failed to update the Book: ${error.response.data}`);
      } else {
        setAlertMsg('Failed to update the Book');
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
          Update Book
        </Typography>
        <form onSubmit={updateBook}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="ISBN Number"
              variant="outlined"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
            <Button
              variant="outlined"
              onClick={fetchBook}
              sx={{
                color: '#cc0000',
                borderColor: '#cc0000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#b30000',
                  color: 'white',
                },
              }}
            >
              Fetch Book
            </Button>
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
              Update Book
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default UpdateBook;
