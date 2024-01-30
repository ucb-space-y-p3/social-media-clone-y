import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  useLazyQuery,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Outlet, useLocation } from 'react-router-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './utils/slices/userSlice';
import notificationReducer from './utils/slices/notificationSlice';
import feedReducer from './utils/slices/feedSlice';
import favoriteReducer from './utils/slices/favoriteSlice';
import chatReducer from './utils/slices/chatSlice';
import { GET_ME, GET_PUBLIC_POSTS, GET_LIKED_COMMENTS, GET_LIKED_POSTS, GET_CHAT, GET_CHATS, GET_NOTIFICATIONS } from './utils/queries';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, } from './utils/slices/userSlice';

import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { red, purple } from '@mui/material/colors';
import Box from '@mui/material/Box';
import './App.css';


import Auth from './utils/auth';
import Login from './pages/Login';
import SimpleHeader from './components/SimpleHeader';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import NewChatDialog from './components/NewChatDialog';
import NewPostDialog from './components/NewPostDialog';
import NewChatUserDialog from './components/NewChatUserDialog';
import NewCommentDialog from './components/NewCommentDialog';


const rootReducer = combineReducers({
  userState: userReducer,
  notificationState: notificationReducer,
  feedState: feedReducer,
  favoriteState: favoriteReducer,
  chatState: chatReducer,
})

const store = configureStore({
  reducer: rootReducer,
});

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});





function App() {

  const dispatch = useDispatch();
  
  const { loading: getMeLoading, error: getMeError, data: getMeData, refetch: getMeRefetch } = useQuery(GET_ME);
  
  const isDarkMode = useSelector((state) => state.userState.settings.isDarkMode);

  const location = useLocation().pathname.split('/')[1];

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: purple['300'],
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: 75,
            paddingBottom: 150,
          },
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: '100%'
          },
        }
      },
    }
  });

  useEffect(() => {
    if (!getMeLoading) {
      if (!getMeError) {
        if (getMeData) {
          console.log("me:",getMeData);
          const { _id: userId , username, email, firstInitial, lastInitial, friends, incomingFriendRequests: friendRequests, posts, comments } = getMeData.me;
          dispatch(setUser({ userId, username, email, firstInitial, lastInitial, friends, friendRequests, posts, comments }));
        }
      } else {
        // throw error on screen
        console.log('There was an error loading me!')
      }
    }

  }, [getMeLoading, getMeData]);

  return (
    <ThemeProvider theme={theme}>
      {
        Auth.loggedIn() ?
          (<Sidebar>
            {/* <Outlet /> */}
            <Outlet style={{ marginTop: 10 }} />
            <NewChatDialog />
            <NewPostDialog />
            <NewChatUserDialog />
            <NewCommentDialog />
          </Sidebar>)
          :
          (location == 'signup' ?
            (<>
              <SimpleHeader />
              <SignUp />
            </>)
            :
            (<>
              <SimpleHeader />
              <Login />
            </>))
      }

      {Auth.loggedIn() && <Footer />}
    </ThemeProvider>
  );
}




export default function wrappedApp() {



  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <CssBaseline enableColorScheme /> */}
        <App />

      </Provider>
    </ApolloProvider >
  )
};

