import * as types from "../constants";
// import UserApi from "../../api/UserApi";

export const getListUserAction = (users, page, totalElement, sortField, sortType, search) => ({
  type: types.GET_LIST_USER,
  payload: {
    users,
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

// export const getListUserAction = (page, size, sortField, sortType, search) => async (dispatch) => {
//   try {
//     const json = await UserApi.getAll(page, size, sortField, sortType, search);
//     const users = json.content;
//     const totalElement = json.totalElements;
//     dispatch(listUserAction(users, page, totalElement, sortField, sortType, search));
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(error);
//   }
// };

export const updateSelectedRowsAction = (selectedRows) => ({
  type: types.GET_LIST_USER_SELECTED_ROWS,
  payload: selectedRows,
});
