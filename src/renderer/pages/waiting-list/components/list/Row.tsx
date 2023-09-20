import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ButtonCancel from '../../../../components/button/ButtonCancel';

const StyledRow = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 5px 5px;
  border-radius: 2px;
  box-shadow: 0 0 3px ${(props) => props.theme.colors.shadow};
`;

const Username = styled.div`
  color: ${(props) => props.theme.colors.text.dark};
  padding: 5px 5px;
  font-size: 1.2em;
  font-family: 'Open Sans', serif;
`;

const ButtonDelete = styled(ButtonCancel)`
  border-radius: 0 3px 3px 0;
`;

export type listItemProps = {
  name: string;
  handleDelete?: (name: string) => void;
  prefix?: string;
};

export function Row({ name, handleDelete, prefix }: listItemProps) {
  const { t } = useTranslation('translation');

  return (
    <StyledRow>
      <Username>
        {prefix}
        {name}
      </Username>
      {handleDelete ? (
        <ButtonDelete onClick={() => handleDelete(name)}>
          {t('button.delete')}
        </ButtonDelete>
      ) : null}
    </StyledRow>
  );
}
