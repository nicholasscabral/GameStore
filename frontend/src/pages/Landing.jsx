import React, { useEffect, useState } from "react";
import api from "../services/api";

import { addGameToCart, changeButtonStyle } from "../functions/helpers";

import Navbar from "../components/Navbar";
import shoppingCart from "../assets/carrinho.svg";

import "../styles/Landing.css";
import "../styles/Global.css";

function Landing() {
  const [games, setGames] = useState([]);

  function getCatalog() {
    api.get("/catalog").then((response) => {
      const games = response.data;
      setGames(games);
    });
  }

  useEffect(() => {
    getCatalog();
  }, []);

  return (
    <div>
      <Navbar />

      <div id="main">
        <div className="games-grid">
          {games.map((game) => (
            <div className="card" id={game.id}>
              <li>
                <img src={game.imgUrl} />
                <div class="info">
                  <p>{game.title}</p>
                  <p>Preço: R$ {game.price}</p>
                  <p>Ano: {game.year}</p>
                  <button onClick={() => {addGameToCart(game.id)}}> <img src={shoppingCart} alt="carrinho" /> Adicionar ao carrinho </button>
                </div>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
