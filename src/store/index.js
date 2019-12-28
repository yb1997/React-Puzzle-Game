import { createStore, combineReducers } from "redux";
import image from "./reducers/image.reducer";
import board from "./reducers/board.reducer";
import game from "./reducers/game.reducer";

const store = createStore(
  combineReducers({
    image,
    board,
    game
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
