import { createContext } from 'react';

type ToastType = {
  textInfoList: string[];
  addTextInfo: (text: string) => void;
  getNextTextInfo: () => string | undefined;
};

const ToastContext = createContext<ToastType>({
  textInfoList: [],
  addTextInfo: () => null,
  getNextTextInfo: () => undefined,
});

export default ToastContext;
