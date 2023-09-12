import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './button/Button';
import Logo from './logo/logo';

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.text};
`;

const ButtonParameters = styled(Button)`
  margin: 5px;
`;

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation('translation');
  const location = useLocation();
  const isParametersPage = location.pathname === '/parameters';

  return (
    <StyledHeader>
      <Logo />
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
