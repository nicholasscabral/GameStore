import React from 'react';
import api from '../services/api'

import Navbar from '../components/Navbar'
import shoppingCart from '../assets/carrinho.svg'

import '../styles/Landing.css';
import '../styles/Global.css'

function Landing() {
  window.onload = getCatalog

  function addGameToCart(event) {
    var game = event.target.parentNode.parentNode.parentNode
    var gameId = game.id

    api.post('/addCart/' + gameId).then(response => {
      console.log(response)
    })

  }

  function getCatalog() {
    api.get('/catalog').then(response => {

      const games = response.data
      var gamesGrid = document.querySelector('.games-grid')

      games.forEach(game => {
        var card = document.createElement('div')
        card.setAttribute('class', 'card')
        card.setAttribute('id', game.id)

        var gameDetails = document.createElement('li')
        gameDetails.innerHTML = `
          <img src="${game.imgUrl}" />
          <div class="info">
            <p>${game.title}</p>
            <p>Preço: R$ ${game.price}</p>
            <p>Ano: ${game.year}</p>
            <button><img src="${shoppingCart}" alt="carrinho"/> Adicionar ao carrinho</button>
          </div>
        `

        card.appendChild(gameDetails)
        gamesGrid.appendChild(card)
      })
    }).then(() => {
      document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", addGameToCart)
      })
    })
  }

  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="games-grid">
 
        </div>
      </div>

    </div>
    
  )
}

export default Landing;