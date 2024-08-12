import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../../services/api';

const ContentEditor = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchContent = async () => {
        try {
          const { data } = await api.get(`/api/content/${id}`);
          setTitle(data.title);
          setBody(data.body);
        } catch (error) {
          console.error('Failed to fetch content:', error);
        }
      };
      fetchContent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/content/${id}`, { title, body });
      } else {
        await api.post('/api/content', { title, body });
      }
      navigate('/content-editor');
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          {isEditMode ? 'Edit Content' : 'Create Content'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Body"
            margin="normal"
            multiline
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Box mt={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              {isEditMode ? 'Update Content' : 'Create Content'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ContentEditor;
