import { createContext } from 'react';
import { init } from './reducer';
import { Context } from './types';

const initialContextValue: Context = {
  state: init,
  dispatch: () => {},
};
const stateContext = createContext(initialContextValue);
export default stateContext;
