import { ValueOf } from "next/dist/shared/lib/constants";

import { USER_ROLE, USER_SEX, USER_STATUS } from "./../constants/index";

export interface UserType {
  nickname: string;
  _id?: string;
  username: string;
  role: USER_ROLE;
  status: USER_STATUS;
  sex: USER_SEX;
}

export interface UserLoginType {
  username: string;
  password: string;
}

export interface UserQueryType {
  username?: string;
  status?: USER_STATUS;
  current?: number;
  pageSize?: number;
}

export interface UserFormProps {
  title: string;
  editData?: UserType;
}