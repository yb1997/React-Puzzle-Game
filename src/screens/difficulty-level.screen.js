import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { SET_BOARD_DIMENSIONS } from "../store/constants";

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

const Button = styled.button`
  padding: 0.7em 1.5em;
  font-size: 1.4em;
  margin-bottom: 1em;
  cursor: pointer;
  box-shadow: 0 2px 25px rgba(0, 0, 0, 0.4);
  border-radius: 7px;
  border: 2px solid dodgerblue;
  background: linear-gradient(to bottom, dodgerblue, #03a9f4);
  transition: all 0.2s;
  color: white;

  &:hover {
    background: linear-gradient(to top, dodgerblue, #03a9f4);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  }
`;

const DifficultyChooser = props => {
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

  const handleClick = useCallback(
    e => {
      const payload = {
        rows: levelMap[props.level],
        columns: levelMap[props.level]
      };
      dispatch({ type: SET_BOARD_DIMENSIONS, payload });
      history.push("/game");
    },
    [dispatch, history, levelMap, props]
  );

  return <span onClick={handleClick}>{props.children}</span>;
};

export const DifficultyLevelScreen = () => {
  return (
    <>
      <Heading>Difficulty Level</Heading>

      <ButtonsContainer>
        <DifficultyChooser level={1}>
          <Button>3 X 3</Button>
        </DifficultyChooser>

        <DifficultyChooser level={2}>
          <Button>4 X 4</Button>
        </DifficultyChooser>

        <DifficultyChooser level={3}>
          <Button>5 X 5</Button>
        </DifficultyChooser>
      </ButtonsContainer>
    </>
  );
};
