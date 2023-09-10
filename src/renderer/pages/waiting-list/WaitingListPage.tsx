import React, { useState } from 'react';
import styled from 'styled-components';
import { UserDto } from './components/list/dto/user.dto';
import Container from '../../components/Container';
import WaitingListPageHeader from './WaitingListPageHeader';
import RandomDrawList from './components/random-draw/RandomDrawList';
import WaitingList from './components/waiting-list/WaitingList';
import { Tabs } from './enum/tabs';

const FixedContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

// const testList: UserDto[] = [];
// for (let i = 0; i < 20; i += 1) {
//   testList.push({ username: `username${i}` });
// }
function WaitingListPage() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.WAITING_LIST);
  const [usersList, setUsersList] = useState<UserDto[]>([]);

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
      <FixedContainer>
        <WaitingListPageHeader changeTab={changeTab} currentTab={selectedTab} />
        {getListComponent()}
      </FixedContainer>
    </Container>
  );
}

export default WaitingListPage;
