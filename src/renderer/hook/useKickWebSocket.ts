import { useContext } from 'react';
import { KickWebSocketContext } from '../provider/KickWebSocketProvider';

function useKickWebSocket() {
  return useContext(KickWebSocketContext);
}

export default useKickWebSocket;
