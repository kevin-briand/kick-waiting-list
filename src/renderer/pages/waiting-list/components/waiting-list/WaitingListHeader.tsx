import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ButtonCancel from '../../../../components/button/ButtonCancel';
import ConfirmModal from '../../../../components/modal/ConfirmModal';
import CenteredFlexBox from '../CenteredFlexBox';

type WaitingListHeaderProps = {
  handleClear: () => void;
};

function WaitingListHeader({ handleClear }: WaitingListHeaderProps) {
  const { t } = useTranslation('translation');
  const [open, setOpen] = useState(false);
  const handleClearList = () => {
    setOpen(!open);
  };

  const handleConfirmDialog = (accept: boolean) => {
    if (accept) {
      handleClear();
    }
    setOpen(false);
  };

  return (
    <CenteredFlexBox>
      <ButtonCancel onClick={handleClearList}>
        {t('button.clearList')}
      </ButtonCancel>
      <ConfirmModal
        title={t('confirm.clearList.title')}
        open={open}
        close={handleConfirmDialog}
        confirmMessage={t('confirm.clearList.content')}
      />
    </CenteredFlexBox>
  );
}

export default WaitingListHeader;
