import styled from 'styled-components';
import Button from './Button';

const ButtonSave = styled(Button)`
  background-color: green;
  &:active {
    background-color: darkgreen;
  }
`;

export default ButtonSave;
