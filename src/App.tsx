import React from 'react'
import { AuthContextProvider } from './context/userAuth'
import MyRoutes from './routes'

function App () {
  return (
    <AuthContextProvider>
      <MyRoutes/>
    </AuthContextProvider>
  )
}

export default App
