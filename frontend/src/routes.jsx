import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import ShoppingCart from './pages/ShoppingCart'
import Login from './pages/Login'
import Admin from './pages/Admin'

import ProtectedRoute from './components/ProtectedRoute'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/shoppingcart" exact component={ShoppingCart} />

        <Route path="/admin-login" component={Login} />
        <ProtectedRoute path="/admin-portal" component={Admin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes