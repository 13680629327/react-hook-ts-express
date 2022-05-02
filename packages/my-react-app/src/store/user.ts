import { createContext } from 'react';
import { IUser, IReducerAction } from '@/common/types/interface';
// import { UserStoreActionType } from '@/common/types/enum';

interface ICreateContext {
  store: IUser;
  dispatch: (params: IReducerAction) => void;
}
export const UserContext = createContext<ICreateContext>({
  store: {
    userName: '',
    sex: '',
    age: '',
    mobile: '',
    mailbox: '',
    password: ''
  },
  dispatch: () => {},
});
