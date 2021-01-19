import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

import '../styles/Global.css'
import '../styles/Login.css'
import api from '../services/api'

import logo from '../assets/logo.svg'

function LoginPage() {

  const [username, setUsername] = useState()
  const [password, setpassword] = useState()
  const [successfulLogin, setSuccessfulLogin] = useState(false)

  async function handleSubmit() {
    api.post('/admin-auth', {username: username, password: password}).then((response) => {
      const success = response.data.success
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('loggedUser', response.data.loggedUser)

      if (success) setSuccessfulLogin(true)
    })
  }

  return (
    successfulLogin? <Redirect to="Admin-portal"/> : (
      <div>

        <nav>
          <img src={logo} alt=""/>
          <h3>Admin-Portal</h3>
        </nav>

        <div className="login-form">
          <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
            <div className="username-field">
              <label htmlFor="username">Username:</label>
              <input type="text" onChange={e => {setUsername(e.target.value)}} name="username" id="username" placeholder="Username"/>
            </div>
            <div className="password-field">
              <label htmlFor="password">Password:</label>
              <input type="password" onChange={e => {setpassword(e.target.value)}} name="password" id="password" placeholder="Password"/>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  )
}

export default LoginPage;