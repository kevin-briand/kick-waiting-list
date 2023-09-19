import { useCallback } from 'react';
import useAlertInfo from './useAlertInfo';
import useAlertError from './useAlertError';

function useClipboard() {
  const setAlertInfo = useAlertInfo();
  const setAlertError = useAlertError();

  return useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setAlertInfo('clipboard.success');
      } catch (err) {
        setAlertError('clipboard.error', { err });
      }
    },
    [setAlertError, setAlertInfo]
  );
}

export default useClipboard;
