import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { Row } from './Row';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';
import Live from './Live';
import UserStatus from '../../../renderer/pages/waiting-list/components/list/enum/user-status';
import Next from './Next';

type StyledListProps = {
  $show: boolean;
};

const StyledList = styled.ul<StyledListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  animation: ${(props) => (props.$show ? 'show' : 'hide')} 1s forwards;

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const EmptyList = styled.div`
  align-self: center;
  vertical-align: middle;
  margin: auto;
  color: white;
  font-size: 2.5rem;
`;

type ListProps = {
  users: UserDto[];
};

function UsersList({ users }: ListProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showList, setShowList] = useState<boolean>(true);
  const { t } = useTranslation('translation');

  const statusPrefix = (user: UserDto) => {
    if (user.status === UserStatus.LIVE) {
      return <Live />;
    }
    return <Next />;
  };

  const getNextUsers = () => {
    const nextUsers = users.slice(currentIndex, currentIndex + 4);

    return nextUsers.map((user) => {
      return (
        <Row
          key={user.username}
          name={user.username ?? ''}
          statusPrefix={statusPrefix(user)}
        />
      );
    });
  };

  const hideDisplayList = useCallback(() => {
    if (users.length === 0 || (users.length < 5 && currentIndex === 0)) {
      return;
    }
    if (showList) {
      setShowList(false);
      return;
    }
    setCurrentIndex((prevState) =>
      prevState + 4 < users.length ? prevState + 4 : 0
    );
  }, [currentIndex, showList, users.length]);

  useEffect(() => {
    if (users.length < 5 && currentIndex > 0) {
      setCurrentIndex(0);
    }
    // Start timer to move the next page
    const timerId = setTimeout(hideDisplayList, showList ? 10000 : 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [currentIndex, hideDisplayList, showList, users]);

  useEffect(() => {
    setShowList(true);
  }, [currentIndex]);

  return (
    <StyledList $show={showList}>
      {getNextUsers()}
      {users.length === 0 ? <EmptyList>{t('emptyList')}</EmptyList> : null}
    </StyledList>
  );
}

export default UsersList;
