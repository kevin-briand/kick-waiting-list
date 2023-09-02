
export abstract class AbstractWebSocket {
  private ws: WebSocket;
  private reconnect: boolean;
  private readonly url: string;

  protected constructor(url: string, reconnect = true) {
    this.reconnect = reconnect;
    this.url = url;
    this.ws = new WebSocket(url);
    this.initEvents();
  }

  private initEvents(): void {
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onerror = this.onError.bind(this);
    this.ws.onclose = this.onClose.bind(this);
  }

  protected onOpen(): void {
    console.log('Connected!');
  }

  send(data: string): void {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
      console.log(`send ${data}`);
    }
    else {
      this.ws.close()
      this.ws = new WebSocket(this.url)
    }
  }

  abstract onMessage(ev: MessageEvent<any>): void;

  protected onClose(): void {
    console.log('Disconnected!');
    if (this.reconnect) {
      this.ws = new WebSocket(this.url);
    }
  }

  close(): void {
    this.reconnect = false;
    this.ws.close();
  }

  open(): void {
    if (this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close();
    }
    this.ws = new WebSocket(this.url);
  }

  onError(ev: Event): void {
    console.error(`An error occurred: ${ev}`);
  }
}
