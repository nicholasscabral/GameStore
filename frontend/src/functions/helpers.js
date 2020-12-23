import api from '../services/api';
import check from '../assets/check.svg'

export function changeButtonStyle(id) {
  const game = document.getElementById(id)
  const button = game.querySelector('button')

  button.toggleAttribute("disabled", true)
  button.classList.add("hoverOff")

  button.innerHTML = `
    <img src="${check}"> Adicionado 
  `
}

export function addGameToCart(event) {
  var game = event.target.parentNode.parentNode.parentNode
  var gameId = game.id

  api.post('/addCart/' + gameId).then(response => {
    console.log(response)

    const success = response.data.success

    if (success) changeButtonStyle(gameId)
    else alert("jogo ja adicionado")
  })
}