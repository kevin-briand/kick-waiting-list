import { SenderDto } from './Sender.dto';

export type DataDto = {
  id: string
  chatroom_id: number
  content: string
  type: string
  created_at: string
  sender: SenderDto
}
