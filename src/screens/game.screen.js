import React from "react";
import styled from "styled-components";
import { Board } from "../components/board.component";
import { useTilesPositionStatus } from "../hooks/tile-position-status.hook";

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

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const GameScreen = () => {
  const areTilesInPosition = useTilesPositionStatus();

  return (
    <Container>
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
    </Container>
  );
};
