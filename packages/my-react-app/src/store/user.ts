import { createContext } from 'react';
import { ICreateContext } from '@/common/types/interface';

export const UserContext = createContext<ICreateContext>({
  store: '',
  dispatch: '',
});
