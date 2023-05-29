export type Message = {
  uuid: string;
  id: string;
  cuid: string;
  text: string;
};

export type IdMessage = Message['cuid'];

export type State = {
  messagesArr: Message[];
  error: undefined | string;
};
