export default class WebSocketService {
  ws;
  messageHandlers = [];

  constructor() {
    this.openConnection();
  }

  openConnection() {
    this.ws = new WebSocket('wss://b56f1812c858.ngrok.io');
    this.ws.onopen = () => console.log('OPENED CONNECTION');
    this.ws.onmessage = (event) => this.handleReceiveMessage(event);
    this.ws.onclose = (event) => console.log('CLOSED CONNECTION');
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
