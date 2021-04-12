export default class WebSocketService {
  ws;
  messageHandlers = [];

  constructor() {
    this.openConnection();
  }

  openConnection() {
    this.ws = new WebSocket('ws://localhost:3001');
    this.ws.onopen = () => console.log('OPENED CONNECTION');
    this.ws.onmessage = (event) => this.handleReceiveMessage(event);
  }

  handleReceiveMessage(event) {
    const msg = event.data;
    console.log('MSG RECEIVED:', msg);
    this.messageHandlers.forEach((handler) => handler(msg));
  }

  sendMessage(msg) {
    this.ws.send(msg);
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }
}
