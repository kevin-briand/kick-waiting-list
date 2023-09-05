import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './button/Button';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background-color: dimgrey;
  color: white;
`;

const ButtonParameters = styled(Button)`
  margin: 5px;
`;

const Title = styled.h1`
  display: flex;
  flex-grow: 1;
  align-items: center;
  margin-left: 0.5em;
`;

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const location = useLocation();
  const isParametersPage = location.pathname === '/parameters';

  return (
    <StyledHeader>
      <Title>{t('title')}</Title>
      <ButtonParameters
        type="button"
        onClick={() => navigate(isParametersPage ? '/' : '/parameters')}
      >
        {t(isParametersPage ? 'button.back' : 'button.parameters')}
      </ButtonParameters>
    </StyledHeader>
  );
}

export default Header;
