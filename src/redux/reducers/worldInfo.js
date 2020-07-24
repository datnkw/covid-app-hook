import { UPDATE_WORLD_INFO } from "../actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case UPDATE_WORLD_INFO: {
      const {countryName, data, time} = action.payload;
      return {
        ...state,
        [countryName]: {
          data,
          time
        }
      };
    }
    default:
      return state;
  }
}