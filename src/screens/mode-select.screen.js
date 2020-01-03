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

const FixWidthButton = styled(Button)`
  min-width: 11em;
`;

export const ModeSelectScreen = () => {
  return (
    <>
      <Heading>Select Mode</Heading>

      <ButtonsContainer>
        <Link to="/difficulty-level">
          <FixWidthButton>Time Limit</FixWidthButton>
        </Link>

        <Link to="/difficulty-level">
          <FixWidthButton>Minimum Swaps</FixWidthButton>
        </Link>
      </ButtonsContainer>
    </>
  );
};
