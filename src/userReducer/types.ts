export type Action =
  | { type: 'ADD_USERCHAT'; payload: UserChat }
  | { type: 'INIT_USERCHAT' }
  | { type: 'DELETE_USERCHAT' };

export type UserChat = string;
export type State = {
  userChatArr: UserChat[];
};

export type Context = {
  userState: State;
  userDispatch: React.Dispatch<Action>;
};
