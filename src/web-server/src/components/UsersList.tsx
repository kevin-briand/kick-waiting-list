import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Row } from './Row';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';
import Live from './Live';
import UserStatus from '../../../renderer/pages/waiting-list/components/list/enum/user-status';

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
};

function UsersList({ users }: ListProps) {
  const { t } = useTranslation('translation');

  const statusPrefix = (user: UserDto) => {
    if (user.status === UserStatus.LIVE) {
      return <Live />;
    }
    return undefined;
  };

  return (
    <StyledList>
      {users.map((user, index) => {
        return index < 4 ? (
          <Row
            key={user.username}
            name={user.username ?? ''}
            statusPrefix={statusPrefix(user)}
          />
        ) : null;
      })}
      {users.length === 0 ? <EmptyList>{t('emptyList')}</EmptyList> : null}
    </StyledList>
  );
}

export default UsersList;
