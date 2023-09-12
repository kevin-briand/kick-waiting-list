import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.button.default.base};
  color: ${(props) => props.theme.text};
  border-radius: 5px;
  border: none;
  &:hover {
    box-shadow: 0 0 2px black;
  }
  &:active {
    background-color: ${(props) => props.theme.button.default.active};
  }
`;

export default Button;
