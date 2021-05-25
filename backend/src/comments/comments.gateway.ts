import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Logger, SetMetadata, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import { RolesGuard } from '../common/role.guard';

@WebSocketGateway({ namespace: '/chat' })
@UseGuards(RolesGuard)
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');
  @SetMetadata('licence', 0)
  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: {text: string, user: string, room: string}): Promise<WsResponse<any>> {
    if (payload.text.length > 0) {
      return this.server.to(payload.room).emit('msgToClient', { user: payload.user, text: payload.text });
    }
  }
  @SetMetadata('licence', 0)
  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);
    this.logger.log('connected');
  }
  @SetMetadata('licence', 0)
  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client disconnected: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
