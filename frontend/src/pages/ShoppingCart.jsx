import React from 'react';

import Navbar from '../components/Navbar'

import '../styles/Shoppingcart.css'
import '../styles/Global.css'

function ShoppingCart() {
  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="selected-games">
          <h1>Seu carrinho de compras </h1>
          <div className="card">
              <li>
                <img src="https://store-images.s-microsoft.com/image/apps.25992.13992297318455813.7f45ef4a-6ca3-4445-b6fc-9f00be7560b6.0367424f-9788-47e6-b8ea-e71067da1d53?mode=scale&q=90&h=225&w=150&background=%23FFFFFF" alt=""/>
                <p> Call of Duty-Cold War</p>
                <p> R$ 280 </p>
                <button> Remover </button>
              </li>
          </div>
          <div className="card">
              <li>
                <img src="https://store-images.s-microsoft.com/image/apps.25992.13992297318455813.7f45ef4a-6ca3-4445-b6fc-9f00be7560b6.0367424f-9788-47e6-b8ea-e71067da1d53?mode=scale&q=90&h=225&w=150&background=%23FFFFFF" alt=""/>
                <p> Call of Duty-Cold War</p>
                <p> R$ 280 </p>
                <button> Remover </button>
              </li>
          </div>
          <div className="card">
              <li>
                <img src="https://store-images.s-microsoft.com/image/apps.25992.13992297318455813.7f45ef4a-6ca3-4445-b6fc-9f00be7560b6.0367424f-9788-47e6-b8ea-e71067da1d53?mode=scale&q=90&h=225&w=150&background=%23FFFFFF" alt=""/>
                <p> Call of Duty-Cold War</p>
                <p> R$ 280 </p>
                <button> Remover </button>
              </li>
          </div>
        </div>
        <div className="shopping-cart">
          <h1>Subtotal</h1>
          <div className="subtotal">
            <p>R$100</p>
            <p>R$100</p>
            <p>R$100</p>
            <p>R$100</p>
            <p>Total: R$ 400</p>
            <button>Finalizar compra</button>
          </div>
        </div>
      </div>
      {/* <footer>Made with coffee by <a href=""> Nicholas cabral </a></footer> */}

    </div>
  )
}

export default ShoppingCart