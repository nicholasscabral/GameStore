import React, { useState, useEffect } from 'react'
import api from '../services/api';

import logo from '../assets/logo.svg'

import '../styles/Admin.css'
import '../styles/Global.css'

function AdminPage() {

  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState([])

  function getCatalog() {
    api.get("/catalog").then((response) => {
      const games = response.data;
      setGames(games);
    });
  }

  async function removeGame(gameId) {

  }

  async function updateGame(gameId) {
    const response = await api.get('/getGame/' + gameId)
    const game = response.data[0];
    setSelectedGame(game);
  }

  useEffect(() => {
    getCatalog();
  }, [])

  return (
    <div>

      <nav>
        <img src={logo} alt=""/>
        <ul>
          <li><button>Add game</button></li>
          <li><h3>Admin-Portal</h3></li>
        </ul>
      </nav>

      <div id="container">
        <div className="games">
          {games.map((game) => (
            <div className="game" id={game.id}>
            <li>
              <img src={game.imgUrl} />
              <p> {game.title}</p>
              <div className="buttons">
                <button onClick={() => {removeGame(game.id)}}> Deletar </button>
                <button onClick={() => {updateGame(game.id)}}> Editar </button>
              </div>
            </li>
          </div>
          ))}
        </div>

        <div className="update-field">
          {selectedGame.length === 0 ? (<p>Nenhum jogo selecionado</p>) : (
            <div id="update">
              <p>ImgUrl:</p> 
              <textarea type="text" value={selectedGame.imgUrl}/> 
              <p>Title:</p> 
              <input type="text" value={selectedGame.title}/>
              <p>Price:</p> 
              <input type="text" value={selectedGame.price}/>
              <p>Year:</p> 
              <input type="text" value={selectedGame.year}/>
              <button> Update </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage