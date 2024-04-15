import { UserLoginType, UserQueryType, UserType } from "@/types";
import request from "@/utils/request";
import qs from "qs";

export async function login(params: Pick<UserLoginType, "username" | "password">) {
  return request.post("/api/login", params);
}

export const setLogout = async () => {
  await request.get(`/api/logout`);
};

export const getUserList = (params?: UserQueryType) => {
  return request.get(`/api/users?${qs.stringify(params)}`);
};

export const getUserDetail = (id: string) => {
  return request.get(`/api/users/${id}`);
};

export const userDelete = (id: string) => {
  return request.delete(`/api/users/${id}`);
};

export const userAdd = (params: UserType) => {
  return request.post("/api/users", params);
};

export const userUpdate = (id: string, params: UserType) => {
  return request.put(`/api/users/${id}`, params);
};