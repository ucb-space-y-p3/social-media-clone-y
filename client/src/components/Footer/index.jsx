import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Paper from '@mui/material/Paper';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

export default function Footer() {
  const [value, setValue] = useState(0);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, }} elevation={0}>
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" value="home" icon={<RestoreIcon />} />
        {/* <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} /> */}
        <BottomNavigationAction label="Search" value="search" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Notifications" value="notifications" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Messages" value="messages" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Paper>
  );
}