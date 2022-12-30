import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { Server, Socket } from 'socket.io';
import routes from './routers';
import { SocketServer } from './config/socket';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

const http = createServer(app);
export const io = new Server(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

io.on('connection', (socket: Socket) => {
	SocketServer(socket);
});

app.use('/api', routes);

import './config/database';


const PORT = Number(process.env.PORT) || 8000;
http.listen(PORT, () => {
	console.log(`Server is running ${PORT}`);
});
