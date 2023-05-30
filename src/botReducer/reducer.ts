import { Action, State } from './types';

export const init: State = {
  chatArr: [],
};

export const botInitializer = (initValue = init) : State =>
  JSON.parse(localStorage.getItem('localBotChat')!) || initValue;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_CHAT':
      return {
        ...state,
        chatArr: [...state.chatArr, action.payload],
      };
    case 'INIT_CHAT':
      return {
        ...state,
        chatArr: state.chatArr,
      };
    case 'DELETE_CHAT':
      return init;
  }

  return state;
};
