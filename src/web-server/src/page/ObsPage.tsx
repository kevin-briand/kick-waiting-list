import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import useAppWebSocket from '../hook/useAppWebSocket';
import UsersList from '../components/UsersList';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';
import Container from '../components/Container';
import Footer from '../components/Footer';
import WsDataDto from '../../../webSocket/server/dto/ws-data.dto';
import AppWebSocket from '../../../webSocket/app-web-socket';
import Config from '../../../renderer/utils/config/config';
import { ConfigDto } from '../../../renderer/utils/config/dto/config.dto';
import { isWsUserListDto } from '../../../webSocket/server/dto/ws-user-list.dto';
import useToast from '../hook/useToast';
import Header from '../components/Header';

function ObsPage() {
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const usersRef = useRef(usersList);
  const [acceptNewUser, setAcceptNewUser] = useState<boolean>(false);
  const [textInfo, setTextInfo] = useState<string>('');
  let ws = useRef<AppWebSocket>(null);
  const { t } = useTranslation('translation');
  const { addTextInfo } = useToast();

  const onOpen = useCallback(() => {
    ws.current?.sendData('');
  }, []);

  const updateConfig = (config: ConfigDto) => {
    setTextInfo(config.textInfo);
    i18n.changeLanguage(config.language);
  };

  const onMessage = useCallback((data: WsDataDto) => {
    if (Config.isConfigDto(data.data)) {
      updateConfig(data.data);
    } else if (isWsUserListDto(data.data)) {
      setUsersList(data.data.usersList);
      setAcceptNewUser(data.data.isOpen);
    }
  }, []);

  ws = useAppWebSocket(onMessage, onOpen);

  useLayoutEffect(() => {
    const lastUsersList = usersRef.current;

    // deleted users
    if (lastUsersList.length > usersList.length) {
      const filteredList = lastUsersList.filter(
        (user) => !usersList.some((u) => u.username === user.username)
      );
      filteredList.forEach((user) => {
        addTextInfo(t('user.deleted', { username: user.username }));
      });
    }
    // added users
    if (lastUsersList.length < usersList.length) {
      const filteredList = usersList.filter(
        (user) => !lastUsersList.some((u) => u.username === user.username)
      );
      filteredList.forEach((user) => {
        addTextInfo(t('user.added', { username: user.username }));
      });
    }

    usersRef.current = usersList;
  }, [addTextInfo, t, usersList]);

  return (
    <Container>
      <Header />
      <UsersList users={usersList} />
      <Footer textInfo={acceptNewUser ? textInfo : t('obs.closedList')} />
    </Container>
  );
}

export default ObsPage;
