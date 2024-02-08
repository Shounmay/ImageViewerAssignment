import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:6002', // Replace with your backend base URL
	headers: {
		'Content-Type': 'application/json',
		// Add any common headers here
	},
});

export default api;
