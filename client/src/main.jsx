import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ErrorNoResource from './pages/ErrorNoResource';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Post from './pages/Post';
import Chats from './pages/Chats';
import Chat from './pages/Chat';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Notifications from './pages/Notifications';
import UserProfile from './pages/UserProfile';
import MyProfile from './pages/MyProfile';
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
            },{
                path: '/posts/:postId',
                element: <Post />
            },
            {
                path: '/chats',
                element: <Chats />
            },
            {
                path: '/chats/:chatId',
                element: <Chat />
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
                element: <MyProfile />
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
