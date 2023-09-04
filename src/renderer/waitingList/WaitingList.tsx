import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import WebSocketKick from '../../kick/webSocket/webSocket-kick';
import { UserDto } from './list/dto/user.dto';
import { KickDataDto } from '../../kick/dto/kickData.dto';
import UsersList from './list/UsersList';
import { AlertMessageContext } from '../components/alert-message/AlertMessageContext';
import { AlertMessageDto } from '../components/alert-message/dto/alert-message-dto';
import AlertType from '../components/alert-message/dto/alert-type';
import { DataDto } from '../../kick/dto/data.dto';
import useAlertInfo from '../hook/useAlertInfo';

// TODO move to localStorage
const CHANNEL_ID = 3909359; // found by call API
const MESSAGE_SUBSCRIBE_PATTERN = 'Ton ticket est acheté';
const MESSAGE_UNSUBSCRIBE = '!partir';
const ONLY_BOTRIX_CAN_SUBSCRIBE = true;
//
const USERNAME_PATTERN = /@(\w+)/;
const BOTRIX_ID = 1160406;
const CONNECTION_ESTABLISHED = 'connection_established';
const SUBSCRIPTION_SUCCEEDED = 'subscription_succeeded';

function WaitingList() {
  const { setAlertMessage } = useContext<AlertMessageDto>(AlertMessageContext);
  const setAlertInfo = useAlertInfo();
  const wsRef = useRef<WebSocketKick | null>(null);
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const usersListRef = useRef(usersList);
  const [newUser, setNewUser] = useState<UserDto | undefined>(undefined);

  const addUser = useCallback(
    (user: UserDto) => {
      if (!usersList.some((u) => u.username === user.username)) {
        setUsersList((prevState) => [...prevState, user]);
        setAlertInfo('user.added', user);
      }
    },
    [setAlertInfo, usersList]
  );

  const deleteUser = (user: UserDto) => {
    setUsersList((prevState) => {
      return prevState.filter((u) => u.username !== user.username);
    });
  };

  const handleWebSocketInfo = useCallback(
    (info: KickDataDto) => {
      if (info.event.includes(CONNECTION_ESTABLISHED)) {
        setAlertInfo('ws.connected');
      }
      if (info.event.includes(SUBSCRIPTION_SUCCEEDED)) {
        setAlertInfo('ws.subscribed');
      }
    },
    [setAlertInfo]
  );

  const handleSubscribeMessage = (data: DataDto) => {
    if (ONLY_BOTRIX_CAN_SUBSCRIBE && data.sender.id !== BOTRIX_ID) {
      return;
    }

    const username = data.content.match(USERNAME_PATTERN);
    if (!username || username[1] === '') {
      return;
    }

    const user =
      data.sender.id === BOTRIX_ID ? { username: username[1] } : data.sender;

    setNewUser(user);
  };

  const handleChatMessage = useCallback((data: KickDataDto) => {
    if (data.data.content.includes(MESSAGE_SUBSCRIBE_PATTERN)) {
      handleSubscribeMessage(data.data);
    } else if (data.data.content.includes(MESSAGE_UNSUBSCRIBE)) {
      deleteUser(data.data.sender);
    }
  }, []);

  const handleMessage = useCallback(
    (data: KickDataDto) => {
      if (data.data === undefined) {
        handleWebSocketInfo(data);
      } else {
        handleChatMessage(data);
      }
    },
    [handleChatMessage, handleWebSocketInfo]
  );

  useEffect(() => {
    if (!newUser) {
      return;
    }
    addUser(newUser);
    setNewUser(undefined);
  }, [addUser, newUser]);

  useEffect(() => {
    const previousUsers = usersListRef.current;

    if (previousUsers.length > usersList.length) {
      const deletedUser = previousUsers.find(
        (prevUser) =>
          !usersList.some(
            (currentUser) => currentUser.username === prevUser.username
          )
      );

      if (deletedUser) {
        setAlertInfo('user.deleted', deletedUser);
      }
    }

    if (previousUsers.length < usersList.length) {
      const addedUser = usersList.find(
        (currentUser) =>
          !previousUsers.some(
            (prevUser) => prevUser.username === currentUser.username
          )
      );

      if (addedUser) {
        setAlertInfo('user.added', addedUser);
      }
    }

    usersListRef.current = usersList;
  }, [usersList, setAlertInfo]);

  useEffect(() => {
    try {
      wsRef.current = new WebSocketKick(CHANNEL_ID, handleMessage);
    } catch (err) {
      if (err instanceof Error)
        setAlertMessage({ message: err.message, type: AlertType.ERROR });
    }
    return () => {
      wsRef.current?.close();
    };
  }, [handleMessage, setAlertMessage]);

  return <UsersList users={usersList} handleDelete={deleteUser} />;
}

export default WaitingList;
