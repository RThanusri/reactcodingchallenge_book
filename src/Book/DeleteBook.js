import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const DeleteBook = () => {
  const [isbn, setIsbn] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const deleteBook = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/admin/deleteBookByIsbn/${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlertType('success');
      setAlertMsg('Book deleted successfully!');
    } catch (error) {
      console.error("Error deleting book:", error.response ? error.response.data : error.message);
      setAlertType('error');
      setAlertMsg(error.response ? error.response.data : 'Failed to delete the book.');
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
          Delete Book By ISBN
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
          onClick={deleteBook}
        >
          Delete Book
        </Button>
      </Box>
    
  );
};

export default DeleteBook;
