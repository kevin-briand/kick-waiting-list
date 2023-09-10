import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UserDto } from './dto/user.dto';
import { Row } from './Row';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  width: 100%;
`;

const EmptyList = styled.div`
  text-align: center;
`;

type ListProps = {
  users: UserDto[];
  handleDelete?: (username: string) => void;
};

function UsersList({ users, handleDelete }: ListProps) {
  const { t } = useTranslation('translation');
  return (
    <StyledList>
      {users.map((user) => {
        return (
          <Row
            key={user.username}
            name={user.username ?? ''}
            handleDelete={handleDelete}
          />
        );
      })}
      {users.length === 0 ? <EmptyList>{t('emptyList')}</EmptyList> : null}
    </StyledList>
  );
}

export default UsersList;
