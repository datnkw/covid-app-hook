import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  isLogin: false,
  email: '',
  id: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { email, id } = action.payload;
      return {
        ...state,
        email,
        id,
        isLogin: true
      };
    }
    case LOGOUT: {
      return {
        ...state,
        email: '',
        id: '',
        isLogin: false
      };
    }
    default:
      return state;
  }
}