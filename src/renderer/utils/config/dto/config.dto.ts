export type ConfigDto = {
  language: string;
  username: string;
  chatId: number;
  subscribe: string[];
  unsubscribe: string[];
  onlyBotrix: boolean;
  usernamePattern: RegExp;
  botrixId: number;
};
