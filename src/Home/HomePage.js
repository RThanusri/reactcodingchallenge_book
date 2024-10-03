import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage= () => {
  return (
   
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 'none',
          maxWidth: 1200,
          marginLeft:'280px',
          width:"120%",
          alignContent:'center',

        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#cc0000' ,fontSize:'4rem',textAlign:'center'}} gutterBottom>
          Welcome to Our Library
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2,fontSize:'2.5rem' }}>
          Our library is a space dedicated to the pursuit of knowledge and the love of reading. 
          We offer a wide range of books, resources, and programs to support lifelong learning 
          and foster a sense of community. Whether you're looking for the latest bestseller, 
          researching a topic, or attending an event, our library has something for everyone.
        </Typography><br/>
        <Typography variant="body1"  sx={{ marginBottom: 2,fontSize:'2rem',textAlign:'center' }}>
          Join us today and discover the endless possibilities that reading can bring!
        </Typography>
      </Box>
    
  );
};

export default HomePage;
