import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';

import { GET_CHAT, } from '../../utils/queries';
import { ADD_TO_CHAT, SEND_MESSAGE, } from '../../utils/mutations';
import { populateCurrentChat, setCurrentRecipients, setDraftMessage, addMessage } from '../../utils/slices/chatSlice';

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

    const [sendMessage] = useMutation(SEND_MESSAGE);
    const [addToChat] = useMutation(ADD_TO_CHAT);

    const newRecipients = useSelector((state) => state.chatState.currentChat.newRecipients);
    const currentChatId = useSelector((state) => state.chatState.currentChat.id);
    const draftMessage = useSelector((state) => state.chatState.currentChat.draftMessage);
    const messages = useSelector((state) => state.chatState.currentChat.messages);


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
        // console.log(event.target.value);
        dispatch(setDraftMessage({ draftMessage: event.target.value }))
    }

    const handleSendMessage = async () => {
        try {
            console.log('sending message:', draftMessage);
            const newMessage = `${draftMessage}`;
            dispatch(setDraftMessage({ draftMessage: '' }));
            const data = await sendMessage({
                variables: { chatId, content: newMessage }
            });
            console.log(data);
            const message = data.data.sendMessage;
            // dispatch(addMessage({ message: { _id: , creatorId: , creator: , content: , createdAt:  }}))
            dispatch(addMessage({ message }));
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
                <h1
                    id="back-to-top-anchor"
                    style={{ paddingLeft: '0.8em', marginTop: '0.2em' }}
                >{!loading && data.getChat.chatName}</h1>
                <Stack
                    spacing={0.7}
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        overflow: 'auto',
                    }}
                >

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
                        onChange={handleContentChange}
                        value={draftMessage}
                        sx={{
                            // paddingRight: 8,
                        }}
                    />
                    <IconButton color="secondary" onClick={handleSendMessage}
                        sx={{
                            marginLeft: 1,
                            marginRight: 1,
                        }}>
                        <SendIcon />
                    </IconButton >
                </Box>
            </Paper>

            <IconButton color="secondary" onClick={handleRefresh}
                sx={{
                    position: "fixed",
                    // top: { xs: 120, md: 120, lg: 120 },
                    top: 100,
                    right: { xs: 15, md: 60, lg: 380 }
                }}>
                <LoopIcon sx={{ fontSize: 25 }}/>
            </IconButton >
            {/* <IconButton color="secondary" onClick={handleRefresh} */}
            <IconButton color="secondary" 
                sx={{
                    position: "fixed",
                    // top: { xs: 120, md: 120, lg: 120 },
                    top: 200,
                    right: { xs: 13, md: 55, lg: 370 }
                }}>
                <AddIcon sx={{ fontSize: 40 }}/>
            </IconButton >
        </Container>
    );
};

export default Chat;