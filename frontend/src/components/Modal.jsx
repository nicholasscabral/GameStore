import React from 'react'
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
  return (
    <div id="modal" class="modal-container">
      <div className="modal">
        <button class="close">x</button>
        <form>
          <div className="title-field">
            <label htmlFor="title">Titutlo:</label>
            <input type="text" name="title" class="title" placeholder="Titulo"/>
          </div>
          <div className="price-field"> 
            <label htmlFor="price">Preço:</label>
            <input type="text" name="price" class="price" placeholder="Preço"/>
          </div>
          <div className="year-field"> 
            <label htmlFor="year">Ano:</label>
            <input type="text" name="year" class="year" placeholder="Ano"/>
          </div>
          <div className="imgUrl-field"> 
            <label htmlFor="imgUrl">URL da imagem:</label>
            <textarea type="text" name="imgUrl" class="imgUrl" placeholder="URL da imagem"/>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default Modal