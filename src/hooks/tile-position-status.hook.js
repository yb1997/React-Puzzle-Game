import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Use it to find out whether all tiles are in position
 */
export const useTilesPositionStatus = () => {
  const [areTilesInPosition, setAreTilesInPosition] = useState(false);
  const tilesStatus = useSelector(({ game }) => game.tilesStatus);

  useEffect(() => {
    const areInPosition = Object.values(tilesStatus).every(
      status => status === true
    );
    setAreTilesInPosition(areInPosition);
  }, [tilesStatus]);

  return areTilesInPosition;
};
