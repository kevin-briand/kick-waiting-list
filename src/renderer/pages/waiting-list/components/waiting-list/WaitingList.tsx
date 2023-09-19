import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserDto } from '../list/dto/user.dto';
import { KickDataDto } from '../../../../../kick/webSocket/dto/kick-data.dto';
import UsersList from '../list/UsersList';
import { DataDto } from '../../../../../kick/webSocket/dto/data.dto';
import useAlertInfo from '../../../../hook/useAlertInfo';
import { SenderDto } from '../../../../../kick/webSocket/dto/sender.dto';
import Config from '../../../../utils/config/config';
import LocalStorage from '../../../../utils/local-storage/local-storage';
import useWebSocket from '../../../../hook/useWebSocket';
import WaitingListHeader from './WaitingListHeader';
import UserDtoFixture from '../../../../utils/helpers/fixture/user-dto.fixture';

const CONNECTION_ESTABLISHED = 'connection_established';
const SUBSCRIPTION_SUCCEEDED = 'subscription_succeeded';

const localStorage = new LocalStorage();
export const USERS_LIST_KEY = 'usersList';

type WaitingListProps = {
  usersList: UserDto[];
  setUsersList: React.Dispatch<React.SetStateAction<UserDto[]>>;
};

function WaitingList({ usersList, setUsersList }: WaitingListProps) {
  const config = useMemo(() => new Config().getConfig(), []);

  const setAlertInfo = useAlertInfo();
  const usersListRef = useRef(usersList);
  const [newUser, setNewUser] = useState<UserDto | undefined>(undefined);

  const fakeUsersList = () => {
    const fakeUsers: UserDto[] = [];
    for (let i = 0; i < 50; i += 1) {
      fakeUsers.push(UserDtoFixture());
    }
    setUsersList(fakeUsers);
  };

  const addUser = useCallback(
    (user: UserDto) => {
      if (!usersList.some((u) => u.username === user.username)) {
        setUsersList((prevState) => [...prevState, user]);
        setAlertInfo('user.added', user);
      }
    },
    [setAlertInfo, setUsersList, usersList]
  );

  const deleteUser = useCallback(
    (user: string) => {
      setUsersList((prevState) => {
        return prevState.filter((u) => u.username !== user);
      });
    },
    [setUsersList]
  );

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
      if (config.onlyBotrix && data.sender.id !== config.botrixId) {
        return;
      }
      let user = data.sender;
      if (config.onlyBotrix) {
        const username = data.content.match(config.usernamePattern);
        if (!username || username[1] === '') {
          return;
        }
        user = { username: username[1] } as SenderDto;
      }
      setNewUser(user);
    },
    [config]
  );

  const handleChatMessage = useCallback(
    (data: KickDataDto) => {
      if (
        config.subscribe.some((value) =>
          data.data.content.includes(value.trim())
        )
      ) {
        handleSubscribeMessage(data.data);
      } else if (
        config.unsubscribe.some((value) =>
          data.data.content.includes(value.trim())
        )
      ) {
        deleteUser(data.data.sender.username);
      }
    },
    [config, deleteUser, handleSubscribeMessage]
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

  useWebSocket(config.chatId, handleMessage);

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
    if (localStorage.has(USERS_LIST_KEY)) {
      setUsersList(JSON.parse(localStorage.get(USERS_LIST_KEY)));
    }
  }, [config, setUsersList]);

  return (
    <>
      <WaitingListHeader
        handleClear={() => setUsersList([])}
        handleFakeUser={fakeUsersList}
      />
      <UsersList users={usersList} handleDelete={deleteUser} />
    </>
  );
}

export default WaitingList;
