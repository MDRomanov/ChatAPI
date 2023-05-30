import { createContext } from 'react';
import { userInit } from './reducer';
import { Context } from './types';

const messageContextValue: Context = {
  userState: userInit,
  userDispatch: () => {},
};
const userContext = createContext(messageContextValue);
export default userContext;
