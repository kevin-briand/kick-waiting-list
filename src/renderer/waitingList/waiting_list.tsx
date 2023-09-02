import { WebSocketKick } from '../../kick/webSocket/webSocket-kick';
import { useEffect, useState } from 'react';
import { UserDto } from './list/dto/user.dto';
import { KickDataDto } from '../../kick/dto/kickData.dto';
import { List } from './list/list';

//TODO move to localStorage
const CHANNEL_ID = 3909359 //found by call API
const MESSAGE_SUBSCRIBE_PATTERN = 'Ton ticket est acheté';
const MESSAGE_UNSUBSCRIBE = '!partir';
const ONLY_BOTRIX_CAN_SUBSCRIBE = false;
//
const USERNAME_PATTERN = /@(\w+)/
const BOTRIX_ID = 1160406

export const WaitingList = () => {

  let ws: WebSocketKick;
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [lastMessage, setLastMessage] = useState<UserDto | undefined>(undefined);

  const handleMessage = (data: KickDataDto) => {
    if (data.data.content.includes(MESSAGE_SUBSCRIBE_PATTERN)) {
      if (ONLY_BOTRIX_CAN_SUBSCRIBE && data.data.sender.id !== BOTRIX_ID) {
        return;
      }
      const username = data.data.content.match(USERNAME_PATTERN);
      if (!username || username[1] === '') {
        return;
      }
      const user = data.data.sender.id === BOTRIX_ID
        ? {username: username[1]}
        : data.data.sender;
      setLastMessage(user)
    }
    else if (data.data.content.includes(MESSAGE_UNSUBSCRIBE)) {
      deleteUser(data.data.sender)
    }
  }

  const addUser = (user: UserDto) => {
    if (!usersList.some((u) => u.username === user.username)) {
      setUsersList((prevState) => [...prevState, user]);
    }
  }

  const deleteUser = (user: UserDto) => {
    setUsersList(prevState => prevState.filter((u) => u.username !== user.username));
  }

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    addUser(lastMessage);
    setLastMessage(undefined)
  }, [lastMessage]);

  useEffect(() => {
    ws = new WebSocketKick(CHANNEL_ID, handleMessage);

    return () => {
      ws.close();
    };
  }, [])

  return (<List users={usersList} handleDelete={deleteUser}/>);
}
