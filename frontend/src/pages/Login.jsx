import React from 'react';

import '../styles/Global.css'
import '../styles/Login.css'

import logo from '../assets/logo.svg'

function LoginPage() {
  return (
    <div id="container">

      <nav>
        <img src={logo} alt=""/>
        <h2>Admin-Portal</h2>
      </nav>

      <div className="login-form">
        <form action="">
          <div className="username-field">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Username"/>
          </div>
          <div className="password-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Password"/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;