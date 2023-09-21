import UserStatus from '../enum/user-status';

export type UserDto = {
  username: string | undefined;
  status: UserStatus;
};
