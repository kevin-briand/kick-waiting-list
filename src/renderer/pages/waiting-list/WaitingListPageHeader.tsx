import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import React from 'react';
import ButtonTab from '../../components/button/ButtonTab';
import { Tabs } from './enum/tabs';

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

type WaitingListPageHeaderProps = {
  currentTab: Tabs;
  changeTab: (tab: Tabs) => void;
};

function WaitingListPageHeader({
  currentTab,
  changeTab,
}: WaitingListPageHeaderProps) {
  const { t } = useTranslation('translation');

  return (
    <ButtonBox>
      <ButtonTab
        handleClick={() => changeTab(Tabs.WAITING_LIST)}
        selected={currentTab === Tabs.WAITING_LIST}
      >
        {t('button.waitingList')}
      </ButtonTab>
      <ButtonTab
        handleClick={() => changeTab(Tabs.RANDOM_DRAW_LIST)}
        selected={currentTab === Tabs.RANDOM_DRAW_LIST}
      >
        {t('button.randomDraw')}
      </ButtonTab>
    </ButtonBox>
  );
}

export default WaitingListPageHeader;
