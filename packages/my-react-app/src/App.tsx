import { Suspense, useReducer } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router';
import { UserContext } from '@/store/user';
import { IUser, IReducerAction } from '@/common/types/interface';
import { UserStoreActionType } from '@/common/types/enum';

function App() {
  const myUserReducer = (state: IUser, action: IReducerAction): IUser => {
    const { type } = action;
    switch (type) {
      case UserStoreActionType.SetData:
        localStorage.setItem('userInfo', JSON.stringify({ ...state, ...action.params }));
        return { ...state, ...action.params };
      default:
        return state;
    }
  };
  const userStorage = localStorage.getItem('userInfo') || '';
  const initialUserState = userStorage ? JSON.parse(userStorage) : null;
  const [store, dispatch] = useReducer(myUserReducer, initialUserState);
  return (
    <UserContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Suspense fallback={<div> </div>}>
          <Switch>{renderRoutes(routes)}</Switch>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
