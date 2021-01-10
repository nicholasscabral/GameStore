import React, { useState, useEffect } from 'react'
import api from '../services/api';

import logo from '../assets/logo.svg'
import add from '../assets/add.svg'

import '../styles/Admin.css'
import '../styles/Global.css'

function AdminPage() {

  
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState([])
  const initialValues = {
    imgUrl: selectedGame.imgUrl,
    title: selectedGame.title,
    price: selectedGame.price,
    year: selectedGame.year
  }
  const [currentValues, setCurrentValues] = useState(initialValues)

  function handleChange(event) {
    var currentValue = event.target.value
    setCurrentValues(currentValue)
  }

  function getCatalog() {
    api.get("/catalog").then((response) => {
      const games = response.data;
      setGames(games);
    });
  }

  async function removeGame(gameId) {
    console.log(gameId);
    if (window.confirm("Are you sure you want to delete this game")) {
      api.post('/deleteGame/' + gameId).then(response => {
        if (response.data.success) window.location.reload()
      })
    } else return 
  }

  async function updateGame(gameId) {
    const response = await api.get('/getGame/' + gameId)
    const game = response.data[0];
    setCurrentValues(game)
    setSelectedGame(game);
  }

  useEffect(() => {
    getCatalog();
  }, [])

  return (
    <div>

      <nav>
        <a href="/"><img src={logo} alt=""/></a>
        <ul>
          <li><button><img src={add}/>Add game</button></li>
          <li><h3>Admin-Portal </h3></li>
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
              <textarea type="text" onChange={handleChange} value={currentValues.imgUrl}/> 
              <p>Title:</p> 
              <input type="text" onChange={handleChange} value={currentValues.title}/>
              <p>Price:</p> 
              <input type="text" onChange={handleChange} value={currentValues.price}/>
              <p>Year:</p> 
              <input type="text" onChange={handleChange} value={currentValues.year}/>
              <button> Update </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage