import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "../components/button.component";

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

export const MainMenuScreen = () => {
  return (
    <>
      <Heading>Main menu</Heading>

      <ButtonsContainer>
        <Link to="/mode-select">
          <Button>Start Game</Button>
        </Link>
      </ButtonsContainer>
    </>
  );
};
