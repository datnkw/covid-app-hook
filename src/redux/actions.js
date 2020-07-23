import { LOGIN, LOGOUT } from "./actionTypes";

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