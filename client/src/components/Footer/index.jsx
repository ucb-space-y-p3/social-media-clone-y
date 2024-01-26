import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import CottageIcon from '@mui/icons-material/Cottage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

export default function Footer() {
  const location = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const [value, setValue] = useState(location);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, }} elevation={0}>
      <BottomNavigation
        // showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(`/${newValue}`);
          setValue(newValue);
          navigate(`/${newValue}`);
        }}
      >
        <BottomNavigationAction label="Home" value="" icon={<CottageIcon />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Chats" value="chats" icon={<QuestionAnswerIcon />} />
      </BottomNavigation>
    </Paper>
  );
}