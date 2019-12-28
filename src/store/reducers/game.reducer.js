const defaultState = {
  swap: false,
  tiles: [],
  tilesStatus: {}
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "swap":
      return { ...state, swap: true };

    case "resetSwap":
      return { ...state, swap: false, tiles: [] };

    case "selectTile":
      return { ...state, tiles: [...state.tiles, action.payload] };

    case "unselectTile":
      const coords = action.payload;
      return {
        ...state,
        tiles: state.tiles.filter(
          tile => !tile.every((coord, index) => coord === coords[index])
        )
      };

    case "UPDATE_TILE_STATUS":
      return {
        ...state,
        tilesStatus: {
          ...state.tilesStatus,
          [action.payload.id]: action.payload.status
        }
      };

    default:
      return { ...state };
  }
};

export default gameReducer;
