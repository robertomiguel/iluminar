import type { Server as HTTPServer } from 'http'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Socket as NetSocket } from 'net'
import { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res?.socket?.server?.io) {
    console.log('Iniciando conexión a socket')
    const io = new IOServer(res?.socket?.server)
    res.socket.server.io = io

    io.on('connection', (sockete) => {
      sockete.on('pantalla', (data: string) => {
        io.emit('pantalla', data);
      });
      sockete.on('control', (data: string) => {
        io.emit('control', data);
      });
    });    
  }

  res.end()
}
