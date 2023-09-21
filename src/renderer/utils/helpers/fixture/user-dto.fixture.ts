import { faker } from '@faker-js/faker';
import { UserDto } from '../../../pages/waiting-list/components/list/dto/user.dto';
import UserStatus from '../../../pages/waiting-list/components/list/enum/user-status';

const UserDtoFixture = () => {
  return {
    username: faker.internet.userName(),
    status: UserStatus.WAIT,
  } as UserDto;
};

export default UserDtoFixture;
