import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import AppWebSocket from '../../webSocket/app-web-socket';
import Clients from '../../webSocket/server/enum/clients';
import WsDataDto from '../../webSocket/server/dto/ws-data.dto';
import Config from '../utils/config/config';
import { WsUserListDto } from '../../webSocket/server/dto/ws-user-list.dto';
import { ConfigDto } from '../utils/config/dto/config.dto';

type WebSocketType = {
  data: {} | string;
  sendMessage: (data: WsUserListDto | ConfigDto | string) => void;
};

export const AppWebSocketContext = createContext<WebSocketType>({
  data: '',
  sendMessage: () => null,
});

type WebSocketProviderProps = {
  children: ReactElement;
};

export function AppWebSocketProvider({ children }: WebSocketProviderProps) {
  const [data, setData] = useState<{} | string>('');
  const ws = useRef<AppWebSocket | null>(null);

  const sendConfig = useCallback(() => {
    ws.current?.sendData(new Config().getConfig());
  }, []);

  const onOpen = useCallback(() => {
    sendConfig();
  }, [sendConfig]);

  const onMessage = useCallback(
    (wsData: WsDataDto) => {
      if (wsData.data === '') {
        sendConfig();
      }
      setData(Date.now().toString());
    },
    [sendConfig]
  );

  const sendMessage = (message: {} | string) => {
    ws.current?.sendData(message);
  };

  useEffect(() => {
    ws.current = new AppWebSocket(Clients.RENDERER, onMessage, onOpen);

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [onMessage, onOpen]);

  const dataMemo = useMemo(() => {
    return {
      data,
      sendMessage,
    };
  }, [data]);

  return (
    <AppWebSocketContext.Provider value={dataMemo}>
      {children}
    </AppWebSocketContext.Provider>
  );
}
