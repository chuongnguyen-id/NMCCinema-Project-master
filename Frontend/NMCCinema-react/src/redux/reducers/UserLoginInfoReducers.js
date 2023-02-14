import storage from "../../Storage/Storage";
import * as types from "../constants";

const initialState = {
  userInfo: storage.getUserInfo(),
  token: storage.getToken(),
  isRememberMe: storage.isRememberMe(),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.USER_LOGIN_INFO:
      return {
        ...state,
        userInfo: actions.payload,
      };
    case types.TOKEN_INFO:
      return {
        ...state,
        token: actions.payload,
      };
    case types.REMEMBER_ME_INFO:
      return {
        ...state,
        isRememberMe: actions.payload,
      };
    default:
      return state;
  }
}
