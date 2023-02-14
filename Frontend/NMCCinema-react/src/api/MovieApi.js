/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import Api from "./Api";

const url = "/movies";

const getAll = (page = 1, size = 10, sortField = "id", sortType = "asc", search = "") => {
  const parameters = {
    page,
    size,
    sort: `${sortField},${sortType}`,
  };

  // search
  if (search) {
    parameters.search = search;
  }

  // // filter
  // if (minTotalMember !== null && minTotalMember !== undefined) {
  //     parameters.minTotalMember = minTotalMember;
  // }

  // if (maxTotalMember !== null && maxTotalMember !== undefined) {
  //     parameters.maxTotalMember = maxTotalMember;
  // }

  return Api.get(`${url}`, { params: parameters });
};

const existsByTitle = (title) => {
  return Api.get(`${url}/title/${title}`);
};

const create = (
  title,
  theater,
  posterUrl,
  bannerUrl,
  director,
  overview,
  genre,
  rated,
  releasedDate,
  duration
) => {
  const body = {
    title,
    theater,
    posterUrl,
    bannerUrl,
    director,
    overview,
    genre,
    rated,
    releasedDate,
    duration,
  };

  return Api.post(url, body);
};

const getById = (id) => {
  return Api.get(`${url}/${id}`);
};

const update = (
  id,
  title,
  theater,
  postUrl,
  bannerUrl,
  director,
  overview,
  genre,
  rated,
  releasedDate,
  duration
) => {
  const body = {
    title,
    theater,
    postUrl,
    bannerUrl,
    director,
    overview,
    genre,
    rated,
    releasedDate,
    duration,
  };

  return Api.put(`${url}/${id}`, body);
};

const deleteByIds = (ids) => {
  return Api.delete(`${url}/${ids.toString()}`);
};

// export
const api = { getAll, existsByTitle, create, getById, update, deleteByIds };
export default api;
