import React from 'react';
import { addGameToCart, changeButtonStyle } from '../functions/helpers'

import '../styles/Navbar.css';
import '../styles/Global.css';

import control  from '../assets/controle.svg';
import shoppingCart  from '../assets/carrinho.svg';
import logo from '../assets/logo.svg';
import lupa from '../assets/lupa.svg';
import api from '../services/api';

function Navbar() {

  window.addEventListener('keypress', (event) => {
    if (event.code === 'Enter') searchGame()
  })

  function searchGame() {
    var searchValue = document.querySelector('.searchInput').value

    api.get('/searchGame/' + searchValue).then(response => {

      const games = response.data.results
      var gamesGrid = document.querySelector('.games-grid')

      if (games.length === 0) {
        gamesGrid.innerHTML = ''
        gamesGrid.classList.add('no-Grid')
        
        var message = document.createElement('div')
        message.setAttribute('class', 'NoGameFoundMessage')
        
        message.innerHTML= `
          <p>Nenhum jogo encontrado</p>
        `
        
        gamesGrid.appendChild(message)
      }
      else {
        gamesGrid.classList.remove('no-Grid')
        gamesGrid.innerHTML = ''

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
      }
    // }).then(() => {
    //   document.querySelectorAll("button").forEach(button => {
    //     button.addEventListener("click", addGameToCart)
    //   })
    })
  }

  return (
    <nav>
      <img src={logo} alt=""/>

      <div className="search-box">
        <input className="searchInput" type="search" placeholder="Enter a game"/>
        <button onClick={searchGame}><img src={lupa} alt=""/></button>
      </div>

      <ul>
        <li><a href="/"><img src={control} alt="controle"/>Catalogo</a></li>
        <li><a href="/shoppingcart"><img src={shoppingCart} alt="carrinho"/>Carrinho</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;