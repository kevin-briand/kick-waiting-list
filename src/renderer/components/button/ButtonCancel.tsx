import styled from 'styled-components';
import Button from './Button';

const ButtonCancel = styled(Button)`
  background-color: ${(props) => props.theme.button.error.base};
  &:active {
    background-color: ${(props) => props.theme.button.error.active};
  }
`;

export default ButtonCancel;
