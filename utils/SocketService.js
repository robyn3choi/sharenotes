import socketIOClient from 'socket.io-client';

export default class SocketService {
  socket;
  messageHandlers = [];

  constructor(noteId) {
    this.openConnection(noteId);
  }

  openConnection(noteId) {
    const options = {
      query: { noteId },
      transports: ['websocket'],
    };
    this.socket = socketIOClient(`wss://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}`, options);
    this.socket.on('connect', () => console.log('SOCKET CONNECTED'));
    this.socket.on('disconnect', () => console.log('SOCKET DISCONNECTED'));
    this.socket.on('message', (data) => this.handleReceiveMessage(data));
  }

  handleReceiveMessage(data) {
    console.log('MSG RECEIVED:', data);
    this.messageHandlers.forEach((handler) => handler(data));
  }

  sendMessage(msg) {
    this.socket.emit('message', msg);
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }
}
