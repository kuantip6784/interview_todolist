import axios, { AxiosError, AxiosResponse } from "axios";
import { IAuth } from "interfaces/auth.interfacr";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const axiosApi = axios.create({
  baseURL: "https://candidate.neversitup.com/todo",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axiosApi.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

const api = {
  auth: (data: IAuth) => axiosApi.post("/users/auth", data),
  getAll: () => axiosApi.get(`/todos`),
  getById: (id: string) => axiosApi.get(`/todos/${id}`),
  create: (data: any) => axiosApi.post("/todos", data),
  update: (id: string, data: any) => axiosApi.put(`/todos/${id}`, data),
  delete: (id: string) => axiosApi.delete(`/todos/${id}`),
};

export default api;
