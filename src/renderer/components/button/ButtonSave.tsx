import styled from 'styled-components';
import Button from './Button';

const ButtonSave = styled(Button)`
  background-color: ${(props) => props.theme.colors.buttons.success};
  &:active {
    background-color: ${(props) => props.theme.colors.buttons.success};
  }
`;

export default ButtonSave;
