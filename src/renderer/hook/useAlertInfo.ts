import { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertMessageContext } from '../components/alert-message/AlertMessageContext';
import AlertType from '../components/alert-message/dto/alert-type';

function useAlertInfo() {
  const { t } = useTranslation('translation');
  const { setAlertMessage } = useContext(AlertMessageContext);

  return useCallback(
    (translationKey: string, args: object = {}) => {
      setAlertMessage({
        message: t(translationKey, args),
        type: AlertType.SUCCESS,
      });
    },
    [setAlertMessage, t]
  );
}

export default useAlertInfo;
