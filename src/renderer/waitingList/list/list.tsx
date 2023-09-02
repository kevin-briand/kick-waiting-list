import styled from 'styled-components';
import { UserDto } from './dto/user.dto';
import { UserRow } from './UserRow';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

type ListProps = {
  users: UserDto[];
  handleDelete: (username: UserDto) => void;
};

function List({ users, handleDelete }: ListProps) {
  return (
    <StyledList>
      {users.map((user) => {
        return (
          <UserRow
            key={user.username}
            user={user}
            handleDelete={handleDelete}
          />
        );
      })}
    </StyledList>
  );
}

export default List;
