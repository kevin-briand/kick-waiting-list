import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Config from '../utils/config/config';
import { KickDataDto } from '../../kick/webSocket/dto/kick-data.dto';
import WebSocketKick from '../../kick/webSocket/web-socket-kick';
import useAlertInfo from '../hook/useAlertInfo';

type WebSocketType = {
  data?: KickDataDto;
  clearData: () => void;
};

export const KickWebSocketContext = createContext<WebSocketType>({
  data: undefined,
  clearData: () => {},
});

type WebSocketProviderProps = {
  children: ReactElement;
};

const CONNECTION_ESTABLISHED = 'connection_established';
const SUBSCRIPTION_SUCCEEDED = 'subscription_succeeded';

export function KickWebSocketProvider({ children }: WebSocketProviderProps) {
  const [data, setData] = useState<KickDataDto | undefined>(undefined);
  const ws = useRef<WebSocketKick | null>(null);
  const { chatId } = new Config().getConfig();
  const setAlertInfo = useAlertInfo();

  const onOpen = useCallback(() => {}, []);

  const handleWebSocketInfo = useCallback(
    (info: KickDataDto) => {
      if (info.event.includes(CONNECTION_ESTABLISHED)) {
        setAlertInfo('ws.connected');
      }
      if (info.event.includes(SUBSCRIPTION_SUCCEEDED)) {
        setAlertInfo('ws.subscribed');
      }
    },
    [setAlertInfo]
  );

  const onMessage = useCallback(
    (wsData: KickDataDto) => {
      if (wsData.data === undefined) {
        handleWebSocketInfo(wsData);
      } else {
        setData(wsData);
      }
    },
    [handleWebSocketInfo]
  );

  const clearData = useCallback(() => {
    setData(undefined);
  }, []);

  useEffect(() => {
    ws.current = new WebSocketKick(chatId, onMessage);

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [chatId, onMessage, onOpen]);

  const dataMemo = useMemo(() => {
    return {
      data,
      clearData,
    };
  }, [clearData, data]);

  return (
    <KickWebSocketContext.Provider value={dataMemo}>
      {children}
    </KickWebSocketContext.Provider>
  );
}
