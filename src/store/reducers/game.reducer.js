import {
  SWAP_TILES,
  RESET_SWAP,
  SELECT_TILE,
  UNSELECT_TILE,
  UPDATE_TILE_STATUS,
  SELECT_GAME_MODE,
  gameMode,
  UPDATE_GAME_STATUS
} from "../constants";

const defaultState = {
  swap: false,
  tiles: [],
  tilesStatus: {},
  gameMode: gameMode.none,
  minSwapsMode: {
    threshold: 10
  },
  isPlaying: true
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SELECT_GAME_MODE:
      return { ...state, gameMode: action.payload };

    case SWAP_TILES:
      return { ...state, swap: true };

    case RESET_SWAP:
      return { ...state, swap: false, tiles: [] };

    case SELECT_TILE:
      return { ...state, tiles: [...state.tiles, action.payload] };

    case UNSELECT_TILE:
      const coords = action.payload;
      return {
        ...state,
        tiles: state.tiles.filter(
          tile => !tile.every((coord, index) => coord === coords[index])
        )
      };

    case UPDATE_TILE_STATUS:
      return {
        ...state,
        tilesStatus: {
          ...state.tilesStatus,
          [action.payload.id]: action.payload.status
        }
      };

    case UPDATE_GAME_STATUS:
      return { ...state, isPlaying: action.payload };

    default:
      return { ...state };
  }
};

export default gameReducer;
