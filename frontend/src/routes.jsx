import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import ShoppingCart from './pages/ShoppingCart'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/shoppingcart" exact component={ShoppingCart} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes