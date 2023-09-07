import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketKick from '../../../kick/webSocket/web-socket-kick';
import { UserDto } from './list/dto/user.dto';
import { KickDataDto } from '../../../kick/webSocket/dto/kick-data.dto';
import UsersList from './list/UsersList';
import { AlertMessageContext } from '../../components/alert-message/AlertMessageContext';
import { AlertMessageDto } from '../../components/alert-message/dto/alert-message-dto';
import AlertType from '../../components/alert-message/dto/alert-type';
import { DataDto } from '../../../kick/webSocket/dto/data.dto';
import useAlertInfo from '../../hook/useAlertInfo';
import Container from '../../components/Container';
import LocalStorage from '../../utils/local-storage/local-storage';
import {
  BOTRIX_ID_KEY,
  CHAT_ID_KEY,
  ONLY_BOTRIX_KEY,
  SUBSCRIBE_KEY,
  UNSUBSCRIBE_KEY,
  USERNAME_PATTERN_KEY,
} from '../parameters/consts';
import useAlertError from '../../hook/useAlertError';
import { SenderDto } from '../../../kick/webSocket/dto/sender.dto';
import WaitingListHeader from './WaitingListHeader';

const CONNECTION_ESTABLISHED = 'connection_established';
const SUBSCRIPTION_SUCCEEDED = 'subscription_succeeded';

const localStorage = new LocalStorage();
function WaitingList() {
  const CHANNEL_ID = useMemo(
    () => Number.parseInt(localStorage.get(CHAT_ID_KEY), 10),
    []
  );
  const MESSAGE_SUBSCRIBE = useMemo(
    () => localStorage.get(SUBSCRIBE_KEY).split(';'),
    []
  );
  const MESSAGE_UNSUBSCRIBE = useMemo(
    () => localStorage.get(UNSUBSCRIBE_KEY).split(';'),
    []
  );
  const ONLY_BOTRIX_CAN_SUBSCRIBE = useMemo(
    () => Boolean(localStorage.get(ONLY_BOTRIX_KEY)),
    []
  );
  const USERNAME_PATTERN = useMemo(
    () => new RegExp(localStorage.get(USERNAME_PATTERN_KEY)),
    []
  );
  const BOTRIX_ID = useMemo(
    () => Number.parseInt(localStorage.get(BOTRIX_ID_KEY), 10),
    []
  );
  const navigate = useNavigate();
  const setAlertError = useAlertError();

  if (!CHANNEL_ID) {
    setAlertError('error.channelId');
    navigate('/parameters');
  }

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

  const deleteUser = useCallback((user: UserDto) => {
    setUsersList((prevState) => {
      return prevState.filter((u) => u.username !== user.username);
    });
  }, []);

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

  const handleSubscribeMessage = useCallback(
    (data: DataDto) => {
      if (ONLY_BOTRIX_CAN_SUBSCRIBE && data.sender.id !== BOTRIX_ID) {
        return;
      }
      let user = data.sender;
      if (ONLY_BOTRIX_CAN_SUBSCRIBE) {
        const username = data.content.match(USERNAME_PATTERN);
        if (!username || username[1] === '') {
          return;
        }
        user = { username: username[1] } as SenderDto;
      }
      setNewUser(user);
    },
    [BOTRIX_ID, ONLY_BOTRIX_CAN_SUBSCRIBE, USERNAME_PATTERN]
  );

  const handleChatMessage = useCallback(
    (data: KickDataDto) => {
      if (
        MESSAGE_SUBSCRIBE.some((value) =>
          data.data.content.includes(value.trim())
        )
      ) {
        handleSubscribeMessage(data.data);
      } else if (
        MESSAGE_UNSUBSCRIBE.some((value) =>
          data.data.content.includes(value.trim())
        )
      ) {
        deleteUser(data.data.sender);
      }
    },
    [MESSAGE_SUBSCRIBE, MESSAGE_UNSUBSCRIBE, deleteUser, handleSubscribeMessage]
  );

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
  }, [CHANNEL_ID, handleMessage, setAlertMessage]);

  return (
    <Container>
      <WaitingListHeader handleClear={() => setUsersList([])} />
      <UsersList users={usersList} handleDelete={deleteUser} />
    </Container>
  );
}

export default WaitingList;
