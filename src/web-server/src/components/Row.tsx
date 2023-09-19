import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ButtonCancel from '../../../renderer/components/button/ButtonCancel';

const StyledRow = styled.li`
  display: flex;
  align-items: center;
  padding-left: 15px;
  height: 25%;
  border-bottom: 2px solid darkgray;
`;

const Username = styled.div`
  color: white;
  padding: 5px 5px;
  font-size: 2.5em;
`;

const ButtonDelete = styled(ButtonCancel)`
  border-radius: 0 3px 3px 0;
`;

export type listItemProps = {
  name: string;
  handleDelete?: (name: string) => void;
};

export function Row({ name, handleDelete }: listItemProps) {
  const { t } = useTranslation('translation');

  return (
    <StyledRow>
      <Username>{name}</Username>
      {handleDelete ? (
        <ButtonDelete onClick={() => handleDelete(name)}>
          {t('button.delete')}
        </ButtonDelete>
      ) : null}
    </StyledRow>
  );
}
