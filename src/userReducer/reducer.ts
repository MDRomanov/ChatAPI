import { Action, State } from './types';

export const userInit: State = {
  userChatArr: [],
};

export const initializer = (initialValue = userInit) : State =>
  JSON.parse(localStorage.getItem('localUserChat')!) || initialValue;

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_USERCHAT':
      return {
        ...state,
        userChatArr: [...state.userChatArr, action.payload],
      };
    case 'INIT_USERCHAT':
      return {
        ...state,
        userChatArr: state.userChatArr,
      };
    case 'DELETE_USERCHAT':
      return userInit;
  }

  return state;
};
