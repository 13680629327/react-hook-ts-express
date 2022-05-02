// 接口返回参数

import { UserStoreActionType } from "./enum";

// import { UserStoreActionType } from '@/common/types/enum';
export interface IRequest {
  code: number;
  data: any;
  success: boolean;
  message: string;
}

// 用户信息
export interface IUser {
  userName: string;
  sex: string;
  age: number | string;
  mobile: number | string;
  mailbox: string;
  password: string;
  [props: string]: any;
}

// reducer
export interface IReducerAction {
  type: UserStoreActionType;
  params?: any;
}

