import { UPDATE_WORLD_INFO } from "../actionTypes";

const initialState = {};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case UPDATE_WORLD_INFO: {
      const {countryName, data, time} = action.payload;
      console.log("countryName in worldInfo: ", countryName);
      console.log("time: ", time);
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