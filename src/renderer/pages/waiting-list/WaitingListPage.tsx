import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserDto } from './components/list/dto/user.dto';
import Container from '../../components/Container';
import WaitingListPageHeader from './WaitingListPageHeader';
import RandomDrawList from './components/random-draw/RandomDrawList';
import WaitingList, {
  USERS_LIST_KEY,
} from './components/waiting-list/WaitingList';
import { Tabs } from './enum/tabs';
import LocalStorage from '../../utils/local-storage/local-storage';
import useAppWebSocket from '../../hook/useAppWebSocket';
import AppWebSocket from '../../../webSocket/app-web-socket';
import WsDataDto from '../../../webSocket/server/dto/ws-data.dto';
import Config from '../../utils/config/config';

function WaitingListPage() {
  const localStorage = useMemo(() => new LocalStorage(), []);
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.WAITING_LIST);
  const [usersList, setUsersList] = useState<UserDto[]>([]);
  const usersListRef = useRef(usersList);
  const [wsOpen, setWsOpen] = useState<boolean>(false);
  let wsClient = useRef<AppWebSocket>(null);

  const sendUsersList = () => {
    wsClient.current?.sendData(usersListRef.current);
  };

  const sendConfig = useCallback(() => {
    wsClient.current?.sendData(new Config().getConfig());
    sendUsersList();
  }, []);

  const receiptWSMessage = useCallback(
    (data: WsDataDto) => {
      if (data.data === '') {
        sendConfig();
      }
    },
    [sendConfig]
  );

  const onOpen = useCallback(() => {
    setWsOpen(true);
    sendConfig();
  }, [sendConfig]);

  wsClient = useAppWebSocket(receiptWSMessage, onOpen);

  const changeTab = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    usersListRef.current = usersList;
  }, [usersList]);

  useEffect(() => {
    localStorage.set(USERS_LIST_KEY, JSON.stringify(usersList));
    if (!wsOpen || !wsClient.current) return;
    sendUsersList();
  }, [localStorage, usersList, wsClient, wsOpen]);

  const getListComponent = () => {
    if (selectedTab === Tabs.WAITING_LIST) {
      return <WaitingList usersList={usersList} setUsersList={setUsersList} />;
    }
    return <RandomDrawList usersList={usersList} />;
  };

  return (
    <Container>
      <WaitingListPageHeader changeTab={changeTab} currentTab={selectedTab} />
      {getListComponent()}
    </Container>
  );
}

export default WaitingListPage;
