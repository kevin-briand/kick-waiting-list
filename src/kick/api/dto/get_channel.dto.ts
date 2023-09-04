import { SlowModeDto } from './slow-mode.dto';
import { SubscribersModeDto } from './subscribers-mode.dto';
import { FollowersModeDto } from './followers-mode.dto';
import { EmotesModeDto } from './emote-mode.dto';
import { AdvancedBotProtectionDto } from './advanced-bot-protection.dto';

export type GetChannelDto = {
  id: number;
  slow_mode: SlowModeDto;
  subscribers_mode: SubscribersModeDto;
  followers_mode: FollowersModeDto;
  emotes_mode: EmotesModeDto;
  advanced_bot_protection: AdvancedBotProtectionDto;
  pinned_message: any;
};
