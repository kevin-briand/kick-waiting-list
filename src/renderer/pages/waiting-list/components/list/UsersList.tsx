import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UserDto } from './dto/user.dto';
import { Row } from './Row';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  width: 100%;
`;

const EmptyList = styled.div`
  text-align: center;
  color: ${(props) => props.theme.colors.text.dark};
`;

type ListProps = {
  users: UserDto[];
  handleDelete?: (username: string) => void;
  prefixNumber?: boolean;
};

function UsersList({ users, handleDelete, prefixNumber }: ListProps) {
  const { t } = useTranslation('translation');
  return (
    <StyledList>
      {users.map((user, index) => {
        return (
          <Row
            prefix={prefixNumber ? `${index + 1} - ` : undefined}
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
