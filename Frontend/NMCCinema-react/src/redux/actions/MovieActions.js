import * as types from "../constants";
// import MovieApi from "../../api/MovieApi";

export const getListMovieAction = (movies, page, totalElement, sortField, sortType, search) => ({
  type: types.GET_LIST_MOVIE,
  payload: {
    movies,
    // paging
    page,
    totalElement,
    // sorting
    sortField,
    sortType,
    // search
    search,
  },
});

// export const getListMovieAction = (page, size, sortField, sortType, search) => async (dispatch) => {
//   try {
//     const json = await MovieApi.getAll(page, size, sortField, sortType, search);
//     const movies = json.content;
//     const totalElement = json.totalElements;
//     dispatch(listMovieAction(movies, page, totalElement, sortField, sortType, search));
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error);
//   }
// };

export const updateSelectedRowsAction = (selectedRows) => ({
  type: types.GET_LIST_MOVIE_SELECTED_ROWS,
  payload: selectedRows,
});
