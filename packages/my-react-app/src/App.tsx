import { useReducer } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './router';
import { IUser, IReducerAction } from '@/common/types/interface';
import { UserContext } from '@/store/user';

function App() {
  const userReducer = (state: IUser, action: IReducerAction) => {
    switch (action.type) {
      case 'updata':
        return { ...state, ...action.params };
      default:
        return state;
    }
  };
  const userStorage = localStorage.getItem('userInfo') || '{}';
  const initialUserState = JSON.parse(userStorage);
  const [store, dispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <Switch>{renderRoutes(routes)}</Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App;
