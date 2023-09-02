import { useCallback, useEffect, useRef, useState } from 'react';
import WebSocketKick from '../../kick/webSocket/webSocket-kick';
import { UserDto } from './list/dto/user.dto';
import { KickDataDto } from '../../kick/dto/kickData.dto';
import List from './list/list';

// TODO move to localStorage
const CHANNEL_ID = 3909359; // found by call API
const MESSAGE_SUBSCRIBE_PATTERN = 'Ton ticket est acheté';
const MESSAGE_UNSUBSCRIBE = '!partir';
const ONLY_BOTRIX_CAN_SUBSCRIBE = true;
//
const USERNAME_PATTERN = /@(\w+)/;
const BOTRIX_ID = 1160406;

function WaitingList() {
  const wsRef = useRef<WebSocketKick | null>(null);
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [lastMessage, setLastMessage] = useState<UserDto | undefined>(
    undefined
  );

  const addUser = useCallback(
    (user: UserDto) => {
      if (!usersList.some((u) => u.username === user.username)) {
        setUsersList((prevState) => [...prevState, user]);
      }
    },
    [usersList]
  );

  const deleteUser = (user: UserDto) => {
    setUsersList((prevState) =>
      prevState.filter((u) => u.username !== user.username)
    );
  };

  const handleMessage = useCallback((data: KickDataDto) => {
    if (data.data.content.includes(MESSAGE_SUBSCRIBE_PATTERN)) {
      if (ONLY_BOTRIX_CAN_SUBSCRIBE && data.data.sender.id !== BOTRIX_ID) {
        return;
      }
      const username = data.data.content.match(USERNAME_PATTERN);
      if (!username || username[1] === '') {
        return;
      }
      const user =
        data.data.sender.id === BOTRIX_ID
          ? { username: username[1] }
          : data.data.sender;
      setLastMessage(user);
    } else if (data.data.content.includes(MESSAGE_UNSUBSCRIBE)) {
      deleteUser(data.data.sender);
    }
  }, []);

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    addUser(lastMessage);
    setLastMessage(undefined);
  }, [addUser, lastMessage]);

  useEffect(() => {
    wsRef.current = new WebSocketKick(CHANNEL_ID, handleMessage);

    return () => {
      wsRef.current?.close();
    };
  }, [handleMessage]);

  return <List users={usersList} handleDelete={deleteUser} />;
}

export default WaitingList;
