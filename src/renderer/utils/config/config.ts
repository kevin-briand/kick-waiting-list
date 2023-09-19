import { ConfigDto } from './dto/config.dto';
import LocalStorage from '../local-storage/local-storage';
import {
  BOTRIX_ID_KEY,
  CHAT_ID_KEY,
  LANGUAGE_KEY,
  ONLY_BOTRIX_KEY,
  SUBSCRIBE_KEY,
  TEXT_INFO_KEY,
  UNSUBSCRIBE_KEY,
  USERNAME_KEY,
  USERNAME_PATTERN_KEY,
} from '../../pages/parameters/consts';

class Config {
  localStorage = new LocalStorage();

  getConfig = (): ConfigDto => {
    return {
      botrixId: Number.parseInt(this.localStorage.get(BOTRIX_ID_KEY), 10),
      chatId: Number.parseInt(this.localStorage.get(CHAT_ID_KEY), 10),
      language: this.localStorage.get(LANGUAGE_KEY),
      onlyBotrix: Boolean(this.localStorage.get(ONLY_BOTRIX_KEY)),
      subscribe: this.localStorage.get(SUBSCRIBE_KEY).split(';'),
      unsubscribe: this.localStorage.get(UNSUBSCRIBE_KEY).split(';'),
      username: this.localStorage.get(USERNAME_KEY),
      usernamePattern: new RegExp(this.localStorage.get(USERNAME_PATTERN_KEY)),
      textInfo: this.localStorage.get(TEXT_INFO_KEY),
    };
  };

  static isConfigDto = (data: any): data is ConfigDto => {
    return Object.keys(data).includes('language');
  };
}

export default Config;
