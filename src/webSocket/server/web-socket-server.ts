import { WebSocket } from 'ws';

export const PING = 'PING';
export const PONG = 'PONG';

class WebSocketServer {
  private wsServer;

  constructor(port: number) {
    this.wsServer = new WebSocket.Server({ port });
    this.wsServer.on('connection', this.onConnection.bind(this));
  }

  private onConnection(ws: WebSocket): void {
    ws.onmessage = this.onMessage.bind(this, ws);
  }

  onMessage(_ws: WebSocket, event: { data: any }): void {
    if (event.data === PING) {
      _ws.send(PONG);
      return;
    }
    this.sendToAll(_ws, event.data);
  }

  sendToAll(sender: WebSocket, message: string): void {
    try {
      this.wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== sender) {
          client.send(message);
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Erreur lors de l'envoi à tous les clients:", error);
    }
  }

  close() {
    if (this.wsServer) {
      this.wsServer.close();
    }
  }
}

export default WebSocketServer;
