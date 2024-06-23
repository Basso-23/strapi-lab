import axios from "axios";

const url = "http://191.101.0.238:1337/api/books";

export const strapi_read = () => axios.get(url);

export const strapi_write = (newData) => axios.post(url, newData);

export const strapi_update = (id, updatedData) =>
  axios.put(`${url}/${id}`, updatedData);

export const strapi_delete = (id) => axios.delete(`${url}/${id}`);
