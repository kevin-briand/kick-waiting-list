import React, { useMemo, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './utils/locale/i18n';
import './App.css';
import i18n from 'i18next';
import AlertMessage from './components/alert-message/AlertMessage';
import { AlertDto } from './components/alert-message/dto/alert-dto';
import AlertType from './components/alert-message/dto/alert-type';
import { AlertMessageContext } from './components/alert-message/AlertMessageContext';
import WaitingList from './waitingList/WaitingList';

i18n.changeLanguage('fr');

export default function App() {
  const [alertMessage, setAlertMessage] = useState<AlertDto>({
    message: '',
    type: AlertType.SUCCESS,
  });

  const contextValue = useMemo(() => {
    return { alertMessage, setAlertMessage };
  }, [alertMessage, setAlertMessage]);

  return (
    <div>
      <AlertMessageContext.Provider value={contextValue}>
        <AlertMessage />
        <Router>
          <Routes>
            <Route path="/" element={<WaitingList />} />
          </Routes>
        </Router>
      </AlertMessageContext.Provider>
    </div>
  );
}
