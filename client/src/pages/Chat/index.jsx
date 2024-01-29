import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { GET_CHAT, } from '../../utils/queries';
import { ADD_TO_CHAT, } from '../../utils/mutations';
import { populateCurrentChat, setCurrentRecipients, setDraftMessage } from '../../utils/slices/chatSlice';

import MessageItem from '../../components/MessageItem';
import ScrollToTopMain from '../../components/ScrollToTopMain';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import LoopIcon from '@mui/icons-material/Loop';
import SendIcon from '@mui/icons-material/Send';

function Chat() {

    const dispatch = useDispatch();

    const { chatId } = useParams();

    const { loading, error, data, refetch } = useQuery(GET_CHAT, {
        fetchPolicy: 'no-cache',
        variables: {
            chatId
        }
    });

    const newRecipients = useSelector((state) => state.chatState.currentChat.newRecipients);
    const currentChatId = useSelector((state) => state.chatState.currentChat.id);
    const draftMessage = useSelector((state) => state.chatState.currentChat.draftMessage);
    const messages = useSelector((state) => state.chatState.currentChat.messages);

    const [addToChat] = useMutation(ADD_TO_CHAT);

    useEffect(() => {
        if (!loading) {
            if (!error) {
                if (data) {
                    console.log('chat effect:', data);
                    dispatch(populateCurrentChat({
                        id: data.getChat._id,
                        messages: data.getChat.messages,
                        recipients: data.getChat.recipients,
                        chatName: data.getChat.chatName,
                    }));
                }
            } else {
                // throw error on screen
                console.log('There was an error loading me!')
            }
        }

    }, [loading, error, data])

    const handleRefresh = async () => {
        try {
            // console.log('handling refresh');
            const data = await refetch();
            console.log('data from refresh hopefully', data);
            dispatch(populateCurrentChat({
                id: data.data.getChat._id,
                messages: data.data.getChat.messages,
                recipients: data.data.getChat.recipients,
                chatName: data.data.getChat.chatName,
            }));
        } catch (error) {
            console.log('chat refetch error', error);
        }
    }

    const handleNewRecipients = async () => {
        try {
            console.log('handling new recipients');
            // const chat = await addToChat({
            //     variables: { recipients: newRecipients, chatId: currentChatId },
            //   });
        } catch (error) {
            console.log('chat new recipient error', error);
        }
    }

    const handleContentChange = (event) => {
        dispatch(setDraftMessage({ draftMessage: event.target.value }))
    }

    const handleSendMessage = async () => {
        try {

        } catch (error) {
            console.log('send message error', error);
        }
    }

    return (
        // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
        <Container id="" maxWidth="md" sx={{
            height: '85vh',
            paddingBottom: 0
        }}>
            <Paper sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'flex-end',
            }}>
                <Stack
                    spacing={0.7}
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                    }}
                >
                    <h1 id="back-to-top-anchor">Chat{!loading && ` - ${data.getChat.chatName}`}</h1>

                    {messages.length > 0 &&
                        messages.map((message, index) => (
                            <MessageItem key={index} message={message} />
                        ))
                    }

                </Stack>

                {/* message bar here */}
                <Box
                    sx={{
                        display: 'flex',

                    }}
                >
                    <TextField
                        label="Message"
                        variant="filled"
                        color="secondary"
                        focused
                        multiline
                        rows={2}
                        sx={{
                            // paddingRight: 8,
                        }}
                    />
                    <IconButton color="secondary" onClick={handleRefresh}
                        sx={{
                            marginLeft: 1,
                            marginRight: 1,
                        }}>
                        <SendIcon />
                    </IconButton >
                </Box>
            </Paper>


            {/* <Fab color="secondary" aria-label="add" onClick={handleNewRecipients}
                sx={{
                    position: "fixed",
                    bottom: { xs: 150, md: 90, lg: 80 },
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <AddIcon />
            </Fab> */}
            <IconButton color="secondary" onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    // top: { xs: 120, md: 120, lg: 120 },
                    top: 100,
                    right: { xs: 40, md: 60, lg: 380 }
                }}>
                <LoopIcon />
            </IconButton >
        </Container>
    );
};

export default Chat;