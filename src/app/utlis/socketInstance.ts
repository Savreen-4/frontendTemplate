// helpers/socketInstance.ts
import { io } from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../../_metronic/helpers';

export const socket = io(SOCKET_ENDPOINT, {
  transports: ['websocket'],
});
