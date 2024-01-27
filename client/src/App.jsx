import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Outlet, useLocation } from 'react-router-dom';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './utils/slices/userSlice';

import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { red } from '@mui/material/colors';
import './App.css';


import Auth from './utils/auth';
import Login from './pages/Login';
import SimpleHeader from './components/SimpleHeader';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';


const rootReducer = combineReducers({
  userState: userReducer,
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

  const location = useLocation().pathname.split('/')[1];

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const prefersDarkMode = null;
  // console.log(prefersDarkMode, 'test');

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: red[500],
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

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline enableColorScheme /> */}

          {/* {Auth.loggedIn() && <Header />} */}

          {Auth.loggedIn() ?
            (<Sidebar>
              {/* <Outlet /> */}
              <Outlet style={{ marginTop: 10 }} />
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
              </>))}

          {/* {Auth.loggedIn() ? <Outlet />
            : (location == 'signup' ? <SignUp /> : <Login />)} */}

          {Auth.loggedIn() && <Footer />}

        </ThemeProvider>
      </Provider>
    </ApolloProvider >
  );
}

export default App;
