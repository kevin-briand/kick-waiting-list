import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledButtonTab = styled.button`
  color: ${(props) => props.theme.colors.buttons.default};
  flex-grow: 1;
  max-width: 50%;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.background.light};
  padding: 5px 0;
  font-size: 1em;
  font-weight: bold;
  &:hover {
    text-shadow: 0 0 1px ${(props) => props.theme.colors.shadow};
  }
  &:active,
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.colors.buttons.default};
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
