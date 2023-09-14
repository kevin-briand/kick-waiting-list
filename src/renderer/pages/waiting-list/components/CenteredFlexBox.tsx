import styled from 'styled-components';

const CenteredFlexBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  gap: 10px;
  color: ${(props) => props.theme.colors.text.dark};
`;

export default CenteredFlexBox;
