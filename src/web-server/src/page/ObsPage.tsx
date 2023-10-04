import React, { useCallback, useRef, useState } from 'react';
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

function ObsPage() {
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const [acceptNewUser, setAcceptNewUser] = useState<boolean>(false);
  const [textInfo, setTextInfo] = useState<string>('');
  let ws = useRef<AppWebSocket>(null);
  const { t } = useTranslation('translation');

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

  return (
    <Container>
      <UsersList users={usersList} />
      <Footer
        users={usersList.length}
        textInfo={acceptNewUser ? textInfo : t('obs.closedList')}
      />
    </Container>
  );
}

export default ObsPage;
