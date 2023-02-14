import Api from "./Api";

const login = (username, password) => {
  const parameters = {
    username,
    password,
  };

  return Api.get(`/login`, { params: parameters });
};

// export
const api = { login };
export default api;
