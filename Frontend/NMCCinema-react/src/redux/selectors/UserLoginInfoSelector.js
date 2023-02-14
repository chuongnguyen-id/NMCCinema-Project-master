import { createSelector } from "@reduxjs/toolkit";

// Selector
const userLoginInfoSelector = (state) => state.UserLoginInfo;

const selectUserInfoSelector = createSelector(userLoginInfoSelector, (state) => state.userInfo);

const selectTokenSelector = createSelector(userLoginInfoSelector, (state) => state.token);

const selectRememberMeSelector = createSelector(
  userLoginInfoSelector,
  (state) => state.isRememberMe
);

const selectFullNameSelector = createSelector(
  selectUserInfoSelector,
  (state) => `${state.firstName} ${state.lastName}`
);

/** function */
export const selectUserInfo = (state) => {
  selectUserInfoSelector(state);
};

export const selectToken = (state) => {
  selectTokenSelector(state);
};

export const selectRememberMe = (state) => {
  selectRememberMeSelector(state);
};

export const selectFullName = (state) => {
  selectFullNameSelector(state);
};
