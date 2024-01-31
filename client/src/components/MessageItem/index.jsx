import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';


import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function MessageItem({ message }) {

    const userId = useSelector((state) => state.userState.userId);
    
    const alignment = message.creatorId === userId ? 'end' : 'start';

    return (
        <ListItem  sx={{
            justifyContent: alignment,
            textAlign: alignment,
        }}>
            <Box>
                <Typography noWrap>{message.creator}</Typography>
                <Typography noWrap>{message.content}</Typography>
                <Typography noWrap>{message.createdAt}</Typography>
            </Box>
        </ListItem>
    );
};

export default MessageItem;