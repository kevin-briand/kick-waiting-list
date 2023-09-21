import styled from 'styled-components';

const StyledLive = styled.span`
  border-radius: 5px;
  background-color: red;
  padding: 5px 5px;
  font-size: 1.4em;
  color: white;
`;

function Live() {
  return <StyledLive>LIVE</StyledLive>;
}

export default Live;
