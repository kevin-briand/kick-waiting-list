import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 15px;
  background-color: cornflowerblue;
  color: white;
  border-radius: 5px;
  border: none;
  &:hover {
    box-shadow: 0 0 2px black;
  }
  &:active {
    background-color: darkblue;
  }
`;

export default Button;
