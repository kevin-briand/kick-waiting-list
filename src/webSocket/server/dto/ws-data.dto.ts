import Clients from '../enum/clients';
import { WsUserListDto } from './ws-user-list.dto';
import { ConfigDto } from '../../../renderer/utils/config/dto/config.dto';

type WsDataDto = {
  sender: Clients;
  data: string | WsUserListDto | ConfigDto;
};

export default WsDataDto;
