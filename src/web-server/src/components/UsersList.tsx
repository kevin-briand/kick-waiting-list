import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Row } from './Row';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const EmptyList = styled.div`
  align-self: center;
  vertical-align: middle;
  margin: auto;
  color: white;
  font-size: 2.5em;
`;

type ListProps = {
  users: UserDto[];
  handleDelete?: (username: string) => void;
};

function UsersList({ users, handleDelete }: ListProps) {
  const { t } = useTranslation('translation');
  return (
    <StyledList>
      {users.map((user, index) => {
        return index < 4 ? (
          <Row
            key={user.username}
            name={user.username ?? ''}
            handleDelete={handleDelete}
          />
        ) : null;
      })}
      {users.length === 0 ? <EmptyList>{t('emptyList')}</EmptyList> : null}
    </StyledList>
  );
}

export default UsersList;
