import styled from 'styled-components';
import { ReactNode } from 'react';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.75);
`;

const Dialog = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  padding: 10px;
  margin: auto;
  box-shadow: 0 0 50px gray;
  border-radius: 5px;
  background-color: white;
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
`;

const Content = styled.div`
  padding: 5px;
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
          <h3>{title ?? ''}</h3>
          <CloseButton onClick={close}>X</CloseButton>
        </Header>
        <Content>{children}</Content>
      </Dialog>
    </>
  ) : null;
}

export default Modal;
