import { MutableRefObject, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useAlertError from './useAlertError';

type FieldDto = {
  ref: MutableRefObject<HTMLInputElement | HTMLSelectElement | null>;
  translationKey: string;
};

function useValidForm() {
  const { t } = useTranslation('translation');
  const setAlertError = useAlertError();

  const validForm = useCallback(
    (fields: FieldDto[]) => {
      let error = false;
      fields.forEach((field) => {
        if (!field.ref.current?.value) {
          setAlertError('form.emptyField', {
            field: t(field.translationKey),
          });
          error = true;
        }
      });
      return !error;
    },
    [setAlertError, t]
  );

  return { validForm };
}

export default useValidForm;
