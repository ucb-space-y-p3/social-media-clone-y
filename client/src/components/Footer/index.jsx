import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import CottageIcon from '@mui/icons-material/Cottage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const [value, setValue] = useState(location);

  return (
    // <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, }} elevation={0}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: { xs:0, md: 320, lg: 400}, right: 0, display: { lg: 'none' }, }} elevation={0}>

      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(`/${newValue}`);
        }}
        sx={{
          display: { md: 'none' }
        }}
      >
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Home" value="" icon={<CottageIcon />} />
        <BottomNavigationAction label="Notifications" value="notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="Chats" value="chats" icon={<QuestionAnswerIcon />} />
      </BottomNavigation>

      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(`/${newValue}`);
        }}
        sx={{
          display: { xs: 'none', md: 'flex', large: 'none' }
        }}
      >
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Home" value="" icon={<CottageIcon />} />
        <BottomNavigationAction label="Notifications" value="notifications" icon={<NotificationsIcon />} />
      </BottomNavigation>


    </Paper>
  );
}