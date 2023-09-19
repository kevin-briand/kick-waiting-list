import Clients from '../enum/clients';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';

type WsDataDto = {
  sender: Clients;
  data: string | UserDto[];
};

export default WsDataDto;
