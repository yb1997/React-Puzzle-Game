import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { BoardContainer } from "../components/board-container.component";
import { Board } from "../components/board.component";
import { Button } from "../components/button.component";
import { useTilesPositionStatus } from "../hooks/tile-position-status.hook";
import { UPDATE_GAME_STATUS } from "../store/constants";

const useSwapsCount = () => {
  const [swapsDone, setSwapsDone] = useState(0);
  const isSwapped = useSelector(state => state.game.swap);

  useEffect(() => {
    if (isSwapped) {
      setSwapsDone(swap => swap + 1);
    }
  }, [isSwapped]);

  return swapsDone;
};

const useThresholdExceeded = numOfSwaps => {
  const [isThresholdExceeded, setIsThresholdExceeded] = useState(false);
  const threshold = useSelector(state => state.game.minSwapsMode.threshold);

  useEffect(() => {
    if (numOfSwaps > threshold) {
      setIsThresholdExceeded(true);
    }
  }, [numOfSwaps, threshold]);

  return isThresholdExceeded;
};

export const MinSwapsScreen = () => {
  const swapsDone = useSwapsCount();
  const isThresholdExceeded = useThresholdExceeded(swapsDone);
  const threshold = useSelector(state => state.game.minSwapsMode.threshold);
  const areTilesAligned = useTilesPositionStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isThresholdExceeded || areTilesAligned) {
      dispatch({ type: UPDATE_GAME_STATUS, payload: false });
    } else {
      dispatch({ type: UPDATE_GAME_STATUS, payload: true });
    }
  }, [isThresholdExceeded, areTilesAligned, dispatch]);

  return (
    <>
      <BoardContainer>
        <p>Solve Puzzle in {threshold} Swaps or less</p>
        <Board />

        {areTilesAligned ? (
          <>
            <h1 style={{ color: "green" }}>
              All tiles are aligned, You won!😃👍
            </h1>
            <Link to="/">
              <Button>New Game</Button>
            </Link>
          </>
        ) : isThresholdExceeded ? (
          <>
            <h2>Max Number of Swaps Exceeded, Shame on you loser👿👎</h2>
            <Link to="/">
              <Button>New Game</Button>
            </Link>
          </>
        ) : (
          <h2>Swaps Done: {swapsDone}</h2>
        )}
      </BoardContainer>
    </>
  );
};
