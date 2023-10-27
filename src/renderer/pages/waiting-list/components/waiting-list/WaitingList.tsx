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
    acceptNewUser,
    toggleAcceptNewUser,
  } = useUsersList();

  const getUsernameFromMessage = useCallback(
    (message: string) => {
      const result = message.match(config.usernamePattern);
      return result && result[1] ? result[1] : undefined;
    },
    [config.usernamePattern]
  );

  // Add user to the list
  const handleSubscribeMessage = useCallback(
    (data: DataDto) => {
      // if the list is closed, abort
      if (!acceptNewUser) {
        return;
      }

      const { sender: user, content: message } = data;
      const { botrixId, onlyBotrix: onlyBotrixCanSubscribe } = config;

      // if only botrix can add user
      if (
        (onlyBotrixCanSubscribe && user.id !== botrixId) ||
        (!onlyBotrixCanSubscribe && user.id === botrixId)
      ) {
        return;
      }
      // get username in the message if only botrix or in the sender object
      const username = onlyBotrixCanSubscribe
        ? getUsernameFromMessage(message)
        : user.username;
      if (username) {
        addUser({ username, status: UserStatus.WAIT });
      }
    },
    [acceptNewUser, addUser, config, getUsernameFromMessage]
  );

  // Eval commands send by moderators
  const handleModeratorCommands = useCallback(
    (data: DataDto) => {
      const moderatorLevelBadgeType = [
        badgeType.MODERATOR,
        badgeType.BROADCASTER,
      ];
      const message = data.content;
      const removePlayerCommand = config.removePlayerCommand.trim();
      const clearListCommand = config.clearListCommand.trim();
      const liveCommand = config.liveCommand.trim();
      const nextLiveCommand = config.nextLiveCommand.trim();
      const openListCommand = config.openListCommand.trim();
      const closeListCommand = config.closeListCommand.trim();
      const userBadges = data.sender.identity.badges;

      // Test if the user is a moderator
      if (
        !userBadges.some((badge) =>
          moderatorLevelBadgeType.includes(badge.type)
        )
      ) {
        return;
      }
      // get username in the message
      const username = getUsernameFromMessage(message);

      if (message.includes(removePlayerCommand)) {
        if (!username) {
          return;
        }
        deleteUser(username);
      } else if (message.includes(clearListCommand)) {
        clearList();
      } else if (message.includes(liveCommand)) {
        if (!username) {
          return;
        }
        handleUserGoingLive({ username, status: UserStatus.WAIT });
      } else if (message.includes(nextLiveCommand)) {
        handleNextViewers();
      } else if (message.includes(openListCommand)) {
        if (!acceptNewUser) {
          toggleAcceptNewUser();
        }
      } else if (message.includes(closeListCommand)) {
        if (acceptNewUser) {
          toggleAcceptNewUser();
        }
      }
    },
    [
      acceptNewUser,
      clearList,
      config.clearListCommand,
      config.liveCommand,
      config.nextLiveCommand,
      config.removePlayerCommand,
      config.closeListCommand,
      config.openListCommand,
      deleteUser,
      toggleAcceptNewUser,
      getUsernameFromMessage,
      handleNextViewers,
      handleUserGoingLive,
    ]
  );

  const handleChatMessage = useCallback(
    (data: KickDataDto) => {
      const { sender: user, content: message } = data.data;

      if (config.subscribe.some((value) => message.includes(value.trim()))) {
        handleSubscribeMessage(data.data);
      } else if (
        config.unsubscribe.some((value) => message.includes(value.trim()))
      ) {
        deleteUser(user.username);
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
        acceptNewUser={acceptNewUser}
        toggleAcceptNewUser={toggleAcceptNewUser}
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
