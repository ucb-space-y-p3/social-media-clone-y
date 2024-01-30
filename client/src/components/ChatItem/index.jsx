import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function ChatItem({ chatId, chatName, recipients }) {

  const chatDisplayName = chatName || 'New Chat';

  return (
    <ListItem id={chatId} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltIcon sx={{
            marginTop: 1,
            marginBottom: 1,
            marginLeft: 1
          }} />
        </ListItemIcon>
        <Typography noWrap>{chatDisplayName}</Typography>
      </ListItemButton>
    </ListItem>
  )
}