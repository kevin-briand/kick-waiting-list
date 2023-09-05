import styled from 'styled-components';
import Button from './Button';

const ButtonCancel = styled(Button)`
  background-color: #e33;
  &:active {
    background-color: darkred;
  }
`;

export default ButtonCancel;
