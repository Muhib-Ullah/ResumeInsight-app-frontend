//react imports
import React from 'react'
import { Navigate } from 'react-router-dom'

//custom imports
import { isAuthenticated } from '../../utils/token'

const PublicRoute = ({children}) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  return children;
}

export default PublicRoute
