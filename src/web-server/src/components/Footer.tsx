import styled from 'styled-components';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { UserDto } from '../../../renderer/pages/waiting-list/components/list/dto/user.dto';

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 20%;
`;

const ScrollContainer = styled.div`
  overflow: visible;
  flex-grow: 1;
`;

const InfoText = styled.div`
  animation: my-animation 7s linear infinite;
  white-space: nowrap;
  color: white;
  font-size: 2em;

  @keyframes my-animation {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
`;

type FooterProps = {
  users: UserDto[];
  textInfo: string;
};

function Footer({ users, textInfo }: FooterProps) {
  const [infoText, setInfoText] = useState<string>(textInfo);
  const [playersInfoList, setPlayersInfoList] = useState<string[]>([]);
  const usersRef = useRef(users);
  const { t } = useTranslation('translation');

  const nextMessage = useCallback(
    (lastMessage: string) => {
      const message = playersInfoList.shift();
      setPlayersInfoList((prevState) => {
        return prevState;
      });
      if (message) {
        return message;
      }
      const hiddenUsers = usersRef.current.length - 4;
      if (!lastMessage.includes('+') && hiddenUsers > 0) {
        return t('obs.user', { count: hiddenUsers });
      }
      return textInfo;
    },
    [playersInfoList, t, textInfo]
  );

  const timeOutCallback = useCallback(() => {
    setInfoText((prevState) => nextMessage(prevState));
  }, [nextMessage]);

  useLayoutEffect(() => {
    const lastUsersList = usersRef.current;

    // deleted users
    if (lastUsersList.length > users.length) {
      const filteredList = lastUsersList.filter(
        (user) => !users.some((u) => u.username === user.username)
      );
      const messagesList = filteredList.map((user) => {
        return t('user.deleted', { username: user.username });
      });
      setPlayersInfoList((prevState) => [...prevState, ...messagesList]);
    }
    // added users
    if (lastUsersList.length < users.length) {
      const filteredList = users.filter(
        (user) => !lastUsersList.some((u) => u.username === user.username)
      );
      const messagesList = filteredList.map((user) => {
        return t('user.added', { username: user.username });
      });
      setPlayersInfoList((prevState) => [...prevState, ...messagesList]);
    }

    usersRef.current = users;
  }, [t, users]);

  useEffect(() => {
    const timerId = setInterval(timeOutCallback, 7000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeOutCallback]);

  return (
    <StyledFooter>
      <ScrollContainer>
        <InfoText>{infoText}</InfoText>
      </ScrollContainer>
    </StyledFooter>
  );
}

export default Footer;
