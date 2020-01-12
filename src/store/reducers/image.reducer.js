import { SET_IMAGE_URL, SET_IMAGE_DIMENSION } from "../constants";

const dimension = { width: 400, height: 400 };

const defaultState = {
  ...dimension,
  url: `https://unsplash.it/${dimension.width}/${dimension.height}`
};

const imageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IMAGE_DIMENSION:
      const { width, height } = action.payload;
      return { ...state, width, height };
    case SET_IMAGE_URL:
      const url = action.payload;
      return { ...state, url };
    default:
      return state;
  }
};

export default imageReducer;
