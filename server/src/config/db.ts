import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const dbinit = () =>
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		} as ConnectOptions)
		.then((result) => {
			console.log(`DB Connected: ${result}`);
		})
		.catch((error) => {
			console.log('uri: ', process.env.MONGO_URI);
			console.log(`Error in DB Connection: ${error.message}`);
		});
