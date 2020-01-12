import React, { useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LayoutScreen } from "./layout.screen";
import { Button } from "../components/button.component";
import { DefaultNavContent } from "../components/default-nav-content.component";
import { gameMode, SELECT_GAME_MODE } from "../store/constants";
import { useSelectedGameMode } from "../hooks/selected-game-mode.hook";

const Heading = styled.h1`
  text-align: center;
  color: white;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  padding: 1em;
  padding-bottom: 0;
  justify-content: center;
  border-radius: 7px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
`;

const FixWidthButton = styled(Button)`
  min-width: 11em;
`;

export const ModeSelectScreen = () => {
  const dispatch = useDispatch();
  useSelectedGameMode();

  const handleClick = useCallback(
    e => {
      const selectedGameMode = e.target.getAttribute("data-mode");
      dispatch({ type: SELECT_GAME_MODE, payload: selectedGameMode });
    },
    [dispatch]
  );

  return (
    <LayoutScreen navbar={<DefaultNavContent />}>
      <Heading>Select Mode</Heading>

      <ButtonsContainer>
        <Link to="/difficulty-level">
          <FixWidthButton data-mode={gameMode.timeLimit} onClick={handleClick}>
            Time Limit
          </FixWidthButton>
        </Link>

        <Link to="/difficulty-level">
          <FixWidthButton data-mode={gameMode.minSwaps} onClick={handleClick}>
            Minimum Swaps
          </FixWidthButton>
        </Link>
      </ButtonsContainer>
    </LayoutScreen>
  );
};
