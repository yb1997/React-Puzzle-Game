import React from "react";
import styled from "styled-components";

import { LayoutScreen } from "./layout.screen";
import { Button } from "../components/button.component";
import { DefaultNavContent } from "../components/default-nav-content.component";
import { DifficultyChooser } from "../components/difficulty-chooser.component";

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

export const DifficultyLevelScreen = () => {
  return (
    <LayoutScreen navbar={<DefaultNavContent />}>
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
    </LayoutScreen>
  );
};
