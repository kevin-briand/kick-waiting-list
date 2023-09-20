import AbstractWebSocket from './abstract-web-socket';
import WsDataDto from './server/dto/ws-data.dto';
import Clients from './server/enum/clients';
import { PING, PONG } from './server/web-socket-server';

class AppWebSocket extends AbstractWebSocket {
  private readonly messageCallback: (data: WsDataDto) => void;

  private readonly openCallback: () => void;

  private readonly client: Clients;

  private pindSended = false;

  // eslint-disable-next-line no-undef
  private timeoutPing: NodeJS.Timer | null = null;

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
    if (this.timeoutPing) {
      clearInterval(this.timeoutPing);
    }
    this.timeoutPing = setInterval(() => this.sendPing(), 10000);
    if (!this.openCallback) return;
    this.openCallback();
  }

  private sendPing() {
    if (this.pindSended) {
      this.close();
      this.open();
      this.pindSended = false;
    } else {
      this.send(PING);
      this.pindSended = true;
    }
  }

  onMessage(ev: MessageEvent<string>): void {
    if (ev.data === PONG) {
      this.pindSended = false;
      return;
    }
    if (!this.messageCallback) return;
    this.messageCallback(JSON.parse(ev.data));
  }

  sendData(data: any) {
    this.send(JSON.stringify({ sender: this.client, data }));
  }
}

export default AppWebSocket;
