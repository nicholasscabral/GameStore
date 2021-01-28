import React, { useState } from 'react'
import api from '../services/api';

import '../styles/Modal.css'

export function showModal() {
  const modal = document.getElementById('modal')
  if (modal) {
    modal.classList.add('show')
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal' || e.target.className === 'close') {
        modal.classList.remove('show')
      }
    })
  }
}

function Modal() {

  const [gameValues, setGameValues] = useState({
    title: '',
    price: '',
    year: '',
    imgUrl: ''
  })

  function addGame() {
    console.log(gameValues)

    api.post('/addGame', gameValues).then(response => {
      console.log(response)
      if (response.data.success) {
        alert('Game added successfully')
        setGameValues({
          title: '',
          price: '',
          year: '',
          imgUrl: ''
        })
      }
    })

  }

  return (
    <div id="modal" class="modal-container">
      <div className="modal">
        <button class="close">x</button>
        <form onSubmit={(e) => { e.preventDefault(); addGame() }}>
          <div className="title-field">
            <label htmlFor="title">Titutlo:</label>
            <input type="text" name="title" onChange={e => {setGameValues({...gameValues, title: e.target.value})}} value={gameValues.title} class="title" placeholder="Titulo"/>
          </div>
          <div className="price-field"> 
            <label htmlFor="price">Preço:</label>
            <input type="text" name="price" onChange={e => {setGameValues({...gameValues, price: e.target.value})}} value={gameValues.price} class="price" placeholder="Preço"/>
          </div>
          <div className="year-field"> 
            <label htmlFor="year">Ano:</label>
            <input type="text" name="year" onChange={e => {setGameValues({...gameValues, year: e.target.value})}} value={gameValues.year} class="year" placeholder="Ano"/>
          </div>
          <div className="imgUrl-field"> 
            <label htmlFor="imgUrl">URL da imagem:</label>
            <textarea type="text" name="imgUrl" onChange={e => {setGameValues({...gameValues, imgUrl: e.target.value})}} value={gameValues.imgUrl} class="imgUrl" placeholder="URL da imagem"/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default Modal