import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  height: 60px;
  line-height: 60px;
  overflow: none;
  width: 100%;
  background-color: dodgerblue;
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

export const Navbar = props => {
  return (
    <>
      <Nav>{props.children}</Nav>
    </>
  );
};
