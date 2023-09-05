import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertMessageContext } from '../components/alert-message/AlertMessageContext';
import AlertType from '../components/alert-message/dto/alert-type';

function useAlertError() {
  const { t } = useTranslation('translation');
  const { setAlertMessage } = useContext(AlertMessageContext);

  return useCallback(
    (translationKey: string, args: object = {}) => {
      setAlertMessage({
        message: t(translationKey, args),
        type: AlertType.ERROR,
      });
    },
    [setAlertMessage, t]
  );
}

export default useAlertError;
