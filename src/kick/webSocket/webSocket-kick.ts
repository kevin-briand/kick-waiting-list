import { AbstractWebSocket } from '../../webSocket/AbstractWebSocket';
import { KickDataDto } from '../dto/kickData.dto';
import { DataDto } from '../dto/data.dto';

const PING_DATA = '{"event":"pusher:ping","data":{}}'
const TIMEOUT_PING = 119000

export class WebSocketKick extends AbstractWebSocket {
  handleMessage: (data: KickDataDto) => void;
  chatroomId: number;
  authToken: string;
  intervalPing?: NodeJS.Timer;
  timeoutPing?: NodeJS.Timer;

  constructor(chatroomId: number, handleMessage: (data: KickDataDto) => void, authToken: string = '') {
    super("wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c?protocol=7&client=js&version=7.6.0&flash=false");
    this.chatroomId = chatroomId;
    this.authToken = authToken;
    this.handleMessage = handleMessage;
    clearInterval(this.intervalPing);
  }

  protected onOpen() {
    super.onOpen();
    this.send(`{"event":"pusher:subscribe","data":{"auth":"","channel":"chatrooms.${this.chatroomId}.v2"}}`);
  }

  onMessage(ev: MessageEvent<string>): void {
    this.resetTimeoutPing();
    if (this.handleMessage === undefined || !ev.data) {
      return;
    }
    let kickData = JSON.parse(ev.data);
    if (kickData.event && kickData.event.includes('subscription_succeeded')) {
      console.log('subscribe successful');
      return;
    }
    if (!kickData.data) {
      return
    }
    if (typeof kickData.data === 'string') {
      kickData.data = JSON.parse(kickData.data) as DataDto;
    }
    if (!kickData.data.content) {
      return;
    }

    this.handleMessage(kickData);
  }

  close() {
    super.close();
    clearInterval(this.intervalPing);
    clearTimeout(this.timeoutPing);
  }

  private resetTimeoutPing(): void {
    clearInterval(this.intervalPing);
    clearTimeout(this.timeoutPing)
    this.intervalPing = setInterval(() => this.sendPing(), TIMEOUT_PING);
  }

  private sendPing(): void {
    this.send(PING_DATA);
    this.timeoutPing = setTimeout(() => this.pingError(), 15000)
  }

  private pingError(): void {
    console.log('no response from the server');
    this.open();
  }
}
