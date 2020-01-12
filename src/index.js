import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useTransition, animated } from "react-spring";

import {
  MemoryRouter as Router,
  Route,
  Switch,
  useLocation
} from "react-router-dom";

import { MainMenuScreen } from "./screens/main-menu.screen";
import { DifficultyLevelScreen } from "./screens/difficulty-level.screen";
import { TimeLimitScreen } from "./screens/time-limit.screen";
import { MinSwapsScreen } from "./screens/min-swaps.screen";

import "./styles.css";
import store from "./store";
import { ModeSelectScreen } from "./screens/mode-select.screen";
import { gameModeUrlMap, gameMode } from "./store/constants";

function App() {
  const location = useLocation();
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: "translateX(100vw)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(-100vw)" },
    delay: 500
  });

  return (
    <div className="App">
      {transitions.map(({ item, key, props: style }) => (
        <animated.div key={key} style={style}>
          <Switch location={item}>
            <Route path={gameModeUrlMap[gameMode.minSwaps]}>
              <MinSwapsScreen />
            </Route>

            <Route path={gameModeUrlMap[gameMode.timeLimit]}>
              <TimeLimitScreen />
            </Route>

            <Route path="/difficulty-level">
              <DifficultyLevelScreen />
            </Route>

            <Route path="/mode-select">
              <ModeSelectScreen />
            </Route>

            <Route path="/" exact>
              <MainMenuScreen />
            </Route>
          </Switch>
        </animated.div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");

const ReduxedApp = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<ReduxedApp />, rootElement);
