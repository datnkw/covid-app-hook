import { combineReducers } from "redux";
import auth from "./auth";
import worldInfo from "./worldInfo";

export default combineReducers({ auth, worldInfo });
