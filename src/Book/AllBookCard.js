import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import axios from "axios";

const AllBookCard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/shared/getBooks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, 
            'Content-Type': 'application/json',
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error("Error getting books:", error);
        setError("Error getting books. Please try again later.");
      }
    };

    getBooks();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: '#f7f7f7' }}>
      <Grid container spacing={2} sx={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        {error && (
          <Grid item xs={12}>
            <Typography variant="h6" color="error" textAlign="center">
              {error}
            </Typography>
          </Grid>
        )}
        {books.length > 0 ? (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.bookId}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  },
                  height: '100%',
                  borderRadius: '16px',
                  border: '2px solid black',
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#d32f2f', textAlign: 'center' }}>
                   Book Id: {book.bookId}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', color: "black", mt: 1, textAlign: 'center' }}>
                   Title:  {book.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', color: "black", mt: 1, textAlign: 'center' }}>
                    Author :{book.author}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', color: "black", mt: 1, textAlign: 'center' }}>
                   ISBN Number{book.isbn}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1rem', color: "black", mt: 1, textAlign: 'center' }}>
                    Publication Year :{book.publicationYear}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No Books found. Please Add a Book.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AllBookCard;
