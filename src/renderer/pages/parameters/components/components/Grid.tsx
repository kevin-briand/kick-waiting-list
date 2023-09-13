import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-auto-rows: 2em;
  gap: 5px 0;
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  font-size: 1em;
`;

export default Grid;