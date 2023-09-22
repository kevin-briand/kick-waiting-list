import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 2em;
  gap: 5px 0;
  margin: 0 auto;
  padding: 10px;
  font-size: 1em;
  color: ${(props) => props.theme.colors.text.dark};
`;

export default Grid;
