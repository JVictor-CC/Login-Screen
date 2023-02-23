import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Recovery from './pages/Recovery'
import RecoveryOTP from './pages/RecoveryOTP'
import Reset from './pages/Reset'
import NotFound from './pages/NotFound'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Profile from './pages/Profile'

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
        path: '/profile',
        element: <Profile />
    },
    {
        path: '*',
        element: <NotFound />
    }
])

function App () {
  return (
    <main>
        <RouterProvider router={router}/>
    </main>
  )
}

export default App
