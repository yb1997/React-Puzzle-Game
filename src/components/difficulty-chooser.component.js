import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { SET_BOARD_DIMENSIONS, gameModeUrlMap } from "../store/constants";
import { useSelectedGameMode } from "../hooks/selected-game-mode.hook";

export const DifficultyChooser = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const levelMap = useMemo(
    () => ({
      1: 3,
      2: 4,
      3: 5
    }),
    []
  );
  const selectedGameMode = useSelectedGameMode();

  const handleClick = useCallback(
    e => {
      const payload = {
        rows: levelMap[props.level],
        columns: levelMap[props.level]
      };
      dispatch({ type: SET_BOARD_DIMENSIONS, payload });
      history.push(gameModeUrlMap[selectedGameMode]);
    },
    [dispatch, history, levelMap, props.level, selectedGameMode]
  );

  return <span onClick={handleClick}>{props.children}</span>;
};
