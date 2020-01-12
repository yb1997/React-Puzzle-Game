import { useSelector } from "react-redux";

/**
 * Use it find out currently selected game mode
 */
export const useSelectedGameMode = () => {
  const selectedGameMode = useSelector(state => state.game.gameMode);

  return selectedGameMode;
};
