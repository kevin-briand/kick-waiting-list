import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './utils/locale/i18n';
import './App.css';
import i18n from 'i18next';
import { ThemeProvider } from 'styled-components';
import AlertMessage from './components/alert-message/AlertMessage';
import { AlertDto } from './components/alert-message/dto/alert-dto';
import AlertType from './components/alert-message/dto/alert-type';
import { AlertMessageContext } from './components/alert-message/AlertMessageContext';
import { USERS_LIST_KEY } from './pages/waiting-list/components/waiting-list/WaitingList';
import ParameterPage from './pages/parameters/parameterPage';
import LocalStorage from './utils/local-storage/local-storage';
import { LANGUAGE_KEY, THEME_KEY } from './pages/parameters/consts';
import WaitingListPage from './pages/waiting-list/WaitingListPage';
import { DRAW_LIST_KEY } from './pages/waiting-list/components/random-draw/RandomDrawList';
import Theme from './themes/enum/theme';
import { darkTheme, lightTheme } from './themes/themes';
import ThemeContext from './themes/theme-context';

const localStorage = new LocalStorage();
localStorage.remove(USERS_LIST_KEY);
localStorage.remove(DRAW_LIST_KEY);

export default function App() {
  const [alertMessage, setAlertMessage] = useState<AlertDto>({
    message: '',
    type: AlertType.SUCCESS,
  });
  const savedTheme = Number.parseInt(localStorage.get(THEME_KEY), 10);
  const [theme, setTheme] = useState(savedTheme ?? Theme.LIGHT);

  const contextValue = useMemo(() => {
    return { alertMessage, setAlertMessage };
  }, [alertMessage, setAlertMessage]);

  const changeTheme = useCallback((selectedTheme: Theme) => {
    setTheme(selectedTheme);
  }, []);

  const themeContextValue = useMemo(() => {
    return { changeTheme };
  }, [changeTheme]);

  useLayoutEffect(() => {
    i18n.changeLanguage(localStorage.get(LANGUAGE_KEY) || 'en');
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme === Theme.LIGHT ? lightTheme : darkTheme}>
        <AlertMessageContext.Provider value={contextValue}>
          <AlertMessage />
          <Router>
            <Routes>
              <Route path="/" element={<WaitingListPage />} />
              <Route path="/parameters" element={<ParameterPage />} />
            </Routes>
          </Router>
        </AlertMessageContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
