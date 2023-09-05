import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UserDto } from './dto/user.dto';
import ButtonCancel from '../../../components/button/ButtonCancel';

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 2px 5px;
  border-radius: 2px;
  box-shadow: 0 0 3px black;
`;

const Username = styled.div`
  padding: 5px 5px;
  font-size: 1.2em;
  font-family: 'Open Sans', serif;
`;

const ButtonDelete = styled(ButtonCancel)`
  border-radius: 0 3px 3px 0;
`;

export type listItemProps = {
  user: UserDto;
  handleDelete: (user: UserDto) => void;
};

export function UserRow({ user, handleDelete }: listItemProps) {
  const { t } = useTranslation('translation');

  return (
    <Row>
      <Username>{user.username}</Username>
      <ButtonDelete onClick={() => handleDelete(user)}>
        {t('button.delete')}
      </ButtonDelete>
    </Row>
  );
}
