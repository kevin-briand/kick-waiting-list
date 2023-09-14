import React, { useState } from 'react';
import { UserDto } from './components/list/dto/user.dto';
import Container from '../../components/Container';
import WaitingListPageHeader from './WaitingListPageHeader';
import RandomDrawList from './components/random-draw/RandomDrawList';
import WaitingList from './components/waiting-list/WaitingList';
import { Tabs } from './enum/tabs';

const testList: UserDto[] = [];
// for (let i = 0; i < 50; i += 1) {
//   testList.push({ username: `username${i}` });
// }
function WaitingListPage() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.WAITING_LIST);
  const [usersList, setUsersList] = useState<UserDto[]>(testList);

  const changeTab = (tab: Tabs) => {
    setSelectedTab(tab);
  };

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
