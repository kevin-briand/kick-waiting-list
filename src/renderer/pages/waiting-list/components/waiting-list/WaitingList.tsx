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
import Config from '../../../../utils/config/config';
import LocalStorage from '../../../../utils/local-storage/local-storage';
import useWebSocket from '../../../../hook/useWebSocket';
import WaitingListHeader from './WaitingListHeader';
import UserDtoFixture from '../../../../utils/helpers/fixture/user-dto.fixture';
import UserStatus from '../list/enum/user-status';
import useAlertError from '../../../../hook/useAlertError';
import badgeType from '../../../../../kick/webSocket/enum/badge-type';

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
  const setAlertError = useAlertError();
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
      if (
        (config.onlyBotrix && data.sender.id !== config.botrixId) ||
        (!config.onlyBotrix && data.sender.id === config.botrixId)
      ) {
        return;
      }
      let { username } = data.sender;
      if (config.onlyBotrix) {
        const result = data.content.match(config.usernamePattern);
        if (!result || result[1] === '') {
          return;
        }
        [, username] = result;
      }
      setNewUser({ username, status: UserStatus.WAIT });
    },
    [config]
  );

  const handleModeratorCommands = useCallback(
    (data: DataDto) => {
      const moderatorLevelBagdeType = [
        badgeType.MODERATOR,
        badgeType.BROADCASTER,
      ];
      if (
        !data.sender.identity.badges.some((badge) =>
          moderatorLevelBagdeType.includes(badge.type)
        )
      ) {
        return;
      }
      if (data.content.includes(config.removePlayerCommand.trim())) {
        const player = data.content.match(config.usernamePattern);
        if (!player || player[1] === '') {
          return;
        }
        deleteUser(player[1]);
      } else if (data.content.includes(config.clearListCommand.trim())) {
        setUsersList([]);
      }
    },
    [config, deleteUser, setUsersList]
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
      } else if (config.moderatorCommands) {
        handleModeratorCommands(data.data);
      }
    },
    [config, deleteUser, handleModeratorCommands, handleSubscribeMessage]
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

  const handleNextViewers = useCallback(() => {
    const filteredUsersList = usersListRef.current.filter(
      (user) => user.status !== UserStatus.LIVE
    );
    const updatedUsersList = filteredUsersList.map((user, index) => {
      if (index < config.viewersLive) {
        return { username: user.username, status: UserStatus.LIVE };
      }
      return user;
    });
    setUsersList(updatedUsersList);
  }, [config.viewersLive, setUsersList]);

  const handleUserGoingLive = useCallback(
    (user: UserDto) => {
      if (user.status === UserStatus.LIVE) {
        return;
      }
      if (
        usersListRef.current.filter(
          (currentUser) => currentUser.status === UserStatus.LIVE
        ).length >= config.viewersLive
      ) {
        setAlertError('error.liveFull', { nb: config.viewersLive });
        return;
      }
      const updatedUser = {
        username: user.username,
        status: UserStatus.LIVE,
      };
      const updatedUsersList = usersListRef.current.map((currentUser) => {
        if (currentUser.username === user.username) {
          return updatedUser;
        }
        return currentUser;
      });
      const finalList = updatedUsersList.sort(
        (userA, userB) => userB.status - userA.status
      );
      setUsersList(finalList);
    },
    [config.viewersLive, setAlertError, setUsersList]
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
        handleNextViewers={handleNextViewers}
      />
      <UsersList
        users={usersList}
        handleDelete={deleteUser}
        handleLive={handleUserGoingLive}
      />
    </>
  );
}

export default WaitingList;
