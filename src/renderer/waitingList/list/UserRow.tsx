import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UserDto } from './dto/user.dto';

const Row = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
  border-radius: 2px;
  box-shadow: 0 0 3px black;
`;

const Username = styled.div`
  padding: 5px 5px;
`;

const DeleteButton = styled.button`
  border: none;
  padding: 3px 20px;
  background-color: #e33;
  color: white;
  border-radius: 0 3px 3px 0;
  &:hover {
    box-shadow: 0 0 2px black;
  }
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
      <DeleteButton onClick={() => handleDelete(user)}>
        {t('button.delete')}
      </DeleteButton>
    </Row>
  );
}
