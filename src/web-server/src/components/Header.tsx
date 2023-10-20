import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2em;
  color: white;
  flex-shrink: 0;
`;

function Header() {
  const { t } = useTranslation('translation');

  return <StyledHeader>{t('title')}</StyledHeader>;
}

export default Header;
