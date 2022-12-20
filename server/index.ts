import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { Server, Socket } from 'socket.io';
import { SocketServer } from './config/socket';
import routes from './routers';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

const http = createServer(app);
export const io = new Server(http);

io.on('connection', (socket: Socket) => {
	SocketServer(socket);
});

app.use('/api', routes);

import './config/database';

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
	console.log(`Server is running ${PORT}`);
});
