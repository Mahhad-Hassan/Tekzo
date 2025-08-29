
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import DataContext from '../context/DataContext'

const ProtectedRoute = ({children}) => {
    const {user} = useContext(DataContext)
    
  return (
    <div>
      {user ? children: <Navigate to='/'/>}
    </div>
  )
}

export default ProtectedRoute;