import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { KickDataDto } from '../../../../../kick/webSocket/dto/kick-data.dto';
import UsersList from '../list/UsersList';
import { DataDto } from '../../../../../kick/webSocket/dto/data.dto';
import Config from '../../../../utils/config/config';
import WaitingListHeader from './WaitingListHeader';
import UserStatus from '../list/enum/user-status';
import badgeType from '../../../../../kick/webSocket/enum/badge-type';
import useUsersList from '../../../../hook/useUsersList';
import useKickWebSocket from '../../../../hook/useKickWebSocket';
import { YTA, YTAProps } from '../../../../components/yta';

export const USERS_LIST_KEY = 'usersList';

function WaitingList() {
  const config = useMemo(() => new Config().getConfig(), []);
  const {
    usersList,
    addUser,
    deleteUser,
    clearList,
    handleUserGoingLive,
    handleNextViewers,
    fakeUsersList,
    acceptNewUser,
    toggleAcceptNewUser,
  } = useUsersList();
  const [v, setV] = useState<YTAProps>({
    id: '',
    startSeconds: 0,
    durationSeconds: 0,
    play: 0,
  });
  // eslint-disable-next-line no-undef
  const timer = useRef<NodeJS.Timer>();

  const handleSubscribeMessage = useCallback(
    (data: DataDto) => {
      if (!acceptNewUser) {
        return;
      }
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
      addUser({ username, status: UserStatus.WAIT });
    },
    [
      acceptNewUser,
      addUser,
      config.botrixId,
      config.onlyBotrix,
      config.usernamePattern,
    ]
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
        clearList();
      }
    },
    [
      clearList,
      config.clearListCommand,
      config.removePlayerCommand,
      config.usernamePattern,
      deleteUser,
    ]
  );

  const startDelayed = (params: YTAProps) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(
      () => setV(params),
      Math.floor(Math.random() * 10) * 1000
    );
  };

  const specialCommands = useCallback((message: string) => {
    if (message.toLowerCase().includes('ory')) {
      startDelayed({
        id: 'jr5ytPy-6ns',
        startSeconds: 49,
        durationSeconds: 1,
        play: Date.now(),
      });
    } else if (message.toLowerCase().includes('wtf')) {
      startDelayed({
        id: 'lYdg-V33Qq4',
        startSeconds: 45,
        durationSeconds: 3,
        play: Date.now(),
      });
    } else if (message.toLowerCase().includes('mdr')) {
      startDelayed({
        id: 'ocKI1hs3B7k',
        startSeconds: 0,
        durationSeconds: 2,
        play: Date.now(),
      });
    }
  }, []);

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
      } else if ([18005469, 19485142].includes(data.data.sender.id)) {
        specialCommands(data.data.content);
      } else if (config.moderatorCommands) {
        handleModeratorCommands(data.data);
      }
    },
    [
      config.moderatorCommands,
      config.subscribe,
      config.unsubscribe,
      deleteUser,
      handleModeratorCommands,
      handleSubscribeMessage,
      specialCommands,
    ]
  );

  const { data, clearData } = useKickWebSocket();

  useEffect(() => {
    if (data) {
      handleChatMessage(data);
      clearData();
    }
  }, [clearData, data, handleChatMessage]);

  return (
    <>
      <WaitingListHeader
        handleClear={clearList}
        handleFakeUser={fakeUsersList}
        handleNextViewers={handleNextViewers}
        acceptNewUser={acceptNewUser}
        toggleAcceptNewUser={toggleAcceptNewUser}
      />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <YTA {...v} />
      <UsersList
        users={usersList}
        handleDelete={deleteUser}
        handleLive={handleUserGoingLive}
      />
    </>
  );
}

export default WaitingList;
