import { useReducer } from "react";
import { BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import routes from "./router";
import { UserContext } from '@/store/user';
import { IUser, IReducerAction } from '@/common/types/interface';
import { UserStoreActionType } from "@/common/types/enum";

function App() {
  const userReducer = (state: IUser, action: IReducerAction) => {
    const { type } = action
    switch (type) {
      case UserStoreActionType.SetData:
        localStorage.setItem('userInfo', JSON.stringify({ ...state, ...action.params }))
        return { ...state, ...action.params }
      default:
        return state
    }
  }
  const userStorage = localStorage.getItem('userInfo') || '{}'
  const initialUserState = JSON.parse(userStorage)
  const [store, dispatch] = useReducer(userReducer, initialUserState)
  return (
    <UserContext.Provider value={{store, dispatch}}>
      <BrowserRouter>
        <Switch>
          { renderRoutes(routes) }
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
export default App; 
