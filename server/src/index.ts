import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './routes';
import { dbinit } from './config/db';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000'],
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));

const server = http.createServer(app);

server.listen(6002, () => {
	console.log('Server running on http://localhost:6002/');
});

dbinit();

app.use('/api', router());

app.get('/', (req, res) => {
	res.send('Hello From Server');
});
