/** @format */

const DEFAULT_NONE_LAZY_COUNT = 3;

export function renderFigureList(dataKey, dataList) {
  const contentsSection = document.getElementById("contents");
  const figureElementList = dataList.map((game, index) =>
    createFigure(dataKey, game, DEFAULT_NONE_LAZY_COUNT, index)
  );
  for (const fig of figureElementList) {
    contentsSection.appendChild(fig);
  }
}

function createFigure(category, game, noneLazyCount, index) {
  var figureElement = document.createElement("figure");
  var linkElement = document.createElement("a");
  linkElement.href = `https://www.youtube.com/results?search_query=${encodeURI(
    game.name
  )}`;
  linkElement.target = "_blank";
  linkElement.rel = "noopener noreferrer";
  var youtubeIconElement = document.createElement("span");
  youtubeIconElement.className = "fab fa-youtube youtube-icon";

  var imgElement = document.createElement("img");
  var pathSplittedList = game.path.split("/");
  pathSplittedList[pathSplittedList.length] =
    pathSplittedList[pathSplittedList.length - 1];
  pathSplittedList[pathSplittedList.length - 2] = "lazy";

  if (noneLazyCount > index) {
    imgElement.src = game.path;
  } else {
    imgElement.src = pathSplittedList.join("/");
    imgElement.dataset.src = game.path;
    imgElement.classList = "lazy";
  }
  imgElement.alt = "no image";

  var figInfoElement = document.createElement("p");
  figInfoElement.className = "fig-info";
  if (category == "webzin") {
    figInfoElement.textContent = game.localization
      ? `${game.playTime}h / ${game.localization ? "한글" : ""}`
      : `${game.playTime}h`;
  } else if (category == "editorsPicks") {
    figInfoElement.textContent = `다운로드 : ${withUnitString(
      game.count_play
    )}+`;
  } else if (category == "intwohundreds") {
    figInfoElement.textContent = `최고 순위 : ${Math.min(
      ...game.rank.filter((x) => x != null)
    )}`;
  }
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

const NUMBER_UNITS = ["", "K", "M", "B"];

function withUnitString(num) {
  var unitNumber = num;
  var resultNumber = unitNumber;
  var unitIndexCount = -1;
  while (unitNumber > 0) {
    resultNumber = unitNumber;
    unitIndexCount++;
    unitNumber /= 1000;
    unitNumber = Math.trunc(unitNumber);
  }
  if (unitIndexCount < 0) unitIndexCount = 0;

  return `${resultNumber}${NUMBER_UNITS[unitIndexCount]}`;
}
