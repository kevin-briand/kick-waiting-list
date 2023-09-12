import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  overflow: scroll;
`;

type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <StyledContainer>
      <Header />
      {children}
    </StyledContainer>
  );
}

export default Container;
