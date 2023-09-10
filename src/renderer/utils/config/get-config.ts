import { ConfigDto } from './dto/config.dto';
import LocalStorage from '../local-storage/local-storage';
import {
  BOTRIX_ID_KEY,
  CHAT_ID_KEY,
  LANGUAGE_KEY,
  ONLY_BOTRIX_KEY,
  SUBSCRIBE_KEY,
  UNSUBSCRIBE_KEY,
  USERNAME_KEY,
  USERNAME_PATTERN_KEY,
} from '../../pages/parameters/consts';

const localStorage = new LocalStorage();

const getConfig = (): ConfigDto => {
  return {
    botrixId: Number.parseInt(localStorage.get(BOTRIX_ID_KEY), 10),
    chatId: Number.parseInt(localStorage.get(CHAT_ID_KEY), 10),
    language: localStorage.get(LANGUAGE_KEY),
    onlyBotrix: Boolean(localStorage.get(ONLY_BOTRIX_KEY)),
    subscribe: localStorage.get(SUBSCRIBE_KEY).split(';'),
    unsubscribe: localStorage.get(UNSUBSCRIBE_KEY).split(';'),
    username: localStorage.get(USERNAME_KEY),
    usernamePattern: new RegExp(localStorage.get(USERNAME_PATTERN_KEY)),
  };
};

export default getConfig;
