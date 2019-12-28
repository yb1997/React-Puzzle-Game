const dimension = { width: 500, height: 500 };

const defaultState = {
  ...dimension,
  url: `https://unsplash.it/${dimension.width}/${dimension.height}`
};

const imageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "setDimension":
      const { width, height } = action.payload;
      return { ...state, width, height };
    case "setUrl":
      const url = action.payload;
      return { ...state, url };
    default:
      return state;
  }
};

export default imageReducer;
