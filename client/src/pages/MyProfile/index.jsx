import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';


import { GET_ME, GET_USER, } from '../../utils/queries';
import { REQUEST_FRIEND, } from '../../utils/mutations';

import { setProfile, setUser } from '../../utils/slices/userSlice';

import PostItem from '../../components/PostItem';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import IconButton from '@mui/material/IconButton';

function MyProfile() {

  const dispatch = useDispatch();

  const { loading, error, data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'no-cache',
  });

  const [value, setValue] = useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const myUsername = useSelector((state) => state.userState.username);

  const userId = useSelector((state) => state.userState.userId);
  const firstInitial = useSelector((state) => state.userState.firstInitial);
  const lastInitial = useSelector((state) => state.userState.lastInitial);
  const friends = useSelector((state) => state.userState.friends);
  const friendRequests = useSelector((state) => state.userState.friendRequests);
  const posts = useSelector((state) => state.userState.posts);
  const comments = useSelector((state) => state.userState.comments);


  useEffect(() => {
    if (!loading) {
      if (!error) {
        if (data) {
          console.log('profile effect:', data);
          const { _id: userId, username, email, firstInitial, lastInitial, friends, incomingFriendRequests: friendRequests, posts, comments } = data.me;
          dispatch(setUser({ userId, username, email, firstInitial, lastInitial, friends, friendRequests, posts, comments }));
        }
      } else {
        // throw error on screen
        console.log('There was an error loading me!')
      }
    }

  }, [loading, error, data]);

  const handleRefresh = async () => {
    try {
      // console.log('handling refresh');
      const data = await refetch();
      // console.log('data from refresh hopefully', data);
      const { _id: userId, username, email, firstInitial, lastInitial, friends, incomingFriendRequests: friendRequests, posts, comments } = data.data.me;
      dispatch(setUser({ userId, username, email, firstInitial, lastInitial, friends, friendRequests, posts, comments }));
    } catch (error) {
      console.log('me refetch error', error);
    }
  }

  const handleStack = () => {
    if (value === 'comment') {

      return (
        <Stack
          spacing={0.7}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'auto',
            paddingTop: 2,
          }}
        >

          {/* {posts.length > 0 &&
            posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))
          } */}

        </Stack>
      )
    } else if (value === 'request') {
      return (
        <Stack
          spacing={0.7}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'auto',
            paddingTop: 2,
          }}
        >

          {/* {posts.length > 0 &&
            posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))
          } */}

        </Stack>
      )
    } else if (value === 'friend') {
      return (
        <Stack
          spacing={0.7}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column-reverse',
            overflow: 'auto',
            paddingTop: 2,
          }}
        >

          {/* {posts.length > 0 &&
            posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))
          } */}

        </Stack>
      )
    } else {
      // return posts
      return (
        <Stack
          spacing={0.7}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            paddingTop: 2,
          }}
        >

          {posts.length > 0 &&
            posts.map((post, index) => (
              <PostItem key={index} post={post} />
            ))
          }

        </Stack>
      )
    }
  }

  return (
    // <Container maxWidth="sm" sx={{ py: 4, pt: 7 }}>
    <Container id="" maxWidth="md" sx={{
      height: '90vh',
      paddingBottom: 0
    }}>
      <Paper sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}>
        <h1
          id="back-to-top-anchor"
          style={{ marginTop: '0.6em', textAlign: 'center', }}
        >{myUsername}</h1>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 1,
        }}>
          <Avatar>{`${firstInitial}${lastInitial}`}</Avatar>
          {/* <IconButton color="secondary"
            sx={{
              marginTop: 2,
            }}>
            <AddIcon sx={{ fontSize: 30 }} />
          </IconButton > */}
          <Typography sx={{
            marginTop: 2,
          }}>This is me!</Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100'
        }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="post" label={`${posts.length} Posts`} />
            <Tab value="comment" label={`${comments.length} Comments`} />
            <Tab value="request" label={`${friendRequests.length} Requests`} />
            <Tab value="friend" label={`${friends.length} Friends`} />
          </Tabs>
        </Box>
        {handleStack()}
      </Paper>
      <IconButton color="secondary" onClick={handleRefresh}
        sx={{
          position: "fixed",
          // top: { xs: 120, md: 120, lg: 120 },
          top: 120,
          right: { xs: 40, md: 60, lg: 380 }
        }}>
        <LoopIcon sx={{ fontSize: 30 }} />
      </IconButton >
    </Container>
  );
};

export default MyProfile;