import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { Container, Box, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box display="flex" minHeight="100vh" flexDirection="column">
      {/* Header */}
      <Header />

      {/* Main content with sidebar and content area */}
      <Box display="flex" flexGrow={1}>
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to your dashboard! Here you can manage your content, media, and user roles.
          </Typography>
          {/* Add more dashboard content here */}
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Dashboard;
