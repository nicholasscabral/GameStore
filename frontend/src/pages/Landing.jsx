import React from 'react';

import Navbar from '../components/Navbar'
import jogo from '../assets/jogo.png'
import shoppingCart from '../assets/carrinho.svg'

import '../styles/Landing.css';
import '../styles/Global.css'

function Landing() {
  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="games-grid">
          <div className="card">
            <li>
              <img src={jogo} alt=""/>
              <div className="info">
                <p>Titulo: Star wars</p>
                <p>Preço: R$ 200 </p>
                <p>Ano: 2018 </p>
                <button> <img src={shoppingCart} alt="carrinho"/> + Carrinho</button>
              </div>
            </li>
          </div>
          <div className="card">
            <li>
              <img src="https://store-images.s-microsoft.com/image/apps.25992.13992297318455813.7f45ef4a-6ca3-4445-b6fc-9f00be7560b6.0367424f-9788-47e6-b8ea-e71067da1d53?mode=scale&q=90&h=225&w=150&background=%23FFFFFF" alt=""/>
              <div className="info">
                <p>Titulo: Call of Duty-Cold War</p>
                <p>Preço: R$ 280 </p>
                <p>Ano: 2020 </p>
                <button><img src={shoppingCart} alt="carrinho"/> Adicionar ao carrinho</button>
              </div>
            </li>
          </div>
          <div className="card">
            <li>
              <img src={jogo} alt=""/>
              <div className="info">
                <p>Titulo: Star wars</p>
                <p>Preço: R$ 200 </p>
                <p>Ano: 2018 </p>
                <button> <img src={shoppingCart} alt="carrinho"/> Adicionar ao carrinho</button>
              </div>
            </li>
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default Landing;