import React from 'react';

import '../styles/Navbar.css';
import '../styles/Global.css';

import control  from '../assets/controle.svg';
import shoppingCart  from '../assets/carrinho.svg';
import logo from '../assets/logo.svg';
import lupa from '../assets/lupa.svg';

function Navbar() {
  return (
    <nav>
      <img src={logo} alt=""/>

      <div className="search-box">
        <input type="search" placeholder=" Enter a game name"/>
        <button><img src={lupa} alt=""/></button>
      </div>

      <ul>
        <li><a href="/"><img src={control} alt="controle"/>Catalogo</a></li>
        <li><a href="/"><img src={shoppingCart} alt="carrinho"/>Carrinho</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;