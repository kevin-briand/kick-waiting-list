import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ButtonCancel from '../../../../components/button/ButtonCancel';
import ConfirmModal from '../../../../components/modal/ConfirmModal';
import CenteredFlexBox from '../CenteredFlexBox';
import Button from '../../../../components/button/Button';

type WaitingListHeaderProps = {
  handleClear: () => void;
  handleFakeUser: () => void;
  handleNextViewers: () => void;
};

function WaitingListHeader({
  handleClear,
  handleFakeUser,
  handleNextViewers,
}: WaitingListHeaderProps) {
  const { t } = useTranslation('translation');
  const [openClearModal, setOpenClearModal] = useState(false);
  const [openFakeModal, setOpenFakeModal] = useState(false);
  const handleClearList = () => {
    setOpenClearModal(!openClearModal);
  };

  const handleConfirmClearListDialog = (accept: boolean) => {
    if (accept) {
      handleClear();
    }
    setOpenClearModal(false);
  };

  const handleFakeList = () => {
    setOpenFakeModal(!openFakeModal);
  };

  const handleConfirmFakeListDialog = (accept: boolean) => {
    if (accept) {
      handleFakeUser();
    }
    setOpenFakeModal(false);
  };

  return (
    <CenteredFlexBox>
      <ButtonCancel onClick={handleClearList}>
        {t('button.clearList')}
      </ButtonCancel>
      <ConfirmModal
        title={t('confirm.clearList.title')}
        open={openClearModal}
        close={handleConfirmClearListDialog}
        confirmMessage={t('confirm.clearList.content')}
      />
      <Button onClick={handleNextViewers}>{t('button.nextViewers')}</Button>
      <Button onClick={handleFakeList}>{t('button.fakeUser')}</Button>
      <ConfirmModal
        title={t('confirm.fakeList.title')}
        open={openFakeModal}
        close={handleConfirmFakeListDialog}
        confirmMessage={t('confirm.fakeList.content')}
      />
    </CenteredFlexBox>
  );
}

export default WaitingListHeader;
