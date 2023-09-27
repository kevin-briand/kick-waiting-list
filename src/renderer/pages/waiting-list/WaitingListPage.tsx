import React, { useCallback, useEffect, useState } from 'react';
import Container from '../../components/Container';
import WaitingListPageHeader from './WaitingListPageHeader';
import RandomDrawList from './components/random-draw/RandomDrawList';
import WaitingList from './components/waiting-list/WaitingList';
import { Tabs } from './enum/tabs';
import { KickWebSocketProvider } from '../../provider/KickWebSocketProvider';
import useUsersList from '../../hook/useUsersList';
import useAppWebSocket from '../../hook/useAppWebSocket';

function WaitingListPage() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.WAITING_LIST);
  const { usersList } = useUsersList();
  const { data, sendMessage } = useAppWebSocket();

  const sendUsersList = useCallback(() => {
    sendMessage(usersList);
  }, [sendMessage, usersList]);

  const changeTab = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    sendUsersList();
  }, [data, sendUsersList, usersList]);

  const getListComponent = () => {
    if (selectedTab === Tabs.WAITING_LIST) {
      return (
        <KickWebSocketProvider>
          <WaitingList />
        </KickWebSocketProvider>
      );
    }
    return <RandomDrawList />;
  };

  return (
    <Container>
      <WaitingListPageHeader changeTab={changeTab} currentTab={selectedTab} />
      {getListComponent()}
    </Container>
  );
}

export default WaitingListPage;
