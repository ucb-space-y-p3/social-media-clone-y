import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';


import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Y from '../../assets/fancy_Y.svg';
// import Y from '../../assets/super_fancy_Y.svg';

// import Auth from '../../utils/auth';

export default function SimpleHeader() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ height: 80, }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={}
            sx={{
              position: "absolute",
              top: 15,
              right: 40
            }}
          >
            <MenuIcon />
          </IconButton>

          <img src={Y} alt="y logo" width="80" style={{
            position: 'absolute',
            top: -35,
          }} />

        </Toolbar>
      </AppBar>

    </Box>
  );
}