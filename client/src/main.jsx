import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        error: <ErrorNoResource />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/signup',
                element: <Signup />
            }, {
                path: '/chats',
                element: <Chats />
            }, {
                path: '/notifications',
                element: <Notifications />
            }, {
                path: '/user/:username',
                element: <UserProfile />
            }, {
                path: '/me',
                element: <UserProfile isMe/> // change maybe?
            }, {
                path: '/me/settings',
                element: <Settings /> // change maybe?
            }, 
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
