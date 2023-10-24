import { ConfigDto } from './dto/config.dto';
import LocalStorage from '../local-storage/local-storage';
import {
  BOTRIX_ID_KEY,
  CHAT_ID_KEY,
  CLEAR_LIST_COMMAND_KEY,
  LANGUAGE_KEY,
  LIST_ON_STARTUP_KEY,
  LIVE_COMMAND_KEY,
  MODERATOR_COMMANDS_KEY,
  NEXT_LIVE_COMMAND_KEY,
  ONLY_BOTRIX_KEY,
  REMOVE_PLAYER_COMMAND_KEY,
  SUBSCRIBE_KEY,
  TEXT_INFO_KEY,
  UNSUBSCRIBE_KEY,
  USERNAME_KEY,
  USERNAME_PATTERN_KEY,
  VIEWERS_LIVE_KEY,
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
      viewersLive: Number.parseInt(this.localStorage.get(VIEWERS_LIVE_KEY), 10),
      moderatorCommands: Boolean(this.localStorage.get(MODERATOR_COMMANDS_KEY)),
      removePlayerCommand: this.localStorage.get(REMOVE_PLAYER_COMMAND_KEY),
      clearListCommand: this.localStorage.get(CLEAR_LIST_COMMAND_KEY),
      liveCommand: this.localStorage.get(LIVE_COMMAND_KEY),
      nextLiveCommand: this.localStorage.get(NEXT_LIVE_COMMAND_KEY),
      stateListOnStartup: this.localStorage.get(LIST_ON_STARTUP_KEY) === '1',
    };
  };

  static isConfigDto = (data: any): data is ConfigDto => {
    return Object.keys(data).includes('language');
  };
}

export default Config;
