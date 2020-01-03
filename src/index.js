import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { MemoryRouter as Router, Route, Switch } from "react-router-dom";

import { MainMenuScreen } from "./screens/main-menu.screen";
import { GameScreen } from "./screens/game.screen";
import { DifficultyLevelScreen } from "./screens/difficulty-level.screen";

import "./styles.css";
import store from "./store";
import { ModeSelectScreen } from "./screens/mode-select.screen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/game">
            <GameScreen />
          </Route>

          <Route path="/difficulty-level">
            <DifficultyLevelScreen />
          </Route>

          <Route path="/mode-select">
            <ModeSelectScreen />
          </Route>

          <Route path="/">
            <MainMenuScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");

const ReduxedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<ReduxedApp />, rootElement);
