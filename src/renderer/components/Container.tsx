import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background.light};
  overflow: scroll;
`;

const FixedContainer = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <StyledContainer>
      <Header />
      <FixedContainer>{children}</FixedContainer>
    </StyledContainer>
  );
}

export default Container;
