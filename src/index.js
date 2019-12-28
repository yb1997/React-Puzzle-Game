import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";

import { Board } from "./components/board.component";

import "./styles.css";
import store from "./store";
import styled from "styled-components";

const useTilesPositionStatus = () => {
  const [areTilesInPosition, setAreTilesInPosition] = useState(false);
  const tilesStatus = useSelector(({ game }) => game.tilesStatus);

  useEffect(() => {
    const areInPosition = Object.values(tilesStatus).every(
      status => status === true
    );
    setAreTilesInPosition(areInPosition);
  }, [tilesStatus]);

  return areTilesInPosition;
};

const PositiveStatus = styled.h1`
  background-color: #4caf50;
  color: white;
  padding: 0.5em;
`;

const NegativeStatus = styled.h1`
  background-color: #cc3e44;
  color: white;
  padding: 0.5em;
`;

function App() {
  const areTilesInPosition = useTilesPositionStatus();

  return (
    <div className="App">
      <Board />
      {areTilesInPosition ? (
        <PositiveStatus>
          All Tiles are in Position{" "}
          <span role="img" aria-label="happy">
            😀
          </span>
        </PositiveStatus>
      ) : (
        <NegativeStatus>
          Tiles are not in position{" "}
          <span role="img" aria-label="sad">
            😪
          </span>
        </NegativeStatus>
      )}
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
