import React, { useEffect, useState } from 'react';
import api from '../services/api';

import { removeGameFromCart } from '../functions/helpers'

import Navbar from '../components/Navbar'

import '../styles/Shoppingcart.css'
import '../styles/Global.css'

function ShoppingCart() {
  const [games, setGames] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  
  function getShoppingCart() {
    api.get('/shoppingCart').then(response =>{
      const games = response.data
      setGames(games)

      if (games.length > 0) {
        games.forEach(game => {
          setTotalPrice(prevValue => prevValue + Number(game.price))
        })
      }
    })
  }

  useEffect(() => {
    getShoppingCart()
  }, [])
  
  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="selected-games">
          <h1>Seu carrinho de compras </h1>
          {games.length === 0 ? (<p className="emptyCartMessage">Carrinho vazio</p>) : games.map(game => (
            <div className="card" id={game.id}>
              <li>
                <img src={game.imgUrl} />
                <p> {game.title}</p>
                <p>R$ {game.price}</p>
                <button onClick={() => {removeGameFromCart(game.id)}}> Remover </button>
              </li>
            </div>
          ))}

        </div>
        <div className="shopping-cart">
          <h1>Subtotal</h1>
          <div className="subtotal">
            <div className="prices">
              {games.length === 0 ? (<p>Carrinho vazio</p>) : games.map(game => (
                <p>{game.title} : R$ {game.price}</p>
              ))}
            </div>

            <div className="payment">
              <hr/>
              <p id="total">Total: R$ {totalPrice} </p>
              <button>Finalizar compra</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default ShoppingCart