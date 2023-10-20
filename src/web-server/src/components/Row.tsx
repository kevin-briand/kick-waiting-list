import styled from 'styled-components';
import { ReactElement } from 'react';
import Live from './Live';

type StyledRowProps = {
  $live: boolean;
};

const StyledRow = styled.li<StyledRowProps>`
  display: flex;
  align-items: center;
  height: 25%;
  background-image: linear-gradient(
    to right,
    rgba(155, 12, 17, 1) 10%,
    transparent 20%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  ${(props) => props.$live && 'animation: showLive 2s forwards;'};

  @keyframes showLive {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0 0;
    }
  }
`;

const Username = styled.div`
  color: white;
  padding: 5px 5px 5px 0;
  font-size: 2.5em;
  white-space: nowrap;
`;

const Prefix = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

export type listItemProps = {
  name: string;
  statusPrefix: ReactElement;
};

export function Row({ name, statusPrefix }: listItemProps) {
  const isLive = (prefix: ReactElement): boolean => {
    return prefix.type === Live;
  };

  return (
    <StyledRow $live={isLive(statusPrefix)}>
      <Prefix>{statusPrefix}</Prefix>
      <Username>{name}</Username>
    </StyledRow>
  );
}
