import { faker } from '@faker-js/faker';
import { UserDto } from '../../../pages/waiting-list/components/list/dto/user.dto';

const UserDtoFixture = () => {
  return { username: faker.internet.userName() } as UserDto;
};

export default UserDtoFixture;
