import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { UserDto } from './dto/user.dto';
import { Row } from './Row';
import UserStatus from './enum/user-status';
import ButtonCancel from '../../../../components/button/ButtonCancel';
import ButtonDisabled from '../../../../components/button/ButtonDisabled';

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
  handleLive?: (user: UserDto) => void;
  prefixNumber?: boolean;
};

function UsersList({
  users,
  handleDelete,
  handleLive,
  prefixNumber,
}: ListProps) {
  const { t } = useTranslation('translation');

  function addPrefix(user: UserDto, index: number) {
    if (prefixNumber) {
      return <span>{index + 1} - </span>;
    }
    if (user.status === UserStatus.LIVE) {
      return <ButtonCancel disabled>LIVE</ButtonCancel>;
    }
    return (
      <ButtonDisabled onClick={() => (handleLive ? handleLive(user) : null)}>
        LIVE
      </ButtonDisabled>
    );
  }

  return (
    <StyledList>
      {users.map((user, index) => {
        return (
          <Row
            prefix={addPrefix(user, index)}
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
