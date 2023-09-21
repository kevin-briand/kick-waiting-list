import styled from 'styled-components';
import { ReactElement } from 'react';

const StyledRow = styled.li`
  display: flex;
  align-items: center;
  padding-left: 15px;
  height: 25%;
  border-bottom: 2px solid darkgray;
`;

const Username = styled.div`
  color: white;
  padding: 5px 5px;
  font-size: 2.5em;
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
  statusPrefix?: ReactElement;
};

export function Row({ name, statusPrefix }: listItemProps) {
  return (
    <StyledRow>
      <Prefix>{statusPrefix}</Prefix>
      <Username>{name}</Username>
    </StyledRow>
  );
}
