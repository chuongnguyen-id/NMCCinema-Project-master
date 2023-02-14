/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import Api from "./Api";

const url = "/tickets";

const getAll = () => {
  return Api.get(`${url}`);
};

const create = (seat, date, time, price, userId, movieId) => {
  const body = {
    seat,
    date,
    time,
    price,
    userId,
    movieId,
  };

  return Api.post(url, body);
};

const getByUserId = (id) => {
  return Api.get(`${url}/user/${id}`);
};

const deleteByIds = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = { getAll, create, getByUserId, deleteByIds };
export default api;
