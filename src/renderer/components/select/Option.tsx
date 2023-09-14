import styled from 'styled-components';

const Option = styled.option`
  color: ${({ theme }) => theme.colors.text.dark};
  background-color: ${({ theme }) => theme.colors.background.light};
`;

export default Option;
