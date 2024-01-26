import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ErrorNoResource from './pages/ErrorNoResource';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Chats from './pages/Chats';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        error: <ErrorNoResource />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/chats',
                element: <Chats />
            },
            {
                path: '/favorites',
                element: <Favorites />
            },
            {
                path: '/search',
                element: <Search />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/user/:username',
                element: <UserProfile />
            },
            {
                path: '/me',
                element: <UserProfile isMe /> // change maybe?
            },
            {
                path: '/me/settings',
                element: <Settings />
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
