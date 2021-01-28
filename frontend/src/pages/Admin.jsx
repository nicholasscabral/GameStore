import React, { useState, useEffect } from 'react'
import api from '../services/api';

import logo from '../assets/logo.svg'
import add from '../assets/add.svg'
import Modal, {showModal} from '../components/Modal'

import '../styles/Admin.css'
import '../styles/Global.css'

function AdminPage() {

  const loggedUser = localStorage.getItem('loggedUser')

  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState([])
  const initialValues = {
    id: selectedGame.id,
    imgUrl: selectedGame.imgUrl,
    title: selectedGame.title,
    price: selectedGame.price,
    year: selectedGame.year
  }
  const [currentValues, setCurrentValues] = useState(initialValues)

  async function handleSubmit() {
    console.log(currentValues)
    api.post('/updateGame/' + selectedGame.id, {
      imgUrl: currentValues.imgUrl, 
      title: currentValues.title,
      price: currentValues.price,
      year: currentValues.year
    }).then(response => {
      console.log(response);
    })
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
        if (response.data.success) alert(response.data.message);
      })
    } else return 
  }

  async function updateGame(gameId) {
    const response = await api.get('/getGame/' + gameId)
    const game = response.data[0];

    const gameValues = {
      imgUrl: game.imgUrl,
      title: game.title,
      price: game.price,
      year: game.year
    }

    setSelectedGame(game);
    setCurrentValues(gameValues)
  }

  useEffect(() => {
    getCatalog();
  }, [games])

  return (
    <div>

      <nav>
        <a href="/"><img src={logo} alt=""/></a>
        <ul>
          <li><button onClick={() => {showModal()}}><img src={add}/>Add game</button></li>
          <li><h3>{`Hi, ${loggedUser}`}</h3></li>
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
              <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
                <p>ImgUrl:</p> 
                <textarea type="text" onChange={e => setCurrentValues({imgUrl: e.target.value})} value={currentValues.imgUrl}/> 
                <p>Title:</p> 
                <input type="text" onChange={e => setCurrentValues({title: e.target.value})} value={currentValues.title}/>
                <p>Price:</p> 
                <input type="text" onChange={e => setCurrentValues({price: e.target.value})} value={currentValues.price}/>
                <p>Year:</p> 
                <input type="text" onChange={e => setCurrentValues({year: e.target.value})} value={currentValues.year}/> <br/>
                <button> Update </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      <Modal />

    </div>
  )
}

export default AdminPage