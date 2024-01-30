import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux';
import { toggleThemeMode, } from '../../utils/slices/userSlice';

import { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import Y from '../../assets/fancy_Y.svg';
// import Y from '../../assets/super_fancy_Y.svg';

// import Auth from '../../utils/auth';

export default function SimpleHeader() {

  const themeMode = useSelector((state) => state.userState.settings.isDarkMode);
  const dispatch = useDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ height: 80, }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleThemeMode())}
            sx={{
              position: "absolute",
              top: 15,
              right: 40
            }}
          >
            {themeMode === 'dark' ?
              <LightModeIcon />
              :
              <ModeNightIcon />
            }
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