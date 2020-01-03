import styled from "styled-components";

export const Button = styled.button`
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
  outline: 0;

  &:hover {
    background: linear-gradient(to top, dodgerblue, #03a9f4);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  }
`;
