import styled from 'styled-components';
import FixedWidthFlexBox from './FixedWidthFlexBox';

const TitleBox = styled(FixedWidthFlexBox)`
  margin: 10px auto;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  justify-content: center;
`;

export default TitleBox;
