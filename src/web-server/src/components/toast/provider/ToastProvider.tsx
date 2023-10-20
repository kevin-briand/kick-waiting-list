import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import ToastContext from '../context/ToastContext';

type ToastProviderProps = {
  children: ReactElement;
};

function ToastProvider({ children }: ToastProviderProps) {
  const [textInfoList, setTextInfoList] = useState<string[]>([]);

  const addTextInfo = useCallback((text: string) => {
    if (text) {
      setTextInfoList((prevState) => [...prevState, text]);
    }
  }, []);

  const getNextTextInfo = useCallback(() => {
    const message = textInfoList.shift();
    // force update list
    setTextInfoList((prevState) => {
      return prevState;
    });
    return message;
  }, [textInfoList]);

  const ToastMemo = useMemo(() => {
    return {
      textInfoList,
      addTextInfo,
      getNextTextInfo,
    };
  }, [addTextInfo, getNextTextInfo, textInfoList]);

  return (
    <ToastContext.Provider value={ToastMemo}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
