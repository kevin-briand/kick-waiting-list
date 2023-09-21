import styled from 'styled-components';
import Button from './Button';

const ButtonDisabled = styled(Button)`
  background-color: ${(props) => props.theme.colors.buttons.disabled};
  &:active {
    background-color: ${(props) => props.theme.colors.buttons.disabled};
  }
`;

export default ButtonDisabled;
