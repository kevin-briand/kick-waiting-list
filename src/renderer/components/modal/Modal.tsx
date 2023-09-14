import styled from 'styled-components';
import { ReactNode } from 'react';
import H3 from '../../pages/parameters/components/components/H3';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundModal};
`;

const Dialog = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  padding: 10px;
  margin: auto;
  box-shadow: 0 0 50px ${(props) => props.theme.colors.shadow};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background.light};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  font-size: 1.2em;
  color: ${(props) => props.theme.colors.text.dark};
`;

const Content = styled.div`
  padding: 5px;
  color: ${(props) => props.theme.colors.text.dark};
`;

type ModalProps = {
  title?: string;
  open: boolean;
  close: () => void;
  children: ReactNode;
};

function Modal({ title, open, close, children }: ModalProps) {
  return open ? (
    <>
      <Background onClick={close} />
      <Dialog>
        <Header>
          <H3>{title ?? ''}</H3>
          <CloseButton onClick={close}>X</CloseButton>
        </Header>
        <Content>{children}</Content>
      </Dialog>
    </>
  ) : null;
}

export default Modal;
