import { useEffect, useRef } from 'react';
import WebSocketKick from '../../kick/webSocket/web-socket-kick';
import { KickDataDto } from '../../kick/webSocket/dto/kick-data.dto';
import useAlertError from './useAlertError';

function useWebSocket(chatId: number, handler: (data: KickDataDto) => void) {
  const wsRef = useRef<WebSocketKick | null>(null);
  const setAlertError = useAlertError();

  useEffect(() => {
    try {
      wsRef.current = new WebSocketKick(chatId, handler);
    } catch (err) {
      if (err instanceof Error) {
        setAlertError(err.message);
      }
    }

    return () => {
      wsRef.current?.close();
    };
  }, [chatId, handler, setAlertError]);

  return wsRef;
}

export default useWebSocket;
