import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

const TextInfo = styled.div`
  animation: my-animation 10s linear infinite;
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
  users: number;
  textInfo: string;
};

function Footer({ users, textInfo }: FooterProps) {
  const [infoText, setInfoText] = useState<string>(textInfo);
  const usersRef = useRef(users);
  const { t } = useTranslation('translation');

  const timeOutCallback = useCallback(() => {
    const hiddenUsers = usersRef.current - 4;
    setInfoText((prevState) => {
      return !prevState.includes('+') && hiddenUsers > 0
        ? t('obs.user', { count: hiddenUsers })
        : textInfo;
    });
  }, [t, textInfo]);

  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  useEffect(() => {
    const timerId = setInterval(timeOutCallback, 10000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeOutCallback]);

  return (
    <StyledFooter>
      <ScrollContainer>
        <TextInfo>{infoText}</TextInfo>
      </ScrollContainer>
    </StyledFooter>
  );
}

export default Footer;
