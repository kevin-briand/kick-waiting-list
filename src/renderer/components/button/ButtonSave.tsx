import styled from 'styled-components';
import Button from './Button';

const ButtonSave = styled(Button)`
  background-color: ${(props) => props.theme.button.success.base};
  &:active {
    background-color: ${(props) => props.theme.button.success.active};
  }
`;

export default ButtonSave;
