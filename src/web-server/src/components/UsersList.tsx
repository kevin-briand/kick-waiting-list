import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Row } from './Row';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';
import Live from './Live';
import UserStatus from '../../../renderer/pages/waiting-list/components/list/enum/user-status';
import Next from './Next';

type StyledListProps = {
  $show: boolean;
};

const StyledList = styled.ul<StyledListProps>`
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  transition: transform 30s linear;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2.5rem;
`;

type ListProps = {
  users: UserDto[];
};

function UsersList({ users }: ListProps) {
  const SCROLL_INCREMENT = 1;
  const TIME_BEFORE_SCROLL_IN_SECONDS = 5;
  const TIME_BEFORE_SHOW_LIST_IN_SECONDS = 1.5;
  const [showList, setShowList] = useState<boolean>(true);
  const { t } = useTranslation('translation');
  const usersList = useRef<HTMLUListElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const animationFrameId = useRef<number>();
  const scrollY = useRef<number>(0);

  const statusPrefix = (user: UserDto) => {
    if (user.status === UserStatus.LIVE) {
      return <Live />;
    }
    return <Next />;
  };

  // Hide the list, scroll to top and show
  const resetListPos = () => {
    const list = usersList.current;
    if (!list) {
      return () => {};
    }

    // reset position
    setIsScrolling(false);
    list.scrollTop = 0;
    scrollY.current = 0;

    setShowList(true);
    // wait end show animation
    const timer = setTimeout(() => {
      setIsScrolling(true);
    }, TIME_BEFORE_SCROLL_IN_SECONDS * 1000);

    return () => clearTimeout(timer);
  };

  // scroll the list to the bottom
  const scrollToBottom = useCallback(() => {
    const scrollElement = usersList.current;
    if (!scrollElement) {
      return;
    }

    const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
    if (maxScroll === 0) {
      return;
    }
    // when we are at the end of the list
    if (scrollY.current >= maxScroll) {
      setShowList(false);
      setTimeout(() => {
        resetListPos();
      }, TIME_BEFORE_SHOW_LIST_IN_SECONDS * 1000);
      return;
    }

    scrollY.current += SCROLL_INCREMENT;
    scrollElement.scrollTop = scrollY.current;
    animationFrameId.current = requestAnimationFrame(scrollToBottom);
  }, []);

  // start scroll animation
  useEffect(() => {
    if (isScrolling) {
      animationFrameId.current = requestAnimationFrame(scrollToBottom);
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isScrolling, scrollToBottom]);

  // reset list pos if users change
  useEffect(() => {
    resetListPos();
  }, [users]);

  return (
    <StyledList $show={showList} ref={usersList}>
      {users.map((user) => (
        <Row
          key={user.username}
          name={user.username ?? ''}
          statusPrefix={statusPrefix(user)}
        />
      ))}
      {users.length === 0 ? <EmptyList>{t('emptyList')}</EmptyList> : null}
    </StyledList>
  );
}

export default UsersList;
