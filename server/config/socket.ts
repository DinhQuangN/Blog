import { Socket } from 'socket.io';

export const SocketServer = (socket: Socket) => {
	socket.on('joinRoom', (id: string) => {
		socket.join(id);
		console.log({ joinRoom: (socket as any).adapter.rooms });
	});

	socket.on('leaveRoom', (id: string) => {
		socket.leave(id);
	});
	socket.on('disconnect', () => {
		console.log(socket.id + ' disconnect');
	});
};
