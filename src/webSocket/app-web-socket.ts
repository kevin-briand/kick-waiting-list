import AbstractWebSocket from './abstract-web-socket';
import WsDataDto from './server/dto/ws-data.dto';
import Clients from './server/enum/clients';

class AppWebSocket extends AbstractWebSocket {
  private readonly messageCallback: (data: WsDataDto) => void;

  private readonly openCallback: () => void;

  private readonly client: Clients;

  constructor(
    client: Clients,
    onMessageCallback: (data: WsDataDto) => void,
    onOpenCallback: () => void
  ) {
    super('ws://localhost:9991');
    this.client = client;
    this.messageCallback = onMessageCallback;
    this.openCallback = onOpenCallback;
  }

  onOpen() {
    super.onOpen();
    if (!this.openCallback) return;
    this.openCallback();
  }

  onMessage(ev: MessageEvent<string>): void {
    if (!this.messageCallback) return;
    this.messageCallback(JSON.parse(ev.data));
  }

  sendData(data: any) {
    this.send(JSON.stringify({ sender: this.client, data }));
  }
}

export default AppWebSocket;
