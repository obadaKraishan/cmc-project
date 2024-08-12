import React, { useState, useEffect } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      const { data } = await api.get('/api/pages');
      setPages(data);
    };
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/pages/${id}`);
      setPages(pages.filter(page => page._id !== id));
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Pages</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/pages/new')}>Add New Page</Button>
        <Box mt={3}>
          {pages.map((page) => (
            <Box key={page._id} mb={2} p={2} border="1px solid #ccc">
              <Typography variant="h6">{page.title}</Typography>
              <Button variant="contained" color="secondary" onClick={() => navigate(`/pages/edit/${page._id}`)}>Edit</Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(page._id)} style={{ marginLeft: '10px' }}>Delete</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Pages;
