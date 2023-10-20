import React from 'react';
import ObsPage from './page/ObsPage';
import './App.css';
import '../../utils/locale/i18n';
import ToastProvider from './components/toast/provider/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <ObsPage />
    </ToastProvider>
  );
}

export default App;
