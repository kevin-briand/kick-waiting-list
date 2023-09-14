import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.colors.buttons.default};
  color: ${(props) => props.theme.colors.text.light};
  border-radius: 5px;
  border: none;
  &:hover {
    box-shadow: 0 0 2px ${(props) => props.theme.colors.shadow};
  }
  &:active {
    background-color: ${(props) => props.theme.colors.buttons.default};
  }
`;

export default Button;
