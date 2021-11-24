/** @format */

import { GAME_LIST } from "./data.js";
import { renderFigureList } from "./renderFigureList.js";

(function init() {
  const dataKey = "webzin";
  renderFigureList(dataKey, GAME_LIST[dataKey]);
})();
