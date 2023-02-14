import { createSelector } from "@reduxjs/toolkit";

// Selector
const userSelector = (state) => state.User;

const selectUserSelector = createSelector(userSelector, (state) => state.users);

const selectPageSelector = createSelector(userSelector, (state) => state.page);

const selectSizeSelector = createSelector(userSelector, (state) => state.size);

const selectTotalElementSelector = createSelector(userSelector, (state) => state.totalElement);

const selectSortFieldSelector = createSelector(userSelector, (state) => state.sortField);

const selectSortTypeSelector = createSelector(userSelector, (state) => state.sortType);

const selectSearchSelector = createSelector(userSelector, (state) => state.search);

const selectSelectedRowsSelector = createSelector(userSelector, (state) => state.selectedRows);

const selectLoadingSelector = createSelector(userSelector, (state) => state.isLoading);

// function
export const selectUsers = (state) => selectUserSelector(state);

export const selectPage = (state) => selectPageSelector(state);

export const selectSize = (state) => selectSizeSelector(state);

export const selectTotalElement = (state) => selectTotalElementSelector(state);

export const selectSortField = (state) => selectSortFieldSelector(state);

export const selectSortType = (state) => selectSortTypeSelector(state);

export const selectSearch = (state) => selectSearchSelector(state);

export const selectSelectedRows = (state) => selectSelectedRowsSelector(state);

export const selectLoading = (state) => selectLoadingSelector(state);
