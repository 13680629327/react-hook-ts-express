// 接口返回参数
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

// 员工信息
export interface IStaff {
  name: string;
  sex: number;
  phone?: string;
  perDiem: number;
  age?: number;
  project?: string;
  [props: string]: any;
}

// reducer
export interface IReducerAction {
  type: string;
  params?: any;
}

// createContext
export interface ICreateContext {
  store: any;
  dispatch: any;
}
