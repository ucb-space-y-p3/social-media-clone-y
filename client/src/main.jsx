import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ErrorNoResource from './pages/ErrorNoResource';
import Home from './pages/Home';
import Login from './pages/Login';
import Chats from './pages/Chats';
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
                element: <Login isSignUp />
            },
            {
                path: '/chats',
                element: <Chats />
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
