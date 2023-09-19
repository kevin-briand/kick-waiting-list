import React from 'react';
import styled from 'styled-components';
import logo from '../../img/logo-no-background.svg';

const StyledLogo = styled.img`
  height: 100%;
  display: block;
`;

function Logo() {
  return <StyledLogo src={logo} />;
}

export default Logo;
