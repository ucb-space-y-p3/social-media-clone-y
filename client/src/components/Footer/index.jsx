import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import CottageIcon from '@mui/icons-material/Cottage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';

export default function Footer() {
  const location = useLocation().pathname.split('/')[1];
  const [value, setValue] = useState(location);

  const handleDirection = (() => {
    console.log('test direction - ', `/${value}`);
    window.location.assign(`/${value}`);
  })

  // useEffect(handleDirection, [value]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, }} elevation={0}>
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setTimeout(() => {
            window.location.assign(`/${newValue}`);
          }, 300);
        }}
      >
        <BottomNavigationAction label="Home" value="" icon={<CottageIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        {/* <BottomNavigationAction label="Notifications" value="notifications" icon={<LocationOnIcon />} /> */}
        <BottomNavigationAction label="Chats" value="chats" icon={<QuestionAnswerIcon />} />
      </BottomNavigation>
    </Paper>
  );
}