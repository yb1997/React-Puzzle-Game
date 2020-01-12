import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Board } from "../components/board.component";
import { BoardContainer } from "../components/board-container.component";
import { useTilesPositionStatus } from "../hooks/tile-position-status.hook";
import { useTimer } from "../hooks/timer.hook";
import { Button } from "../components/button.component";
import { UPDATE_GAME_STATUS } from "../store/constants";
import styled from "styled-components";

const formatTime = time => {
  return `${(parseInt(time / 60, 10) + "").padStart(2, "0")}:${(
    "" +
    (time % 60)
  ).padStart(2, "0")}`;
};

const ErrorText = styled.h2`
  color: white;
  background-color: #f44336;
  padding: 0.5em;
`;

export const TimeLimitScreen = () => {
  const areTilesAligned = useTilesPositionStatus();
  const dispatch = useDispatch();
  const [timeLeft, startTimer, pauseTimer] = useTimer(30); // seconds
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (areTilesAligned || timeLeft === 0 || !isGameStarted) {
      dispatch({ type: UPDATE_GAME_STATUS, payload: false });
      pauseTimer();
    } else {
      dispatch({ type: UPDATE_GAME_STATUS, payload: true });
    }
  }, [timeLeft, areTilesAligned, dispatch, isGameStarted, pauseTimer]);

  const startGame = () => {
    startTimer();
    setIsGameStarted(true);
  };

  return (
    <>
      <BoardContainer>
        <h1 style={{ color: "white" }}>Time Limit: {formatTime(timeLeft)}</h1>

        <Board />

        <br />

        {areTilesAligned ? (
          <>
            <h1 style={{ color: "green" }}>Woah! You're a Pro😃👍</h1>
            <Link to="/">
              <Button>New Game</Button>
            </Link>
          </>
        ) : timeLeft === 0 ? (
          <>
            <ErrorText>Mission Failed, We'll Get 'Em Next Time</ErrorText>
            <Link to="/">
              <Button>New Game</Button>
            </Link>
          </>
        ) : (
          !isGameStarted && <Button onClick={startGame}>Start</Button>
        )}
      </BoardContainer>
    </>
  );
};
