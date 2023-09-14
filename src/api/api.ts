import express from 'express';
import { IncomingMessage, Server, ServerResponse } from 'http';
import getAlive from './route/get-alive';

class Api {
  private api = express();

  private server:
    | Server<typeof IncomingMessage, typeof ServerResponse>
    | undefined = undefined;

  constructor() {
    this.api.use('/', getAlive);
  }

  start(port: number) {
    this.server = this.api.listen(port, () =>
      // eslint-disable-next-line no-console
      console.log(`API server is running on http://localhost:${port}`)
    );
  }

  stop() {
    if (!this.server) return;
    this.server.closeAllConnections();
    this.server.close();
  }
}

export default Api;
