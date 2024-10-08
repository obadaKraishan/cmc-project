import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 240 },
        backgroundColor: '#f4f4f4',
        height: '100vh',
        paddingTop: 2,
        position: { xs: 'fixed', sm: 'relative' },
        zIndex: 1200,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/content-editor">
          <ListItemText primary="Content Management" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/media-manager">
          <ListItemText primary="Media Management" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/user-roles">
          <ListItemText primary="User Roles" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/pages">
          <ListItemText primary="Pages" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/pages/new">
          <ListItemText primary="Add New Page" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
