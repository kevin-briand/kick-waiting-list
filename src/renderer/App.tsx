import React, { useLayoutEffect, useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './utils/locale/i18n';
import './App.css';
import i18n from 'i18next';
import AlertMessage from './components/alert-message/AlertMessage';
import { AlertDto } from './components/alert-message/dto/alert-dto';
import AlertType from './components/alert-message/dto/alert-type';
import { AlertMessageContext } from './components/alert-message/AlertMessageContext';
import { USERS_LIST_KEY } from './pages/waiting-list/components/waiting-list/WaitingList';
import Parameters from './pages/parameters/parameters';
import LocalStorage from './utils/local-storage/local-storage';
import { LANGUAGE_KEY } from './pages/parameters/consts';
import WaitingListPage from './pages/waiting-list/WaitingListPage';
import { DRAW_LIST_KEY } from './pages/waiting-list/components/random-draw/RandomDrawList';

const localStorage = new LocalStorage();
localStorage.remove(USERS_LIST_KEY);
localStorage.remove(DRAW_LIST_KEY);

export default function App() {
  const [alertMessage, setAlertMessage] = useState<AlertDto>({
    message: '',
    type: AlertType.SUCCESS,
  });

  const contextValue = useMemo(() => {
    return { alertMessage, setAlertMessage };
  }, [alertMessage, setAlertMessage]);

  useLayoutEffect(() => {
    i18n.changeLanguage(localStorage.get(LANGUAGE_KEY) || 'en');
  }, []);

  return (
    <AlertMessageContext.Provider value={contextValue}>
      <AlertMessage />
      <Router>
        <Routes>
          <Route path="/" element={<WaitingListPage />} />
          <Route path="/parameters" element={<Parameters />} />
        </Routes>
      </Router>
    </AlertMessageContext.Provider>
  );
}
