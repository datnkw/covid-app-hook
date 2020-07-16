import React from "react";

const authentication = {
  isLogin: false,
  email: null,
  id: null
}

const login = (email, id) => {
}

const logout = () => {
}

export const UserContext = React.createContext({
  authentication,
  login,
  logout
}
);