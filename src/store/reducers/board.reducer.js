const defaultState = {
  rows: 3,
  columns: 3
};

const boardReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setBoardDimensions":
      const { rows, columns } = action.payload;
      return { ...state, rows, columns };
    default:
      return state;
  }
};

export default boardReducer;
