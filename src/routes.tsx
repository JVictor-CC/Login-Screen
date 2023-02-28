import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Recovery from './pages/Recovery'
import RecoveryOTP from './pages/RecoveryOTP'
import Reset from './pages/Reset'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'


import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ProfileInfo from './pages/ProfileInfo'

  
const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/recovery',
        element: <Recovery />
    },
    {
        path: '/recoveryOTP',
        element: <RecoveryOTP />
    },
    {
        path: '/reset',
        element: <Reset />
    },
    {
        path: '/update',
        element: <Profile />
    },
    {
        path: '/profile',
        element: <ProfileInfo />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

const MyRoutes: React.FC = () => {
    return (
        <RouterProvider router={router}/>
    )
}

export default MyRoutes