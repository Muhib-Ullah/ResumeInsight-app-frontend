//react imports
import React from 'react'
import { Navigate } from 'react-router-dom'

//custom imports
import { isAuthenticated } from '../../utils/token'

const PrivateRoute = ({children}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children;
}

export default PrivateRoute