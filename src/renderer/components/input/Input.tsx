import styled from 'styled-components';

const Input = styled.input`
  color: ${({ theme }) => theme.colors.text.dark};
  background-color: ${({ theme }) => theme.colors.background.light};
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.light};

  &:enabled {
    color: ${({ theme }) => theme.colors.text.dark};
    border-bottom: 1px solid ${({ theme }) => theme.colors.text.dark};
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.text.dark};
  }
`;

export default Input;
