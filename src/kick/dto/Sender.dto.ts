import { IdentityDto } from './identity.dto';

export type SenderDto = {
  id: number;
  username: string;
  slug: string;
  identity: IdentityDto;
};
