/** @format */

import { GAME_LIST } from "./data.js";

(function render() {
  const webzinGameList = GAME_LIST.webzin;

  const contentsSection = document.getElementById("contents");
  for (const game of webzinGameList) {
    const figure = createFigure(game);
    contentsSection.appendChild(figure);
  }

  console.log(webzinGameList);
})();

function createFigure(game) {
  var figureElement = document.createElement("figure");

  var linkElement = document.createElement("a");
  linkElement.href = `https://www.youtube.com/results?search_query=${encodeURI(
    game.name
  )}`;
  linkElement.target = "_blank";

  var youtubeIconElement = document.createElement("span");
  youtubeIconElement.className = "fab fa-youtube youtube-icon";

  var imgElement = document.createElement("img");
  imgElement.src = game.path;
  imgElement.alt = "no image";

  var figInfoElement = document.createElement("p");
  figInfoElement.className = "fig-info";
  figInfoElement.textContent = game.localization
    ? `${game.playTime}h / ${game.localization ? "한글" : ""}`
    : `${game.playTime}h`;

  var figCaptionElement = document.createElement("figcaption");
  var gameNameElement = document.createElement("h2");
  gameNameElement.textContent = game.name;
  var gameDescriptionElement = document.createElement("p");
  gameDescriptionElement.textContent = game.genre.split(",").join(" / ");
  figCaptionElement.appendChild(gameNameElement);
  figCaptionElement.appendChild(gameDescriptionElement);

  linkElement.appendChild(youtubeIconElement);
  linkElement.appendChild(imgElement);
  figureElement.appendChild(linkElement);
  figureElement.appendChild(figInfoElement);
  figureElement.appendChild(figCaptionElement);
  return figureElement;
}
