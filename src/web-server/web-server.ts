import path from 'path';
import express from 'express';
import { IncomingMessage, Server, ServerResponse } from 'http';

class WebServer {
  private webServer = express();

  private server:
    | Server<typeof IncomingMessage, typeof ServerResponse>
    | undefined = undefined;

  constructor() {
    const publicPath = path.join(__dirname, 'public/dist');
    const srcPath = path.join(__dirname, 'src');
    this.webServer.use(express.static(publicPath));
    this.webServer.use(express.static(srcPath));
  }

  start(port: number) {
    this.server = this.webServer.listen(port, () =>
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

export default WebServer;
