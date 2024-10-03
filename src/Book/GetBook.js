import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert, Card, CardContent } from '@mui/material';

const GetBook = () => {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/shared/getBookByIsbn/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBook(response.data);
      setAlertType('success');
      setAlertMsg('Book fetched successfully!');
    } catch (error) {
      console.error("Error fetching book:", error.response ? error.response.data : error.message);
      setAlertType('error');
      setAlertMsg(error.response ? error.response.data : 'Failed to fetch the book.');
      setBook(null); 
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
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 1,
          border: '2px solid grey',
          width: '100%',
          marginTop:'200px',
          marginLeft:'630px',
          maxWidth: 500,
          alignContent:'center',
          textAlign: 'center',
        }}
      >
        {showAlert && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, width: '320px' }}>
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#cc0000' }} gutterBottom>
          Get Book by ISBN
        </Typography>
        <TextField
          label="ISBN Number"
          variant="outlined"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
          fullWidth
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#cc0000',
            color: 'white',
            fontWeight: 'bold',
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#b30000',
            },
          }}
          onClick={fetchBook}
        >
          Fetch Book
        </Button>


      {book && (
        <Card sx={{ marginTop: 3, width: '100%', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Book Details
            </Typography>
            <Typography variant="body1"><strong>Title:</strong> {book.title}</Typography>
            <Typography variant="body1"><strong>Author:</strong> {book.author}</Typography>
            <Typography variant="body1"><strong>ISBN:</strong> {book.isbn}</Typography>
            <Typography variant="body1"><strong>Publication Year:</strong> {book.publicationYear}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default GetBook;
