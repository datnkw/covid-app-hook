import { LOGIN, LOGOUT, UPDATE_WORLD_INFO } from "./actionTypes";

export const login = ({email, id}) => ({
  type: LOGIN,
  payload: {
    email, 
    id
  }
});

export const logout = () => ({
  type: LOGOUT
})

export const updateWorldInfo = (countryName, data) => ({
  type: UPDATE_WORLD_INFO,
  payload: {
    countryName,
    data,
    time: Date.now()/1000
  }
})