import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import useToast from '../hook/useToast';

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 25%;
`;

type InfoTextProps = {
  $show: boolean;
};

const InfoText = styled.div<InfoTextProps>`
  color: white;
  font-size: 2em;
  margin-left: 10px;
  padding-bottom: 5px;
  animation: ${(props) => (props.$show ? 'show' : 'hide')} 2s forwards;

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
`;

type FooterProps = {
  textInfo: string;
};

function Footer({ textInfo }: FooterProps) {
  const [infoText, setInfoText] = useState<string>(textInfo);
  const [showText, setShowText] = useState<boolean>(true);
  const { getNextTextInfo, textInfoList } = useToast();
  // eslint-disable-next-line no-undef
  const timerId = useRef<NodeJS.Timer>();

  const nextMessage = useCallback(() => {
    const message = getNextTextInfo();
    return message || textInfo;
  }, [getNextTextInfo, textInfo]);

  const showAndHideMessage = useCallback(() => {
    if (textInfoList.length === 0 && infoText === textInfo) {
      return;
    }
    if (showText) {
      setShowText(false);
      return;
    }
    const message = nextMessage();
    setInfoText(message);
  }, [infoText, nextMessage, showText, textInfo, textInfoList.length]);

  useEffect(() => {
    setShowText(true);
  }, [infoText]);

  useEffect(() => {
    // Start timer interval to flashes and go to the next message
    timerId.current = setInterval(showAndHideMessage, 2500);

    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [showAndHideMessage]);

  return (
    <StyledFooter>
      <InfoText $show={showText}>{infoText}</InfoText>
    </StyledFooter>
  );
}

export default Footer;
