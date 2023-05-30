export type Action =
  | { type: 'ADD_CHAT'; payload: Chat }
  | { type: 'INIT_CHAT' }
  | { type: 'DELETE_CHAT' };

export type Chat = string;
export type State = {
  chatArr: Chat[];
};

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
