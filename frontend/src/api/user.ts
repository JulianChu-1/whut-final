import { UserQueryType, UserType } from "@/types";
import request from "@/utils/request";
import qs from "qs";

export const setLogout = async () => {
  await request.get(`/logout`);
};

export const getUserList = (params?: UserQueryType) => {
  return request.get(`/users?${qs.stringify(params)}`);
};

export const getUserDetail = (id: string) => {
  return request.get(`/users/${id}`);
};

export const userDelete = (id: string) => {
  return request.delete(`/users/${id}`);
};

export const userAdd = (params: UserType) => {
  return request.post("/users", params);
};

export const userUpdate = (id: string, params: UserType) => {
  return request.put(`/users/${id}`, params);
};