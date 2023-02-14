import { createSelector } from "@reduxjs/toolkit";

// Selector
const movieSelector = (state) => state.Movie;

const selectMovieSelector = createSelector(movieSelector, (state) => state.movies);

const selectPageSelector = createSelector(movieSelector, (state) => state.page);

const selectSizeSelector = createSelector(movieSelector, (state) => state.size);

const selectTotalElementSelector = createSelector(movieSelector, (state) => state.totalElement);

const selectSortFieldSelector = createSelector(movieSelector, (state) => state.sortField);

const selectSortTypeSelector = createSelector(movieSelector, (state) => state.sortType);

const selectSearchSelector = createSelector(movieSelector, (state) => state.search);

const selectSelectedRowsSelector = createSelector(movieSelector, (state) => state.selectedRows);

const selectLoadingSelector = createSelector(movieSelector, (state) => state.isLoading);

/** function */
export const selectMovies = (state) => selectMovieSelector(state);

export const selectPage = (state) => selectPageSelector(state);

export const selectSize = (state) => selectSizeSelector(state);

export const selectTotalElement = (state) => selectTotalElementSelector(state);

export const selectSortField = (state) => selectSortFieldSelector(state);

export const selectSortType = (state) => selectSortTypeSelector(state);

export const selectSearch = (state) => selectSearchSelector(state);

export const selectSelectedRows = (state) => selectSelectedRowsSelector(state);

export const selectLoading = (state) => selectLoadingSelector(state);
