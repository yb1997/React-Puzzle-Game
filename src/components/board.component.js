import React, { useMemo, useEffect } from "react";
import { v4 } from "uuid";
import { Tile } from "./tile.component";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { SWAP_TILES } from "../store/constants";

const StyledBoard = styled.div`
  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const useSwapDispatcher = () => {
  const selectedTiles = useSelector(({ game }) => game.tiles);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTiles.length === 2) {
      dispatch({ type: SWAP_TILES });
    }
  }, [selectedTiles, dispatch]);
};

export const Board = () => {
  useSwapDispatcher();

  const [numOfRows, numOfColumns] = useSelector(({ board }) => [
    board.rows,
    board.columns
  ]);
  const imageUrl = useSelector(({ image }) => image.url);
  const [imageWidth, imageHeight] = useSelector(({ image }) => [
    image.width,
    image.height
  ]);

  const randomPositions = useMemo(() => {
    const alreadyAssignedPositions = {};
    const randomPositions = {};

    for (let j = 0; j < numOfRows; j++) {
      for (let i = 0; i < numOfColumns; i++) {
        let foundUniquePosition = false;

        while (!foundUniquePosition) {
          const randomX = Math.floor(Math.random() * numOfColumns);
          const randomY = Math.floor(Math.random() * numOfRows);

          if (!alreadyAssignedPositions[`${randomX}${randomY}`]) {
            randomPositions[`${i}${j}`] = [randomX, randomY];
            foundUniquePosition = true;
            alreadyAssignedPositions[`${randomX}${randomY}`] = true;
          }
        }
      }
    }
    return randomPositions;
  }, [numOfColumns, numOfRows]);

  const tiles = useMemo(() => {
    let tiles = [];

    for (let j = 0; j < numOfRows; j++) {
      const columns = [];

      for (let i = 0; i < numOfColumns; i++) {
        const [randomX, randomY] = randomPositions[`${i}${j}`];
        columns.push(
          <Tile
            key={v4()}
            imageUrl={imageUrl}
            x={i}
            y={j}
            randomX={randomX}
            randomY={randomY}
          />
        );
      }

      tiles.push(
        <div key={v4()} className="row">
          {columns}
        </div>
      );
    }

    return tiles;
  }, [imageUrl, numOfColumns, numOfRows, randomPositions]);

  return (
    <StyledBoard width={imageWidth} height={imageHeight}>
      {tiles}
    </StyledBoard>
  );
};
