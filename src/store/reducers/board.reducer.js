import { SET_BOARD_DIMENSIONS } from "../constants";

const defaultState = {
  rows: 3,
  columns: 3
};

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BOARD_DIMENSIONS:
      const { rows, columns } = action.payload;
      return { ...state, rows, columns };
    default:
      return state;
  }
};

export default boardReducer;
