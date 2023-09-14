import styled from 'styled-components';
import Button from './Button';

const ButtonCancel = styled(Button)`
  background-color: ${(props) => props.theme.colors.buttons.error};
  &:active {
    background-color: ${(props) => props.theme.colors.buttons.error};
  }
`;

export default ButtonCancel;
