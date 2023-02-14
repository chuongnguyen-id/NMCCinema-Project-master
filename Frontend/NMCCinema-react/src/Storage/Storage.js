const isRememberMe = () => {
  if (
    localStorage.getItem("isRememberMe") !== null &&
    localStorage.getItem("isRememberMe") !== undefined
  ) {
    // convert string to boolean and return result
    return JSON.parse(localStorage.getItem("isRememberMe"));
  }
  return true;
};

// eslint-disable-next-line no-shadow
const setRememberMe = (isRememberMe) => {
  localStorage.setItem("isRememberMe", isRememberMe);
};

const setItem = (key, value) => {
  if (isRememberMe()) {
    localStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, value);
  }
};

const getItem = (key) => {
  if (isRememberMe()) {
    return localStorage.getItem(key);
  }
  return sessionStorage.getItem(key);
};

const removeItem = (key) => {
  if (isRememberMe()) {
    localStorage.removeItem(key);
  } else {
    sessionStorage.removeItem(key);
  }
};

const setToken = (token) => {
  setItem("token", token);
};

const removeToken = () => {
  removeItem("token");
};

const getToken = () => getItem("token");

const isAuth = () => getToken() !== null && getToken() !== undefined;

const setUserInfo = (user) => {
  setItem("firstname", user.firstname);
  setItem("lastname", user.lastname);
  setItem("username", user.username);
  setItem("email", user.email);
  setItem("phonenumber", user.phonenumber);
  setItem("role", user.role);
  setItem("status", user.status);
};

const getUserInfo = () => ({
  firstname: getItem("firstname"),
  lastname: getItem("lastname"),
  username: getItem("username"),
  email: getItem("email"),
  phonenumber: getItem("phonenumber"),
  role: getItem("role"),
  status: getItem("status"),
});

const removeUserInfo = () => {
  removeItem("firstname");
  removeItem("lastname");
  removeItem("username");
  removeItem("email");
  removeItem("phonenumber");
  removeItem("role");
  removeItem("status");
};

// export
const storage = {
  isRememberMe,
  setRememberMe,
  setToken,
  getToken,
  removeToken,
  isAuth,
  setUserInfo,
  getUserInfo,
  removeUserInfo,
};
export default storage;
