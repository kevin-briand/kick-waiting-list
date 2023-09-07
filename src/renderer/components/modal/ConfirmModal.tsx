import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import ButtonSave from '../button/ButtonSave';
import ButtonCancel from '../button/ButtonCancel';

const ButtonBox = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: right;
  padding-right: 10px;
  gap: 10px;
`;

type ConfirmModalProps = {
  title?: string;
  confirmMessage: string;
  open: boolean;
  close: (accept: boolean) => void;
};

function ConfirmModal({
  title,
  open,
  close,
  confirmMessage,
}: ConfirmModalProps) {
  const { t } = useTranslation('translation');

  const decline = () => {
    close(false);
  };

  const accept = () => {
    close(true);
  };

  return (
    <Modal title={title} open={open} close={decline}>
      {confirmMessage}
      <ButtonBox>
        <ButtonSave onClick={accept}>{t('button.accept')}</ButtonSave>
        <ButtonCancel onClick={decline}>{t('button.decline')}</ButtonCancel>
      </ButtonBox>
    </Modal>
  );
}

export default ConfirmModal;
