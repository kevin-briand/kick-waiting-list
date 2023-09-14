import { useTranslation } from 'react-i18next';
import React from 'react';
import styled from 'styled-components';
import ButtonTab from '../../components/button/ButtonTab';
import { Tabs } from './enum/tabs';
import CenteredFlexBox from './components/CenteredFlexBox';

type WaitingListPageHeaderProps = {
  currentTab: Tabs;
  changeTab: (tab: Tabs) => void;
};

const ButtonsBox = styled(CenteredFlexBox)`
  gap: 0;
`;

function WaitingListPageHeader({
  currentTab,
  changeTab,
}: WaitingListPageHeaderProps) {
  const { t } = useTranslation('translation');

  return (
    <ButtonsBox>
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
    </ButtonsBox>
  );
}

export default WaitingListPageHeader;
