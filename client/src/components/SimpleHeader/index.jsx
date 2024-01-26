import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';


import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

// import Auth from '../../utils/auth';

export default function SimpleHeader() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ flexDirection: 'row-reverse' }}>
          <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

    </Box>
  );
}