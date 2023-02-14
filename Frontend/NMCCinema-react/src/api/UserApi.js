/* eslint-disable arrow-body-style */
import Api from "./Api";

const url = "/users";

const getAll = (page = 1, size = 10, sortField = "id", sortType = "desc", search = "") => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  // search
  if (search) {
    parameters.search = search;
  }

  return Api.get(`${url}`, { params: parameters });
};

const existsByEmail = (email) => {
  return Api.get(`${url}/email/${email}`);
};

const existsByUsername = (username) => {
  return Api.get(`${url}/userName/${username}`);
};

const create = (firstname, lastname, username, email, phoneNumber, password) => {
  const body = {
    firstName: firstname,
    lastName: lastname,
    userName: username,
    phoneNumber,
    email,
    password,
  };

  return Api.post(url, body);
};

const resendEmailToActiveAccount = (email) => {
  const parameters = {
    email,
  };

  return Api.get(`${url}/userRegistrationConfirmRequest`, { params: parameters });
};

const requestResetPassword = (email) => {
  const parameters = {
    email,
  };

  return Api.get(`${url}/resetPasswordRequest`, { params: parameters });
};

const resendEmailToResetpassword = (email) => {
  const parameters = {
    email,
  };

  return Api.get(`${url}/resendResetPassword`, { params: parameters });
};

const resetPassword = (token, newPassword) => {
  const parameters = {
    token,
    newPassword,
  };

  return Api.get(`${url}/resetPassword`, { params: parameters });
};

const getProfile = () => {
  return Api.get(`${url}/profile`);
};

const updateProfile = (avatarUrl) => {
  const body = {
    avatarUrl,
  };

  return Api.put(`${url}/profile`, body);
};

// export
const api = {
  getAll,
  updateProfile,
  getProfile,
  create,
  existsByEmail,
  existsByUsername,
  resendEmailToActiveAccount,
  requestResetPassword,
  resendEmailToResetpassword,
  resetPassword,
};
export default api;
