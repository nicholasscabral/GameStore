import React from 'react'
import { Redirect } from 'react-router-dom'

function ProtectedRoute(props) {
  const Component = props.component
  const isAuthenticated = true

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to="/admin-login" />
  ) 
}

export default ProtectedRoute;