import { combineReducers } from "redux";

import { reducer as toastr } from "react-redux-toastr";
import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import UserLoginInfo from "./UserLoginInfoReducers";
import User from "./UserReducers";
import Movie from "./MovieReducers";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  UserLoginInfo,
  User,
  Movie,
});
