import axios from 'axios';

const api = axios.create({
	baseURL: 'https://imageviewerserver.onrender.com', // Replace with your backend base URL
	headers: {
		'Content-Type': 'application/json',
		// Add any common headers here
	},
});

export default api;
