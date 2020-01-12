import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  SELECT_TILE,
  UNSELECT_TILE,
  UPDATE_TILE_STATUS,
  RESET_SWAP
} from "../store/constants";

const wobble = keyframes`
  0% {
    transform: rotate(0deg) scale(1.07);
  }
  25% {
    transform: rotate(-10deg) scale(1.07);
  }
  50% {
    transform: rotate(10deg) scale(1.07);
  }
  100% {
    transform: rotate(0deg) scale(1.07);
  }
`;

const Container = styled.button`
  display: inline-block;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-image: ${props => "url(" + props.imageUrl + ")" || "none"};
  background-repeat: no-repeat;
  /* background-color: dodgerblue; */
  background-position: ${({ xPos }) => xPos}% ${({ yPos }) => yPos}%;
  transition: all 0.2s;
  position: absolute;
  z-index: 1;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;
  cursor: pointer;

  &.active {
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.5);
    border: 3px solid rgba(255, 255, 255, 0.25);
    z-index: 2;
    animation: ${wobble} 1s infinite;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Tile = ({ x: originalX, y: originalY, randomX, randomY }) => {
  const [isClicked, setIsClicked] = useState(false);
  const {
    rows,
    columns,
    url,
    width: imageWidth,
    height: imageHeight,
    swap
  } = useSelector(({ board, image, game }) => ({
    ...board,
    ...image,
    ...game
  }));

  const selectedTiles = useSelector(({ game }) => game.tiles);
  const isGamePlaying = useSelector(({ game }) => game.isPlaying);

  const [x, setX] = useState(randomX);
  const [y, setY] = useState(randomY);

  const [xPos] = useState(Math.floor(originalX * (100 / (rows - 1))));
  const [yPos] = useState(Math.floor(originalY * (100 / (columns - 1))));

  const [width] = useState(imageWidth / rows);
  const [height] = useState(imageHeight / columns);

  const [left, setLeft] = useState(x * width);
  const [top, setTop] = useState(y * height);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isClicked) {
      dispatch({ type: SELECT_TILE, payload: [x, y] });
    } else {
      dispatch({ type: UNSELECT_TILE, payload: [x, y] });
    }
  }, [isClicked, dispatch, x, y]);

  useEffect(() => {
    const amIInRightPlace = originalX === x && originalY === y;

    dispatch({
      type: UPDATE_TILE_STATUS,
      payload: { id: `${originalX}${originalY}`, status: amIInRightPlace }
    });
  }, [originalX, originalY, x, y, dispatch]);

  useEffect(() => {
    const coords = [x, y];
    const isItMe = tile =>
      tile.every((coord, index) => coord === coords[index]);

    if (swap && selectedTiles.some(tile => isItMe(tile))) {
      const [newX, newY] = selectedTiles.find(tile => !isItMe(tile));
      setLeft(newX * width);
      setTop(newY * height);
      setX(newX);
      setY(newY);
      setIsClicked(false);
      dispatch({ type: RESET_SWAP });
    }
  }, [selectedTiles, swap, height, width, x, y, dispatch]);

  return (
    <>
      <Container
        className={isClicked ? "active" : ""}
        onClick={e => setIsClicked(!isClicked)}
        left={left}
        top={top}
        width={width}
        height={height}
        xPos={xPos}
        yPos={yPos}
        imageUrl={url}
        disabled={!isGamePlaying}
      />
    </>
  );
};
