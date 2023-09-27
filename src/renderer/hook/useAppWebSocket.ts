import { useContext } from 'react';
import { AppWebSocketContext } from '../provider/AppWebSocketProvider';

function useAppWebSocket() {
  return useContext(AppWebSocketContext);
}

export default useAppWebSocket;
