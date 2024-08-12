// cms/frontend/src/components/Header.js

import React, { useContext } from 'react';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My CMS
        </Typography>
        {user && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
