import { useEffect, useRef } from 'react';
import AppWebSocket from '../../../webSocket/app-web-socket';
import WsDataDto from '../../../webSocket/server/dto/ws-data.dto';
import Clients from '../../../webSocket/server/enum/clients';

function useAppWebSocket(
  onMessage: (data: WsDataDto) => void,
  onOpen: () => void
) {
  const wsRef = useRef<AppWebSocket | null>(null);

  useEffect(() => {
    try {
      wsRef.current = new AppWebSocket(Clients.OBS, onMessage, onOpen);
    } catch (err) {
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    }

    return () => {
      wsRef.current?.close();
    };
  }, [onMessage, onOpen]);

  return wsRef;
}

export default useAppWebSocket;
