import api from "../services/api";
import check from "../assets/check.svg";

export function changeButtonStyle(id) {
  const game = document.getElementById(id);
  const button = game.querySelector("button");

  button.toggleAttribute("disabled", true);
  button.classList.add("hoverOff");

  button.innerHTML = `
    <img src="${check}"> Adicionado 
  `;
}

export function addGameToCart(gameId) {
  api.post(`/cart/${gameId}`).then((response) => {
    console.log(response);

    const success = response.data.success;

    if (success) changeButtonStyle(gameId);
    else alert("game already added");
  });
}

export function removeGameFromCart(gameId) {
  api.delete(`/cart/${gameId}`).then((response) => {
    const success = response.data.success;
  });
}
