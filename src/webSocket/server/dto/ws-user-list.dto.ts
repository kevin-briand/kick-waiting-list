import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';

export type WsUserListDto = {
  isOpen: boolean;
  usersList: UserDto[];
};

export const isWsUserListDto = (data: {}): data is WsUserListDto => {
  return 'usersList' in data;
};
