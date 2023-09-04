import ApiKick from './api-kick';
import { GetChannelDto } from './dto/get_channel.dto';

async function getChannelInfo(username: string): Promise<GetChannelDto> {
  const api = new ApiKick();
  const data = await api.get<GetChannelDto>(`channels/${username}/chatroom`);
  return data.data;
}

export default getChannelInfo;
