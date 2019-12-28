import React, { useMemo, useEffect } from "react";
import { v4 } from "uuid";
import { Tile } from "./tile.component";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

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
      dispatch({ type: "swap" });
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

  const tiles = useMemo(() => {
    let tiles = [];

    for (let j = 0; j < numOfRows; j++) {
      const columns = [];

      for (let i = 0; i < numOfColumns; i++) {
        columns.push(<Tile key={v4()} imageUrl={imageUrl} x={i} y={j} />);
      }

      tiles.push(
        <div key={v4()} className="row">
          {columns}
        </div>
      );
    }
    return tiles;
  }, [imageUrl, numOfColumns, numOfRows]);

  return (
    <StyledBoard width={imageWidth} height={imageHeight}>
      {tiles}
    </StyledBoard>
  );
};
