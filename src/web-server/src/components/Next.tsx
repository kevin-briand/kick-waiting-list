import styled from 'styled-components';

const StyledNext = styled.span`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 1.9em;
  color: white;
  height: 100%;
`;

function Next() {
  return <StyledNext>NEXT</StyledNext>;
}

export default Next;
