import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

type StyledLiveProps = {
  $show: boolean;
};

const StyledLive = styled.span<StyledLiveProps>`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 1.9em;
  color: white;
  height: 100%;
  ${(props) =>
    props.$show
      ? 'animation: show 2s forwards;'
      : 'animation: hide 2s forwards;'};

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

function Live() {
  const [showText, setShowText] = useState<boolean>(true);
  // eslint-disable-next-line no-undef
  const timerId = useRef<NodeJS.Timer>();

  const startAnimation = () => {
    // Start timer interval for sync all text animations with the current time
    timerId.current = setInterval(() => {
      const isShow = Date.now() % 4000 < 2000;
      setShowText(isShow);
    }, 100);
  };

  useEffect(() => {
    setTimeout(startAnimation, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  return <StyledLive $show={showText}>LIVE</StyledLive>;
}

export default Live;
