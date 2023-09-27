import React, { useCallback, useEffect, useMemo } from 'react';
import { KickDataDto } from '../../../../../kick/webSocket/dto/kick-data.dto';
import UsersList from '../list/UsersList';
import { DataDto } from '../../../../../kick/webSocket/dto/data.dto';
import Config from '../../../../utils/config/config';
import WaitingListHeader from './WaitingListHeader';
import UserStatus from '../list/enum/user-status';
import badgeType from '../../../../../kick/webSocket/enum/badge-type';
import useUsersList from '../../../../hook/useUsersList';
import useKickWebSocket from '../../../../hook/useKickWebSocket';

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
  } = useUsersList();

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
      addUser({ username, status: UserStatus.WAIT });
    },
    [addUser, config.botrixId, config.onlyBotrix, config.usernamePattern]
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
