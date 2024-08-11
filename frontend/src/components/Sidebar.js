import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: '#f4f4f4',
        height: '100vh',
        paddingTop: 2,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/content">
          <ListItemText primary="Content Management" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/media">
          <ListItemText primary="Media Management" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/user-roles">
          <ListItemText primary="User Roles" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
