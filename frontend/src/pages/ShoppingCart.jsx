import React from 'react';
import api from '../services/api';

import Navbar from '../components/Navbar'

import '../styles/Shoppingcart.css'
import '../styles/Global.css'

function ShoppingCart() {
  window.onload = getShoppingCart

  function getShoppingCart() {
    api.get('/shoppingCart').then(response =>{
      console.log(response)

      var games = response.data
      var selectedGames = document.querySelector('.selected-games')

      games.forEach(game => {
        api.get('/getGame/' + game.gameId).then(response => {

          var game = response.data[0]
          console.log(game)
          var card = document.createElement('div')
          card.setAttribute('class', 'card')
          card.setAttribute('id', game.id)

          var gameDetails = document.createElement('li')
          gameDetails.innerHTML = `
            <img src="${game.imgUrl}" />
            <p> ${game.title}</p>
            <p>R$ ${game.price}</p>
            <button> Remover </button>
          `

          card.appendChild(gameDetails)
          selectedGames.appendChild(card)
        })
      })
    })
  }

  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="selected-games">
          <h1>Seu carrinho de compras </h1>

        </div>
        <div className="shopping-cart">
          <h1>Subtotal</h1>
          <div className="subtotal">
            <p className="price">R$280</p>
            <p className="price">R$280</p>
            <p className="price">R$280</p>
            <p className="total">Total: R$ 840</p>
            <button>Finalizar compra</button>
          </div>
        </div>
      </div>
      {/* <footer>Made with coffee by <a href=""> Nicholas cabral </a></footer> */}

    </div>
  )
}

export default ShoppingCart