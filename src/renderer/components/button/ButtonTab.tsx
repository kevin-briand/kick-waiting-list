import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledButtonTab = styled.button`
  color: ${(props) => props.theme.button.default.base};
  flex-grow: 1;
  max-width: 50%;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.primary};
  padding: 5px 0;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    text-shadow: 0 0 1px ${(props) => props.theme.tertiary};
  }
  &:active,
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.button.default.base};
  }
`;

type ButtonTabProps = {
  children: ReactNode;
  selected: boolean;
  handleClick: () => void;
};

function ButtonTab({ children, selected, handleClick }: ButtonTabProps) {
  return (
    <StyledButtonTab onClick={handleClick} className={selected ? 'active' : ''}>
      {children}
    </StyledButtonTab>
  );
}

export default ButtonTab;
