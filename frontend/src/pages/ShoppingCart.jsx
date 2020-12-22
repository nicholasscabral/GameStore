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
      var bill = document.querySelector('.prices')
      var payment = document.querySelector('.payment')
      var totalPrice = 0

      games.forEach(game => {

          totalPrice += Number(game.price)

          var pricetag = document.createElement('p')
          pricetag.setAttribute('class', 'price')
          pricetag.innerHTML = `R$ ${game.price}`

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
          bill.appendChild(pricetag)
          card.appendChild(gameDetails)
          selectedGames.appendChild(card)
    
      })

      payment.innerHTML = `
        <p>Total: R$ ${totalPrice} </p>
        <button>Finalizar compra</button>
      `
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
            <div className="prices">

            </div>
            <div className="payment">

            </div>
          </div>
        </div>
      </div>
      {/* <footer>Made with coffee by <a href=""> Nicholas cabral </a></footer> */}

    </div>
  )
}

export default ShoppingCart