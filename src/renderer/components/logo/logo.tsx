import React from 'react';
import styled from 'styled-components';
import logo from '../../img/logo-no-background.svg';

const StyledLogo = styled.img`
  width: 100px;
  height: auto;
  display: block;
`;

function Logo() {
  return <StyledLogo src={logo} />;
}

export default Logo;
