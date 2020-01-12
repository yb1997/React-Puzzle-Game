import React from "react";
import styled from "styled-components";
import { animated, useTransition, config } from "react-spring";
import { useLocation } from "react-router-dom";

import { Navbar } from "../components/navbar.component";

const LayoutContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledScreenContainer = styled(animated.div)`
  flex: 1;
`;

const ScreenContainer = prop => {
  const location = useLocation();

  const transitions = useTransition(location, location => location.pathname, {
    // from: { transform: "translate3d(100vw, -2000px, 0)" },
    // enter: { transform: "translate3d(0, 0, 0)" },
    // leave: { transform: "translate3d(-20vw, 200px, 0)" },
    from: { transform: "translate3d(100vw, 100vw, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(-100vw, -100vw, 0)" },
    config: config.stiff
  });

  return transitions.map(({ item, key, props }) => (
    <StyledScreenContainer key={key} style={props}>
      {prop.children}
    </StyledScreenContainer>
  ));
};

export const LayoutScreen = props => {
  return (
    <LayoutContainer>
      {!props.hideNavbar && <Navbar>{props.navbar}</Navbar>}

      <ScreenContainer>{props.children || props.body}</ScreenContainer>
    </LayoutContainer>
  );
};
